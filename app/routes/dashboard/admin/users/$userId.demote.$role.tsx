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
  const userId = params.userId as string;
  const roleName = params.role as string;

  // check if role is valid
  const role = await roleModel.getByName(roleName as RoleName);
  if (!role)
    return redirect("/dashboard/admin/users");

  // require permission to demote to this role
  await sessionService.requirePermission(
    request,
    "adminProtegesDemoteTo" + role.name as PermissionName,
    "/dashboard/admin/users"
  );

  // check if user exists
  const user = await userModel.getByIdWithRole(userId, ["language"]);
  if (!user)
    return redirect("/dashboard/admin/users");

  // user can be only promoted to role than is one step down in the ladder
  // so if user is partner, he can be promoted to key_partner, but not to admin and so on.
  // With one exception –> everybody can be demoted to client at every moment.
  const rolesArray = Object.values(RoleName);
  const userRoleIndex = rolesArray.indexOf(user.role.name);
  const newRoleIndex = rolesArray.indexOf(role.name);
  if (userRoleIndex - newRoleIndex > 1)
    return redirect("/dashboard/admin/users");

  // update user role
  await userModel.updateById(user.id, {
    roleId: role.id,
    activity: {
      create: {
        type: ActivityType.DEMOTION,
        roleId: role.id
      }
    }
  });

  // send push with information
  const t = translateService.translate;
  const userRoleName = t(user.language.name, `users.roles.${role.name.toLowerCase()}`);
  console.log({ roleId: role.id })
  await PushNotification(
    request,
    user,
    NotificationContentType.DEMOTION,
    userRoleName,
    { roleId: role.id }
  );

  return redirect(`/dashboard/admin/users/edit/${userId}?protegeDemoted=true`);
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = params.userId as string;
  const role = params.role as RoleName;

  // check if role is valid
  if (!(role in RoleName))
    return redirect("/dashboard/admin/users");

  // require permission to demote to this role
  await sessionService.requirePermission(
    request,
    "adminProtegesDemoteTo" + role as PermissionName,
    "/dashboard/admin/proteges"
  );

  // check if user exists
  const user = await userModel.getByIdWithRole(userId);
  if (!user)
    return redirect("/dashboard/admin/proteges");

  // user can be only promoted to role than is one step down in the ladder
  // so if user is partner, he can be promoted to key_partner, but not to admin and so on.
  const rolesArray = Object.values(RoleName);
  const userRoleIndex = rolesArray.indexOf(user.role.name);
  const newRoleIndex = rolesArray.indexOf(role);
  if (userRoleIndex - newRoleIndex > 1)
    return redirect("/dashboard/admin/proteges");

  return null;
}

export default function ProtegeDemote() {
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
        title={t("proteges.demotion.confirm.title")}
        variant="info"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("proteges.demotion.confirm.desc")}
      </Confirm>
    </>
  )
}
