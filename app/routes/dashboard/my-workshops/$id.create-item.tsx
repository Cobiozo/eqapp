import type { Role, Language} from "@prisma/client";
import { PermissionName, RoleName, SupportedLanguage, Icon } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { unstable_parseMultipartFormData} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { workshopDirectoryModel } from "~/models/workshopDirectory.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { workshopItemModel } from "~/models/workshopItem.server";
import type { DbData} from "~/utils/PageFormBase.server";
import { createPageBaseLoader } from "~/utils/PageFormBase.server";
import { globalMiddleware } from "~/middlewares/global.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";

const schema = createFormSchema({
  name: {
    type: "textMultiLang",
    label: "workshops.fields.name",
    required: true,
    min: 2,
    max: 150,
  },
  poster: {
    type: "image",
    label: "workshops.fields.poster",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
  },
  description: {
    type: "wysiwygMultiLang",
    label: "workshops.fields.description",
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
  url:{
    type: "text",
    label: "workshops.fields.YTLink",
    required: true,
    minLength: 2,
    maxLength: 150,
  },
  icon: {
    type: "icon",
    label: "workshops.fields.icon",
    options: Object.values(Icon).map((type) => ({
      value: type,
      label: `workshops.icons.${type}`,
    })),
  },
  supportedRoles: {
    type: "DBMultiSelect",
    label: "workshops.fields.supportedRoles",
    model: "Role",
    required: true,
    optionsConfig: {
      label: (item: Role) => "common.roles." + item.name,
      translate: true,
      ignore: (item: Role) => item.name === RoleName.CLIENT,
      chooseAllByDefault: true,
    }
  },
  supportedLanguages: {
    type: "DBMultiSelect",
    label: "workshops.fields.supportedLanguages",
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
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");

  // CLEANUP FUNC
  const cleanup = async () => {
    if (data?.poster)
      await removeUploadedFile(data.poster.name);
    cleanupWysiwygImages(data?.description);
  }

  // try to find the workshopDir that is planned to be a parent and is ours
  // if not found, return to workshopDirs list
  const userId = await sessionService.getUserId(request) as string;
  const workshopDir = await workshopDirectoryModel.exists({
    id: params.id as string,
    userId,
  })
  if (!workshopDir) {
    await cleanup();
    return redirect("/dashboard/my-workshops");
  }

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
    // create item
    const dataToInclude = {
      name: data.name,
      description: data.description,
      url: data.url,
      icon: data.icon || null,
      poster: data.poster ? data.poster.name : "",
    }

    // create standard workshop item related to the workshopDir
    await workshopItemModel.create({
      ...dataToInclude,
      directoryId: params.id as string,
      userId
    }, data.supportedRoles, data.supportedLanguages);

    return redirect("/dashboard/my-workshops/" + params.id);

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
  await globalMiddleware({ request, params });

  // check permissions
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");

  // try to find the workshopDir that is planned to be a parent and is ours
  // if not found, return to workshopDirs list
  const userId = await sessionService.getUserId(request);
  const workshopDir = await workshopDirectoryModel.exists({
    id: params.id as string,
    userId,
  })
  if (!workshopDir)
    return redirect("/dashboard/my-workshops");

  // if found, just dbData
  return await createPageBaseLoader(schema);
}

/********* COMPONENT *********/
export default function MyWorkshopItemCreate() {
  const { t } = useContext(GlobalContext);
  const { id } = useParams();
  const actionData = useActionData<ActionData>();
  const dbData = useLoaderData<Loader>();
  
  return (
    <section>
       <AdminPageHeader returnLink={`/dashboard/my-workshops/${id}`}>
        {t("workshops.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="workshops"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        dbData={dbData}
      />
    </section>
  );
}
