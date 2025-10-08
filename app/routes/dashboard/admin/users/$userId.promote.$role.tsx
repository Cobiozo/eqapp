import { ActivityType, NotificationContentType, RoleName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { roleModel } from "~/models/role.server";
import translateService from "~/utils/services/translate.server";
import { PushNotification } from "~/utils/server/pwa-utils.server";

export const action: ActionFunction = async ({ request, params }) => {
  const roleName = params.role as string;
  const userId = params.userId as string;

  // require permission to promote to this role
  await sessionService.requirePermission(
    request,
    "adminProtegesPromoteTo" + roleName as PermissionName,
    "/dashboard/admin/users"
  );

  // check if role is valid
  const role = await roleModel.getByName(roleName as RoleName);
  if (!role)
    return redirect("/dashboard/admin/users");

  // check if user exists
  const user = await userModel.getByIdWithRole(userId, ["language"]);
  if (!user)
    return redirect("/dashboard/admin/users");

  // user can be only promoted to role higher than one step in the ladder
  // so if user is partner, he can be leader, but not to admin and so on.
  const rolesArray = Object.values(RoleName);
  const userRoleIndex = rolesArray.indexOf(user.role.name);
  const newRoleIndex = rolesArray.indexOf(role.name);
  if (newRoleIndex - userRoleIndex > 1)
    return redirect("/dashboard/admin/users");

  // update user role
  await userModel.updateById(user.id, {
    roleId: role.id,
    activity: {
      create: {
        type: ActivityType.PROMOTION,
        roleId: role.id
      }
    }
  });

  // send push with gratulation
  const t = translateService.translate;
  const userRoleName = t(user.language.name, `users.roles.${role.name.toLowerCase()}`);
  await PushNotification(
    request,
    user,
    NotificationContentType.PROMOTION,
    userRoleName,
    { roleId: role.id}
  );

  return redirect(`/dashboard/admin/users/edit/${userId}?protegePromoted=true`);
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = params.userId as string;
  const role = params.role as string;

  // require permission to promote to this role
  await sessionService.requirePermission(
    request,
    "adminProtegesPromoteTo" + role as PermissionName,
    "/dashboard/admin/users"
  );

  // check if role is valid
  if (!(role in RoleName))
    return redirect("/dashboard/admin/users");

  // check if user exists
  const user = await userModel.getByIdWithRole(userId);
  if (!user)
    return redirect("/dashboard/admin/users");

  // user can be only promoted to role higher than one step in the ladder
  // so if user is partner, he can be promoted to BUSINESS_PARTNER, but not to admin and so on.
  const rolesArray = Object.values(RoleName);
  const userRoleIndex = rolesArray.indexOf(user.role.name);
  const newRoleIndex = rolesArray.indexOf(role as RoleName);
  if (newRoleIndex - userRoleIndex > 1)
    return redirect("/dashboard/admin/users");

  return null;
}

export default function ProtegePromote() {
  const { t } = useContext(GlobalContext);
  const { userId } = useParams();

  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/users/edit/" + userId);
  }

  return (
    <>
      <Confirm
        title={t("proteges.promotion.confirm.title")}
        variant="info"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("proteges.promotion.confirm.desc")}
      </Confirm>
    </>
  )
}
