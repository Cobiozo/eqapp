import { NotificationContent, PermissionName } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { notificationContentModel } from "~/models/notificationContent.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { editPageFormBaseLoader } from "~/utils/PageFormBase.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  name: {
    type: "text",
    label: "notifications.fields.name",
    required: true,
    min: 2,
    max: 150,
  },
  title: {
    type: "textMultiLang",
    label: "notifications.fields.title",
    required: true,
    min: 2,
    max: 200,
  },
  description: {
    type: "wysiwygMultiLang",
    label: "catalogs.fields.description",
    required: true,
    minLength: 2,
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ],
    },
    formats: [
      'bold', 'italic', 'underline', 'strike', 'blockquote', 'list'
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
  await sessionService.requirePermission(request, PermissionName.adminNotificationsEdit, "/no-permission");

  // get notificationContent from database
  // if it doesn't exist, redirect to 404 page
  const notification = await notificationContentModel.getById(params.id as string);
  if(!notification)
    return redirect("/404");

  // get data from request and validate it
  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request, notification);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ data: validationResult });

  try {
    // update workshop
    await notificationContentModel.update(notification.id, data);

    // redirect to the list of all categories
    return redirect("/dashboard/admin/notifications?notificationUpdated=true");

  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = {
  notification: NotificationContent
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminNotificationsEdit, "/no-permission");

  return await editPageFormBaseLoader(params, "notifications", notificationContentModel, schema);
}

/********* COMPONENT *********/

export default function EditNotification() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<UpdateNotificationActionData>();
  const notification = useLoaderData<LoaderData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/notifications">
        {t("notifications.edit.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="notifications"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={notification}
      />
    </section>
  );
}

