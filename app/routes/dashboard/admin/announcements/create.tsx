import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { announcementModel } from "~/models/announcement.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  title: {
    type: "textMultiLang",
    label: "announcements.fields.title",
    required: true,
    min: 2,
    max: 150,
  },
  description: {
    type: "wysiwygMultiLang",
    label: "announcements.fields.description",
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
  startAt: {
    type: "date",
    label: "announcements.fields.startAt",
    required: true,
  },
});

/********* ACTION *********/
interface ActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request }) => {
  
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminAnnouncementsCreate, "/no-permission");

  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request);

  // CLEANUP FUNC
  const cleanup = async () => {
    cleanupWysiwygImages(data.content);
  }
 
  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    // create announcement
    await announcementModel.create(data);

    // redirect to the list of all categories
    return redirect("/dashboard/admin/announcements?announcementCreated=true");

  } catch (error: any) {
    await cleanup();
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminAnnouncementsCreate, "/no-permission");

  return null;
}

/********* COMPONENT *********/

export default function AnnouncementsCreate() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<ActionData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/announcements">
        {t("announcements.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="announcements"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}

