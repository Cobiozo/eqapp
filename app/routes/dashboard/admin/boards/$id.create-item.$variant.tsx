import type { Role, Language} from "@prisma/client";
import { PermissionName, BoardItemType, SupportedLanguage, Icon, BoardColor } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { unstable_parseMultipartFormData} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { boardItemModel } from "~/models/boardItem.server";
import type UnparsedFormSchema from "~/utils/validation/types/UnparsedFormSchema";
import { pageModel } from "~/models/page.server";
import type { DbData} from "~/utils/PageFormBase.server";
import { createPageBaseLoader } from "~/utils/PageFormBase.server";

const prepareSchema = (variant: BoardItemType, asPage: boolean) => {
  const schema: UnparsedFormSchema = {}

  if (asPage)
    schema.pageName = {
      type: "text",
      label: "pages.fields.name",
      required: true,
      min: 2,
      max: 150,
  }

  schema.name = {
    type: "textMultiLang",
    label: "boards.fields.name",
    required: true,
    min: 2,
    max: 150,
  }

  schema.color = {
    type: "select",
    label: "boards.fields.color",
    required: true,
    options: Object.keys(BoardColor).map((color) => ({
      value: color,
      label: `boards.colors.${color}`,
    })),
    defaultValue: BoardColor.PRIMARY
  }

  if (!asPage)
    schema.icon = {
      type: "icon",
      label: "boards.fields.icon",
      options: Object.values(Icon).map((type) => ({
        value: type,
        label: `boards.icons.${type}`,
      })),
    }

    if (variant === BoardItemType.LINK)
      schema.link = {
        type: "text",
        label: "boards.items.fields.link",
        required: true,
        minLength: 2,
        maxLength: 150,
      }
   
    schema.text = {
      type: "wysiwygMultiLang",
      label: "boards.items.fields.text",
      required: variant === BoardItemType.LINK ? false : true,
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
    }
 
    schema.supportedLanguages = {
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
    return createFormSchema(schema);
}

/********* ACTION *********/
interface ActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesCreate, "/no-permission");
  const variant = params.variant as string;

  // CLEANUP FUNC
  const cleanup = async () => {
    cleanupWysiwygImages(data?.text);
  }

  // if params id is not equal "page", it means we want to create board item
  // if so, try to find the boardDir that is planned to be a parent
  // if not found, return to boardDirs list
  // if params is page, check if variant is not LINK
  // as link wouldn't make sense in this context
  if (params.id !== "page") {
    const boardDir = await boardDirectoryModel.exists({ id: params.id as string });
    if (!boardDir) {
      await cleanup();
      return redirect("/dashboard/admin/boards");
    }
  } else {
    if(params.variant === BoardItemType.LINK) {
      await cleanup();
      return redirect("/dashboard/admin/boards/page/create-item/ADVANCED");
    }
  }

  // get data from request and validate it
  const schema = prepareSchema(variant as BoardItemType, params.id === "page");

  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    // create item
    const dataToInclude = {
      name: data.name,
      icon: data.icon || null,
      type: variant as BoardItemType,
      color: data.color,
      text: data.text,
    }

    // add additional data based on variant
    if (BoardItemType.LINK)
      dataToInclude.link = data.link;

    // if id post, create page with this new board item as content
    // if not, create standard board item related to the boardDir

    if (params.id === "page") {
      await pageModel.createBoardItemPage(
        data.pageName as string,
        dataToInclude,
        data.supportedLanguages
      )
    }
    else {
      await boardItemModel.create({
        ...dataToInclude,
        directoryId: params.id as string,
      }, data.supportedLanguages);
    }

    if (params.id === "page")
      return redirect("/dashboard/admin/pages");
    else
      return redirect("/dashboard/admin/boards/" + params.id);

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it
    await cleanup();
    throw error;
  }
};

/********* LOADER *********/
type Loader = DbData;
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesCreate, "/no-permission");

  // if params id is not equal "page", it means we want to create board item
  // if so, try to find the boardDir that is planned to be a parent
  // if not found, return to boardDirs list
  // if params is page, check if variant is not LINK
  // as link wouldn't make sense in this context
  if (params.id !== "page") {
    const boardDir = await boardDirectoryModel.exists({ id: params.id as string });
    if (!boardDir)
      return redirect("/dashboard/admin/boards");
  } else {
    if(params.variant === BoardItemType.LINK)
      return redirect("/dashboard/admin/boards/page/create-item/ADVANCED");
  }

  // check if variant param is one of the allowed values
  if(!BoardItemType.hasOwnProperty(params.variant as string))
    return redirect("/dashboard/admin/boards/" + params.id + "/create-item");

  // if found, just dbData
   return await createPageBaseLoader(prepareSchema(params.variant as BoardItemType, params.id === "page"));
}

/********* COMPONENT *********/
export default function BoardItemCreate() {
  const { t } = useContext(GlobalContext);
  const { id, variant } = useParams();
  const schema = prepareSchema(variant as BoardItemType, id === "page");
  const actionData = useActionData<ActionData>();
  const dbData = useLoaderData<Loader>();
  
  return (
    <section>
       <AdminPageHeader returnLink={ id === "page" ? "/dashboard/admin/pages" : `/dashboard/admin/boards/${id}`}>
        { id === "page" ? t("pages.create.title") : t("boards.items.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="boards.items"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        dbData={dbData}
      />
    </section>
  );
}
