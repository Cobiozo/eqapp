import { Permission, PermissionName } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import SwitchField from "~/components/ui/SwitchField";
import { roleModel, RoleWithPermissions } from "~/models/role.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = {
  role: RoleWithPermissions;
  permissions: Permission[];
}

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminRolesEdit, "/dashboard/admin/roles");

  // try to get role and its permissions
  // if role not found, redirect to no-permission page
  const roleId = params.roleId as string;
  const role = await roleModel.getByIdWithPermissions(roleId);
  if (!role)
    return redirect("/no-permission");

  // get all permissions
  const permissions = await roleModel.getAllPermissions();

  // parse permissions from request body
  // determine which permission should we connect to role
  // and which should we disconnect
  const formData = await request.formData();
  const permissionsToConnect: Permission["id"][] = [];
  for (const permission of permissions) {
    if(formData.get(permission.name) === "on")
      permissionsToConnect.push(permission.id);
  }
  const permissionsToDisconnect = permissions
    .filter((rolePermission) => !permissionsToConnect.includes(rolePermission.id))
    .map((rolePermission) => rolePermission.id);

  try {
    // update permissions
    await roleModel.activatePermissions(roleId, permissionsToConnect);
    await roleModel.deactivatePermissions(roleId, permissionsToDisconnect);
  } catch (error) {
    return redirect("/dashboard/admin/roles?error=true");
  }

  // redirect to roles list
  return redirect("/dashboard/admin/roles?roleUpdated=true");
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminRolesEdit, "/dashboard/admin/roles");

  // try to get role and its permissions
  // if role not found, redirect to roles list
  const roleId = params.roleId as string;
  const role = await roleModel.getByIdWithPermissions(roleId);
  if (!role)
    return redirect("/dashboard/admin/roles");

  // get all permissions
  const permissions = await roleModel.getAllPermissions();

  // return role and permissions
  return { role, permissions };
}

export default function RoleEdit() {
  const { role, permissions } = useLoaderData<LoaderData>();
  const { t } = useContext(GlobalContext);


  return (
    <section>
      <AdminPageHeader
        returnLink="/dashboard/admin/roles"
      >
        {t("users.roles." + role.name.toLocaleLowerCase())}
      </AdminPageHeader>
      <Form method="post" className="max-w-xl mx-auto text-sm">
        <ul>
          {permissions.map((permission) => (
            <li key={permission.id}>
              <SwitchField
                className="border-b border-light-border dark:border-medium-darker  pb-4"
                label={t("roles.permissions." + permission.name)}
                name={permission.name}
                defaultValue={role.permissions[permission.name]}
              />
            </li>
          ))}
        </ul>
        <Button type="submit" icon={FaCheck} className="mt-10 mx-auto">
          {t("roles.saveAction")}
        </Button>
      </Form>
    </section>
  );
}
