import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { cm } from "~/utils/cm.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsRemove, "/no-permission");

  // try to find webinar, if not found, redirect to webinars list
  const webinar = await webinarModel.getById(params.id as string);
  if (!webinar)
    return redirect("/dashboard/admin/webinars");

  // if webinar has an image, remove it
  if (webinar.poster)
    await removeUploadedFile(webinar.poster);

  // remove wysiwyg images
  for (const lang of Object.keys(webinar.description)) {
    await cleanupWysiwygImages(webinar.description[lang]);
  }

  try {

    // if webinar is internal, remove it from clickMeeting
    // internal = clickMeeting webinar
    if (!webinar.isExternal)
      await cm.removeWebinar(webinar.cmId);

    // remove webinar record
    await webinarModel.deleteById(webinar.id);

    // redirect to the webinars list
    return redirect("/dashboard/admin/webinars");
    
  } catch (error) {
      throw error;
  }

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsRemove, "/no-permission");

 // try to find webinar, if not found, redirect to webinars list
 const webinar = await webinarModel.getById(params.id as string);
 if (!webinar)
   return redirect("/dashboard/admin/webinars");

  return null;

}

export default function RemovePage() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/webinars");
  }

  return (
    <>
      <Confirm
        title={t("pages.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("pages.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
