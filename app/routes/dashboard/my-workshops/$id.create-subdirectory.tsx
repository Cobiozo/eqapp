import type { Language, Role} from "@prisma/client";
import { Icon, PermissionName, RoleName, SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData, useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import { workshopDirectoryModel } from "~/models/workshopDirectory.server";
import { GlobalContext } from "~/root";
import type { DbData} from "~/utils/PageFormBase.server";
import { createPageBaseLoader } from "~/utils/PageFormBase.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  name: {
    type: "textMultiLang",
    label: "workshops.directories.fields.name",
    required: true,
    min: 2,
    max: 150,
  },
  description: {
    type: "wysiwygMultiLang",
    label: "workshops.directories.fields.description",
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline','strike', 'blockquote'],
      ],
    },
    formats: [
      'bold', 'italic', 'underline', 'strike', 'blockquote',
    ],
  },
  icon: {
    type: "icon",
    label: "workshops.directories.fields.icon",
    options: Object.values(Icon).map((type) => ({
      value: type,
      label: `workshops.icons.${type}`,
    })),
  },
  image: {
    type: "image",
    label: "workshops.fields.poster",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
  },
  supportedRoles: {
    type: "DBMultiSelect",
    label: "workshops.directories.fields.supportedRoles",
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
    label: "workshops.directories.fields.supportedLanguages",
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
  const userId = await sessionService.getUserId(request);

  // try to find the workshopDir that is planned to be a parent
  // if not found, return to workshopDirs list
  // remember that we can add custom subDir only ro root dir or our own
  const workshopDir = await workshopDirectoryModel.exists({ 
    id: params.id as string ,
    OR: [
      { userId },
      { parentDirectoryId: null },
    ]
  });
  if (!workshopDir)
    return redirect("/dashboard/my-workshops");

  // get data from request and validate it
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request);

  const cleanUp = async () => {
    if (data?.image)
      removeUploadedFile(data.image.name);
  }

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanUp();
    return BadRequestError({ data: validationResult });
  }

  try {
    // create workshopDirectory
    await workshopDirectoryModel.create({
      name: data.name,
      description: data.description,
      icon: data.icon || null,
      parentDirectoryId: params.id as string,
      userId: userId as string,
      image: data.image?.name || "",
    },
    data.supportedRoles,
    data.supportedLanguages
  );

    // redirect to the parent dir
    return redirect("/dashboard/my-workshops/" + params.id);

  } catch (error: any) {
    await cleanUp();
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type Loader = DbData;
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check permissions
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");
  const userId = await sessionService.getUserId(request);

  // try to find the workshopDir that is planned to be a parent
  // if not found, return to workshopDirs list
  // remember that we can add custom subDir only ro root dir or our own
  const workshopDir = await workshopDirectoryModel.exists({ 
    id: params.id as string ,
    OR: [
      { userId },
      { parentDirectoryId: null },
    ]
  });
  if (!workshopDir)
    return redirect("/dashboard/my-workshops");
  
  // if found, just return nothing
  return await createPageBaseLoader(schema);
}

/********* COMPONENT *********/
export default function MyWorkshopDir() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<ActionData>();
  const { id } = useParams();
  const dbData = useLoaderData<Loader>();
  
  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/my-workshops/${id}`}>
        {t("workshops.addSubdirectory")}
      </AdminPageHeader>
      <ValidationForm
        collection="workshops.directories"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        dbData={dbData}
      />
    </section>
  );
}
