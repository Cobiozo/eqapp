import type { BoardDirectory, Language, Page, Role} from "@prisma/client";
import { PermissionName,  SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { Icon } from "@prisma/client";
import { pageModel } from "~/models/page.server";
import type { DbData} from "~/utils/PageFormBase.server";
import { loadDbDataNeededForForm } from "~/utils/PageFormBase.server";
import { FaList } from "react-icons/fa";
import { BoardColor } from "@prisma/client";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import compareContentAndRemoveUnusedImages from "~/utils/compareContentAndRemoveUnusedImages.server";

const prepareSchema = (isPage: boolean) => {
  return createFormSchema({
    pageName: isPage ? {
      type: "text",
      label: "pages.fields.name",
      required: true,
      min: 2,
      max: 150,
    } : undefined,
    name: {
      type: "textMultiLang",
      label: "boards.fields.name",
      required: true,
      min: 2,
      max: 150,
    },
    color: {
      type: "select",
      label: "boards.fields.color",
      required: true,
      options: Object.keys(BoardColor).map((color) => ({
        value: color,
        label: `boards.colors.${color}`,
      })),
    },
    description: {
      type: "wysiwygMultiLang",
      label: "boards.fields.description",
      minLength: 2,
      modules: {
        toolbar: [
          [{ 'header': [2, false] }],
          ['bold', 'italic', 'underline','strike', { 'color': [] }, 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, { 'align': [] }],
          ['link', 'image', "video"],
          ['clean']
        ],
      },
      formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'color', 'blockquote',
        'list', 'bullet', 'indent', 'align',
        'link', 'image', 'video'
      ]
    },
    icon: !isPage ? {
      type: "icon",
      label: "boards.fields.icon",
      options: Object.values(Icon).map((type) => ({
        value: type,
        label: `boards.icons.${type}`,
      })),
    } : undefined,
    supportedLanguages: {
      type: "DBMultiSelect",
      label: "boards.fields.supportedLanguages",
      model: "Language",
      required: true,
      optionsConfig: {
        label: (item: Role) => item.name,
        ignore: (item: Language) => item.name === SupportedLanguage.intl,
        chooseAllByDefault: true,
      },
    }
  });
}

/********* ACTION *********/
interface ActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // CLEANUP FUNC
  const cleanup = async () => {
    cleanupWysiwygImages(data?.description);
  }

  // try to find the boardDir to edit
  // if not found, redirect to 404
  const boardDir = await boardDirectoryModel.getById(params.id as string);
  if (!boardDir)
    return redirect("/404");

  // get data from request and validate it
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const isPage = boardDir.pageId !== null;
  const schema = prepareSchema(isPage);
  const data = await parseFormData(formData, schema, request, boardDir);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    // update boardDir
    // if isPage update page and boardDir altogether
    // if not, update only boardDir
    const basicBoardDirData = {
      name: data.name,
      description: data.description,
      icon: data.icon || null,
      color: data.color,
    }

    if (isPage)
      await pageModel.updateBoardPage(
        boardDir.pageId as string,
        data.pageName,
        basicBoardDirData,
        data.supportedLanguages
      )
    else 
      await boardDirectoryModel.update(
        params.id as string, 
        basicBoardDirData,
        data.supportedLanguages
      );

    if(boardDir.description) {
      for(const lang of Object.keys(boardDir.description)) {
        await compareContentAndRemoveUnusedImages(boardDir.description[lang], data.description[lang]);
      }
    }

    // redirect to the parent dir or pages
    if (isPage)
      return redirect("/dashboard/admin/pages");
    else
      return redirect("/dashboard/admin/boards/" + boardDir.parentDirectoryId);
  } catch (error: any) {
    await cleanup();
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type Loader = BoardDirectory & { dbData: DbData };
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find the boardDir
  // if not found, go to 404
  const boardDir = await boardDirectoryModel.getById(params.id as string, ["page", "supportedLanguages"]) as BoardDirectory & { page?: Page } & { pageName?: string };
  if (!boardDir)
    return redirect("/404");

  // if it's page, add to boardDir pageName
  if (boardDir.page)
    boardDir.pageName = boardDir.page.name;
  
  // if found, return it
  return {
    ...boardDir,
    dbData: await loadDbDataNeededForForm(prepareSchema(boardDir.pageId !== null))
  }
}

/********* COMPONENT *********/
export default function BoardDir() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<ActionData>();
  const { dbData, ...boardDir } = useLoaderData<Loader>();
  const isPage = boardDir.pageId !== null;
  
  return (
    <section>
      <AdminPageHeader returnLink={isPage ? `/dashboard/admin/pages` : `/dashboard/admin/boards/${boardDir.parentDirectoryId}`}>
        {isPage ? t("pages.edit.title") : t("boards.edit.title")}
      </AdminPageHeader>
      { isPage && (
        <div className="standard-content mb-4 w-fit mx-auto flex gap-2 items-center">
          <FaList />
          <Link className="link" to={`/dashboard/admin/boards/${boardDir.id}`}>
             {t("pages.goToBoardContent")}
          </Link>
        </div>
      )}
      <ValidationForm
        collection="boards"
        variant="edit"
        schema={prepareSchema(boardDir.pageId !== null)}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={boardDir}
        dbData={dbData}
      />
    </section>
  );
}
