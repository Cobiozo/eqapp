import type { Role, Language } from "@prisma/client";
import { PermissionName, RoleName, SupportedLanguage, Icon } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { unstable_parseMultipartFormData} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import ValidationForm from "~/components/features/ValidationForm";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import type { WorkshopItem} from "~/models/workshopItem.server";
import { workshopItemModel } from "~/models/workshopItem.server";
import compareContentAndRemoveUnusedImages from "~/utils/compareContentAndRemoveUnusedImages.server";
import type { DbData} from "~/utils/PageFormBase.server";
import { loadDbDataNeededForForm } from "~/utils/PageFormBase.server";
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
      label: `boards.icons.${type}`,
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
  const userId = await sessionService.getUserId(request);

  // CLEANUP FUNC
  const cleanup = async () => {
    if (data?.poster)
      await removeUploadedFile(data.poster.name);
    cleanupWysiwygImages(data?.text);
  }

  // try to find the workshop item and check if it is ours
  // if not found, return to 404
  const workshopItem = await workshopItemModel.getById(params.id as string, undefined, {
    userId 
  });
  if (!workshopItem)
    return redirect("/404");

  // get data from request and validate it
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request, workshopItem);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    const dataToInclude: Partial<Record<keyof WorkshopItem, any>> = {
      name: data.name,
      icon: data.icon || null,
      description: data.description,
      url: data.url,
      poster: data.poster ? data.poster.name : workshopItem.poster,
    };

    // update item
    await workshopItemModel.update(
      params.id as string,
      dataToInclude,
      data.supportedRoles,
      data.supportedLanguages
    );

    // cleanup unused wysiwyg images
    for(const lang of Object.keys(workshopItem.description)) {
      await compareContentAndRemoveUnusedImages(workshopItem.description[lang], data.description[lang]);
    }

    // if there is new image uploaded and there was an old one, remove the old one
    if (data.poster && workshopItem.poster)
      await removeUploadedFile(workshopItem.poster);

    return redirect("/dashboard/my-workshops/" + workshopItem.directoryId);

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it
    await cleanup();
    throw error;
  }
};

/********* LOADER *********/
type Loader = WorkshopItem & { dbData: DbData };
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check permissions
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");
  const userId = await sessionService.getUserId(request);

  // try to find the workshop item and check if it is ours
  // if not found, return to workshops list
  const workshopItem = await workshopItemModel.getById(params.id as string, ["supportedRoles", "supportedLanguages"], {
    userId,
  });
  if (!workshopItem)
    return redirect("/dashboard/my-workshops");
  
  // if found, just return nothing
  return { ...workshopItem, dbData: await loadDbDataNeededForForm(schema) };
}

/********* COMPONENT *********/
export default function MyWorkshopItemEdit() {
  const actionData = useActionData<ActionData>();
  const { dbData, ...workshopItem } = useLoaderData<Loader>();
  
  return (
    <ValidationForm
      collection="workshops"
      variant="edit"
      schema={schema}
      errors={actionData?.error?.data}
      success={actionData?.success}
      defaultData={workshopItem}
      dbData={dbData}
    />
  );
}
