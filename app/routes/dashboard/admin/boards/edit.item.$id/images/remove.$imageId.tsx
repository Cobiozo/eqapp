import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { boardItemImageModel } from "~/models/boardItemImage.server";
import { GlobalContext } from "~/root";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find boardItemImage, if not found, redirect to 404
  const boardItemImage = await boardItemImageModel.getById(params.imageId as string);
  if (!boardItemImage)
    return redirect("/404");

  // remove boardItemImage
  await boardItemImageModel.deleteById(boardItemImage.id);

  // remove image file as well
  await removeUploadedFile(boardItemImage.name);

  // redirect to boardItemImages list
  return redirect("/dashboard/admin/boards/edit/item/" + boardItemImage.boardItemId + "/images");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find boardItemImage, if not found, redirect to boardItemImages list
  const boardItemImage = await boardItemImageModel.getById(params.imageId as string);
  if (!boardItemImage)
    return redirect("/404");

  return null;
}

export default function RemoveBoardItemImage() {
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
        title={t("boardItemImages.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("boardItemImages.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
