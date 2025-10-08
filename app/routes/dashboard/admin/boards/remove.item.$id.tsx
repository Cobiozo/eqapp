import { BoardItemType, PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { boardItemModel } from "~/models/boardItem.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import removeUploadedFiles from "~/utils/removeUploadedFiles.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to get board item
  // if not found, redirect to boards list
  const boardItem = await boardItemModel.getById(params.id as string);
  if (!boardItem)
    return redirect("/404");

  try {

    // if boardItem is ADVANCED type
    // retrieve its files
    const filesToRemove = boardItem.type === BoardItemType.ADVANCED
      ? await boardItemModel.getFiles(boardItem.id)
      : [];

    // remove board item
    await boardItemModel.deleteById(params.id as string);

    // if its TEXT type, remove unused images from wysiwyg and other related files
    if (boardItem.text) {
      for (const lang of Object.keys(boardItem.text)) {
        await cleanupWysiwygImages(boardItem.text[lang]);
      }
      await removeUploadedFiles(filesToRemove);
    }

    // redirect to board parent directory
    return redirect("/dashboard/admin/boards/" + boardItem.directoryId);

  } catch (error) {
    throw error;
  }

}

export const loader: LoaderFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to get item
  // if not found, redirect to boards list
  const boardItem = await boardItemModel.exists({ id: params.id as string });
  if (!boardItem)
    return redirect("/dashboard/admin/boards");

  return null;
}

export default function RemoveBoardItem() {
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
        title={t("boards.items.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("boards.items.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
