import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { workshopItemModel } from "~/models/workshopItem.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import removeUploadedFiles from "~/utils/removeUploadedFiles.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminWorkshopsRemove, "/no-permission");

  // try to get workshop item
  // if not found, redirect to 404
  const workshopItem = await workshopItemModel.getById(params.id as string);
  if (!workshopItem)
    return redirect("/404");

  try {

    // retrieve its files
    const filesToRemove = await workshopItemModel.getFiles(workshopItem.id)

    // if poster exists, add it to the list of files to remove as well
    if (workshopItem.poster)
      filesToRemove.push(workshopItem.poster);

    // remove workshop item
    await workshopItemModel.deleteById(params.id as string);

    // remove unused images from wysiwyg and other related files
    for (const lang of Object.keys(workshopItem.description)) {
      await cleanupWysiwygImages(workshopItem.description[lang]);
    }
    await removeUploadedFiles(filesToRemove);

    // redirect to workshop parent directory
    return redirect("/dashboard/admin/workshops/" + workshopItem.directoryId);

  } catch (error) {
    throw error;
  }

}

export const loader: LoaderFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminWorkshopsRemove, "/no-permission");

  // try to get item
  // if not found, redirect to workshops list
  const workshopItem = await workshopItemModel.exists({ id: params.id as string });
  if (!workshopItem)
    return redirect("/dashboard/admin/workshops");

  return null;
}

export default function RemoveWorkshopItem() {
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
        title={t("workshops.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("workshops.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
