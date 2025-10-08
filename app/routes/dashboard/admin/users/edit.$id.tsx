import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useSearchParams } from "@remix-run/react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import { useContext } from "react";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import type { UserWithRole } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import type { User } from "@prisma/client";
import { PermissionName } from "@prisma/client";
import { editPageFormBaseLoader } from "~/utils/PageFormBase.server";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import UserActionsBox from "~/components/layout/UserActionsBox";
import Notification from "~/components/ui/Notification";

const schema = createFormSchema({
  firstName: {
    type: "text",
    label: "users.fields.firstName",
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: "text",
    label: "users.fields.lastName",
    required: true,
    min: 2,
    max: 100,
  },
});

/********* ACTION *********/
interface CreatePostActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersEdit, "/dashboard");

  // if there are no errors, get the user from session
  // if user is not admin, redirect to /users
  const loggedUser = await sessionService.getUser(request) as UserWithRole;
  if (!loggedUser?.permissions.adminUsersEdit)
    return redirect("/dashboard/admin/users");

  // get user from db
  // if it doesn't exist, redirect to /users
  const userId = params.id as string;
  const user = await userModel.getById(userId);
  if (!user)
    return redirect("/dashboard/admin/users");

  // get data from request and validate it
  // if error throw them
  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request, user);
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ data: validationResult });

  try {
    await userModel.update(user.id, {
      firstName: data.firstName,
      lastName: data.lastName,
    });

    return redirect("/dashboard/admin/users/?userUpdated=true");

  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
   }
};

/********* LOADER *********/
interface LoaderData {
  user: User;
  dbData: Record<string, any>
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersEdit, "/dashboard");

  return await editPageFormBaseLoader(params, "users", userModel, schema, ["role"]);
}

/********* COMPONENT *********/
export default function EditProfile() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreatePostActionData>();
  const { dbData, ...user } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const protegePromoted = searchParams.get("protegePromoted");
  const mentorChanged = searchParams.get("mentorChanged");
  const protegeDemoted = searchParams.get("protegeDemoted");

  return (
    <section className="w-fit mx-auto">
      <AdminPageHeader returnLink="/dashboard/admin/users">
        {t("users.edit.title")}
      </AdminPageHeader>
        { protegePromoted && (
          <Notification variant="success" autoClose={true}>
            {t("proteges.protegePromoted")}
          </Notification>
        )}
        { mentorChanged && (
          <Notification variant="success" autoClose={true}>
            {t("proteges.mentorChanged")}
          </Notification>
        )}
        { protegeDemoted && (
          <Notification variant="success" autoClose={true}>
            {t("proteges.protegeDemoted")}
          </Notification>
        )}
      <div className="flex flex-col gap-4 mt-4 md:flex-row">
        <div className="order-1 md:order-0">
          <ValidationForm
            collection="users"
            variant="edit"
            schema={schema}
            errors={actionData?.error?.data}
            success={actionData?.success}
            defaultData={user}
            dbData={dbData}
          />
        </div>
        <UserActionsBox
          protege={user}
          className="border-b border-zinc-600 md:border-l pb-6 md:border-b-0 md:mt-0 px-2 md:order-1"
        />
      </div>
    </section>
  );
}
