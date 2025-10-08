import AdminPageHeader   from "~/components/ui/AdminPageHeader";
import { GlobalContext } from "~/root";
import createFormSchema from "~/utils/validation/createFormSchema";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { sessionService } from "~/utils/services/session.server";
import type { Announcement} from "~/models/announcement.server";
import { announcementModel } from "~/models/announcement.server";
import { editPageFormBaseLoader } from "~/utils/PageFormBase.server";
import { PermissionName } from "@prisma/client";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import compareContentAndRemoveUnusedImages from "~/utils/compareContentAndRemoveUnusedImages.server";

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
interface UpdateAnnouncementActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminAnnouncementsEdit, "/no-permission");

  // get workshop from db
  // if it doesn't exist, redirect to /dashboard/admin/workshops/categories
  const announcement = await announcementModel.getById(params.id as string);
  if(!announcement)
    return redirect("/404");

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
    // update announcement
    await announcementModel.update(announcement.id, data);

    for(const lang of Object.keys(announcement.description)) {
      await compareContentAndRemoveUnusedImages(announcement.description[lang], data.description[lang]);
    }

    // redirect to the list of all announcements
    return redirect("/dashboard/admin/announcements?announcementUpdated=true");

  } catch (error: any) {
    await cleanup();
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = {
  announcement: Announcement
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminAnnouncementsEdit, "/no-permission");

  return await editPageFormBaseLoader(params, "announcements", announcementModel, schema);
}

/********* COMPONENT *********/

export default function AnnouncementEdit() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<UpdateAnnouncementActionData>();
  const announcement = useLoaderData<LoaderData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/announcements">
        {t("announcements.edit.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="announcements"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={announcement}
      />
    </section>
  );
}

