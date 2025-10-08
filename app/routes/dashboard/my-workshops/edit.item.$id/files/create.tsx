import type { Language} from "@prisma/client";
import { PermissionName, SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { unstable_parseMultipartFormData} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import ValidationForm from "~/components/features/ValidationForm";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { workshopItemModel } from "~/models/workshopItem.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { workshopItemFileModel } from "~/models/workshopItemFile.server";
import type { DbData} from "~/utils/PageFormBase.server";
import { loadDbDataNeededForForm } from "~/utils/PageFormBase.server";
import getOriginalFileName from "~/utils/getOriginalFileName";
import { globalMiddleware } from "~/middlewares/global.server";

const schema = createFormSchema({
  file: {
    type: "file",
    label: "workshopItemFiles.fields.file",
    maxSize: 5 * 1024 * 1024,
    required: true,
  },
  languageId: {
    type: "DBSelect",
    label: "workshopItemFiles.fields.languageId",
    model: "Language",
    required: true,
    optionsConfig: {
      label: (item: Language) => "common.languages." + item.name,
      translate: true,
      sort: (a: Language, b: Language) => {
        // if b.name is SupportedLanguage.intl, it should be always first
        if (b.name === SupportedLanguage.intl) return 1;
        if (a.name === SupportedLanguage.intl) return -1;
        return a.name.localeCompare(b.name);
      }
    }
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
    if (data?.file)
      await removeUploadedFile(data.file.name);
  }

  // try to find workshop item with this id and is ours
  // if not exists, return to workshops
  const id = params.id as string;
  if (!await workshopItemModel.exists({ id, userId: await sessionService.getUserId(request) }))
    return redirect("/dashboard/my-workshops");

  // get data from request and validate it
  let data: Record<string, any> | null = null; 
  
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    await workshopItemFileModel.create({
      workshopItemId: id,
      name: data.file.name,
      title: getOriginalFileName(data.file.name),
      type: data.file.type,
      languageId: data.languageId,
    });
    
    return redirect("/dashboard/my-workshops/edit/item/" + id + "/files");

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it
    await cleanup();
    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  
  // check permissions
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");

  // try to find workshop item with this id and is ours
  // if not exists, return to workshops
  const id = params.id as string;
  if (!await workshopItemModel.exists({ id, userId: await sessionService.getUserId(request) }))
    return redirect("/dashboard/my-workshops");

  return await loadDbDataNeededForForm(schema);
}

/********* COMPONENT *********/
export default function MyWorkshopItemCreate() {
  const actionData = useActionData<ActionData>();
  const dbData = useLoaderData<DbData>();

  return (
    <section>
      <ValidationForm
        collection="workshopItemFiles"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        dbData={dbData}
      />
    </section>
  );
}
