import type { Language, Role} from "@prisma/client";
import { BoardColor, Icon, PermissionName, RoleName, SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData, useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { GlobalContext } from "~/root";
import type { DbData} from "~/utils/PageFormBase.server";
import { createPageBaseLoader } from "~/utils/PageFormBase.server";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
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
    defaultValue: BoardColor.PRIMARY
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
  icon: {
    type: "icon",
    label: "boards.fields.icon",
    options: Object.values(Icon).map((type) => ({
      value: type,
      label: `boards.icons.${type}`,
    })),
  },
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

  // try to find the boardDir that is planned to be a parent
  // if not found, return to boardDirs list
  const boardDir = await boardDirectoryModel.exists({ id: params.id as string });
  if (!boardDir)
    return redirect("/dashboard/admin/boards");

  // get data from request and validate it
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
    // create boardDirectory
    await boardDirectoryModel.create({
      name: data.name,
      description: data.description,
      icon: data.icon || null,
      parentDirectoryId: params.id as string,
      color: data.color,
    },
    data.supportedLanguages
  );

    // redirect to the parent dir
    return redirect("/dashboard/admin/boards/" + params.id);

  } catch (error: any) {
    await cleanup();
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type Loader = DbData;
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find the boardDir
  // if not found, redirect to to 404
  const boardDir = await boardDirectoryModel.exists({ id: params.id as string });
  if (!boardDir)
    return redirect("/404");
  
  // if found, just return nothing
  return await createPageBaseLoader(schema);
}

/********* COMPONENT *********/
export default function BoardDir() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<ActionData>();
  const { id } = useParams();
  const dbData = useLoaderData<Loader>();
  
  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/admin/boards/${id}`}>
        {t("boards.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="boards"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        dbData={dbData}
      />
    </section>
  );
}
