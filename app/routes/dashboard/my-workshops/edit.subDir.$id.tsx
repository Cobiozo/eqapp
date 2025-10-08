import type { WorkshopDirectory, Language, Role} from "@prisma/client";
import { PermissionName, RoleName, SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { workshopDirectoryModel } from "~/models/workshopDirectory.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { Icon } from "@prisma/client";
import type { DbData} from "~/utils/PageFormBase.server";
import { loadDbDataNeededForForm } from "~/utils/PageFormBase.server";
import { globalMiddleware } from "~/middlewares/global.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";

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
      label: `boards.icons.${type}`,
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

  // try to find the workshopDir to edit
  // check if it's ours
  // if not found, redirect to 404
  const workshopDir = await workshopDirectoryModel.getById(params.id as string, undefined, {
    userId: await sessionService.getUserId(request)
  });
  if (!workshopDir)
    return redirect("/404");

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
    // update workshopDir
    // if isPage update page and workshopDir altogether
    // if not, update only workshopDir
    const basicWorkshopDirData = {
      name: data.name,
      description: data.description,
      icon: data.icon || null,
      image: data.image?.name || workshopDir.image,
    }

    await workshopDirectoryModel.update(
      params.id as string, 
      basicWorkshopDirData,
      data.supportedRoles,
      data.supportedLanguages
    );

    // if there is new image and there was old one, remove the old one
    if (data.image && workshopDir.image)
      await removeUploadedFile(workshopDir.image);

    return redirect("/dashboard/my-workshops/" + workshopDir.parentDirectoryId);
  } catch (error: any) {
    await cleanUp();
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type Loader = WorkshopDirectory & { dbData: DbData };
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  
  // check permissions
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");

  // try to find the workshopDir to edit
  // check if it's ours
  // if not found, redirect to 404
  const workshopDir = await workshopDirectoryModel.getById(params.id as string, undefined, {
    userId: await sessionService.getUserId(request)
  });
  if (!workshopDir)
    return redirect("/404");

  // if found, return it
  return {
    ...workshopDir,
    dbData: await loadDbDataNeededForForm(schema)
  }
}

/********* COMPONENT *********/
export default function MyWorkshopDir() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<ActionData>();
  const { dbData, ...workshopDir } = useLoaderData<Loader>();
  
  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/my-workshops/${workshopDir.parentDirectoryId}`}>
        {t("workshops.directories.edit.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="workshops"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={workshopDir}
        dbData={dbData}
      />
    </section>
  );
}
