import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { globalMiddleware } from "~/middlewares/global.server";
import { workshopItemFileModel } from "~/models/workshopItemFile.server";
import { GlobalContext } from "~/root";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");

  // try to find workshopItemFile, if not found, redirect to 404
  const workshopItemFile = await workshopItemFileModel.getById(params.fileId as string);
  if (!workshopItemFile)
    return redirect("/404");

  // remove workshopItemFile
  await workshopItemFileModel.deleteById(workshopItemFile.id);

  // remove file from disk
  await removeUploadedFile(workshopItemFile.name);

  // redirect to workshopItemFiles list
  return redirect("/dashboard/my-workshops/edit/item/" + workshopItemFile.workshopItemId + "/files");

}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check permissions
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");

  // try to find workshopItemFile, if not found, redirect to workshopItemFiles list
  const workshopItemFile = await workshopItemFileModel.getById(params.fileId as string);
  if (!workshopItemFile)
    return redirect("/404");

  return null;
}

export default function RemoveMyWorkshopItemFile() {
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
        title={t("workshopItemFiles.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("workshopItemFiles.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
