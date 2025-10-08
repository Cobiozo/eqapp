import { PermissionName } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { announcementModel } from "~/models/announcement.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminAnnouncementsRemove, "/no-permission");

  // try to find announcement, if not found, redirect to announcements list
  const announcement = await announcementModel.getById(params.announcementId as string);
  if (!announcement)
    return redirect("/404");

  // remove announcement (notifications should remove automatically)
  await announcementModel.deleteById(announcement.id);

  // remove wysiwyg images
  for (const lang of Object.keys(announcement.description)) {
    await cleanupWysiwygImages(announcement.description[lang]);
  }

  // redirect to announcements list
  return redirect("/dashboard/admin/announcements?announcementRemoved=true");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminAnnouncementsRemove, "/no-permission");

  // try to find announcement, if not found, redirect to announcements list
  const announcement = await announcementModel.getById(params.announcementId as string);
  if (!announcement)
    return redirect("/dashboard/admin/announcements");

  return null;

}

export default function RemoveAnnouncement() {
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
        title={t("announcements.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("announcements.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
