import type { NotificationContent} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { personalizedContentModel } from "~/models/personalizedContent.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import compareContentAndRemoveUnusedImages from "~/utils/compareContentAndRemoveUnusedImages.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import { editPageFormBaseLoader } from "~/utils/PageFormBase.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  name: {
    type: "text",
    label: "personalizedContent.fields.name",
    required: true,
    min: 2,
    max: 150,
  },
  title: {
    type: "textMultiLang",
    label: "personalizedContent.fields.title",
    required: true,
    min: 2,
    max: 200,
  },
  content: {
    type: "wysiwygMultiLang",
    label: "personalizedContent.fields.content",
    required: true,
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
});

/********* ACTION *********/
interface UpdateNotificationActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminSystemPersonalizationEdit, "/no-permission");

  // prepare cleanup function
  const cleanup = async () => {
    cleanupWysiwygImages(data.content);
  }

  // get personalizedContent from database
  // if it doesn't exist, redirect to 404 page
  const personalizedContent = await personalizedContentModel.getById(params.id as string);
  if(!personalizedContent) {
    await cleanup();
    return redirect("/404");
  }

  // get data from request and validate it
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request, personalizedContent);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    // update personalizedContent in database
    await personalizedContentModel.update(personalizedContent.id, data);

    // cleanup unused wysiwyg images
    for(const lang of Object.keys(personalizedContent.content)) {
      await compareContentAndRemoveUnusedImages(personalizedContent.content[lang], data.content[lang]);
    }

    // redirect to the list of all categories
    return redirect("/dashboard/admin/personalized-content?personalizedContentUpdated=true");

  } catch (error: any) {
    // cleanup if error
    await cleanup();
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = {
  personalizedContent: NotificationContent
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminSystemPersonalizationEdit, "/no-permission");

  return await editPageFormBaseLoader(params, "personalizedContent", personalizedContentModel, schema);
}

/********* COMPONENT *********/

export default function EditNotification() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<UpdateNotificationActionData>();
  const personalizedContent = useLoaderData<LoaderData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/personalized-content">
        {t("personalizedContent.edit.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="personalizedContent"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={personalizedContent}
      />
    </section>
  );
}

