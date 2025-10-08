import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { boardItemVideoModel } from "~/models/boardItemVideo.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find boardItemVideo, if not found, redirect to 404
  const boardItemVideo = await boardItemVideoModel.getById(params.videoId as string);
  if (!boardItemVideo)
    return redirect("/404");

  // remove boardItemVideo
  await boardItemVideoModel.deleteById(boardItemVideo.id);

  // redirect to boardItemVideos list
  return redirect("/dashboard/admin/boards/edit/item/" + boardItemVideo.boardItemId + "/videos");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find boardItemVideo, if not found, redirect to boardItemVideos list
  const boardItemVideo = await boardItemVideoModel.getById(params.videoId as string);
  if (!boardItemVideo)
    return redirect("/404");

  return null;
}

export default function RemoveBoardItemVideo() {
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
        title={t("boardItemVideos.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("boardItemVideos.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
