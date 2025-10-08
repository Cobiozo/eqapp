import { PermissionName, Role, RoleName } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineLaptop } from "react-icons/ai";
import { BiCrown, BiShoppingBag } from "react-icons/bi";
import { IoDiamondOutline } from "react-icons/io5";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import Notification from "~/components/ui/Notification";
import { roleModel } from "~/models/role.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = Role[]

export const loader: LoaderFunction = async ({ request }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminRolesRead, "/dashboard/admin");

  // get all roles
  return await roleModel.getAll();
}

export default function Workshops() {
  const { t } = useContext(GlobalContext);
  const roles = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const roleUpdated = searchParams.get("roleUpdated") as string;
  const error = searchParams.get("error") as string;

  const getIcon = (role: Role) => {
    switch (role.name) {
      case RoleName.ADMIN:
        return BiCrown;
      case RoleName.CLIENT:
        return BiShoppingBag;
      case RoleName.PARTNER:
        return AiOutlineLaptop;
      case RoleName.LEADER:
        return IoDiamondOutline;
      default:
        return BiCrown;
    }
  };

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {t("roles.title")}
      </AdminPageHeader>
      { roleUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("roles.saved")}
        </Notification>
      )}
      { error && (
        <Notification variant="danger" autoClose={true}>
          {t("common.unexpectedError")}
        </Notification>
      )}
      <section>
        <ul className="flex flex-col">
          {roles.filter(role => ![RoleName.CLIENT, RoleName.CANDIDATE_PARTNER].includes(role.name)).map((role) => (
            <li key={role.id}>
              <Button
                variant="secondary"
                size="sm"
                to={`/dashboard/admin/roles/${role.id}`}
                icon={getIcon(role)}
                className="w-full max-w-sm mx-auto my-1"
              >
                {t("users.roles." + role.name.toLowerCase())}
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
