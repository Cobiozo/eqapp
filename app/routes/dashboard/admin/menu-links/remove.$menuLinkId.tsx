import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { menuLinkModel } from "~/models/menuLink.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminMenuLinksRemove, "/no-permission");

  // try to find menuLink, if not found, redirect to 404
  const menuLink = await menuLinkModel.getById(params.menuLinkId as string);
  if (!menuLink)
    return redirect("/404");

  // remove menuLink
  await menuLinkModel.deleteById(menuLink.id);

  // redirect to menuLinks list
  return redirect("/dashboard/admin/menu-links");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminMenuLinksRemove, "/no-permission");

  // try to find menuLink, if not found, redirect to menuLinks list
  const menuLink = await menuLinkModel.getById(params.menuLinkId as string);
  if (!menuLink)
    return redirect("/dashboard/admin/menu-links");

  return null;

}

export default function RemoveMenuLink() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <>
      <Confirm
        title={t("menuLinks.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("menuLinks.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
