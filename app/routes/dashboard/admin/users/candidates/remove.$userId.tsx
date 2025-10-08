import type { Language} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import type { User} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersRemove, "/dashboard");

  const user = await userModel.getById(params.userId as string, ["language"]) as User & { language: Language };
  if (!user)
    return redirect("/dashboard/admin/users/candidates");

  // remove user
  await userModel.deleteById(user.id);

  return redirect("/dashboard/admin/users/candidates");
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersRemove, "/dashboard");
  const user = await userModel.getById(params.userId as string);

  if (!user)
    return redirect("/dashboard/admin/users/candidates");

  return null;
}

export default function RemoveUser() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/users/candidates");
  }

  return (
    <>
      <Confirm
        title={t("users.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("users.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
