import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { boardItemFileModel } from "~/models/boardItemFile.server";
import { GlobalContext } from "~/root";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find boardItemFile, if not found, redirect to 404
  const boardItemFile = await boardItemFileModel.getById(params.videoId as string);
  if (!boardItemFile)
    return redirect("/404");

  // remove boardItemFile
  await boardItemFileModel.deleteById(boardItemFile.id);

  // remove file from disk
  await removeUploadedFile(boardItemFile.name);

  // redirect to boardItemFiles list
  return redirect("/dashboard/admin/boards/edit/item/" + boardItemFile.boardItemId + "/files");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find boardItemFile, if not found, redirect to boardItemFiles list
  const boardItemFile = await boardItemFileModel.getById(params.videoId as string);
  if (!boardItemFile)
    return redirect("/404");

  return null;
}

export default function RemoveBoardItemFile() {
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
        title={t("boardItemFiles.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("boardItemFiles.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
