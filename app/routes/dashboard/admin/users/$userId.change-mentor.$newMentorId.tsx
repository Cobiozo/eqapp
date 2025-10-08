import { NotificationContentType, PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { PushNotification } from "~/utils/server/pwa-utils.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminProtegesChangeMentor, "/dashboard/admin/users");

  // try to find protege and mentor
  // check if protege exists and is under mentor's tree
  const protegeId = params.userId as string;
  const protege = await userModel.getByIdWithRole(protegeId, ["language"]);
  if (!protege)
    return redirect("/dashboard/admin/users");

  // check if new mentor really exists and has permission to invite proteges
  const newMentorId = params.newMentorId as string;
  const newMentor = await userModel.getByIdWithRole(newMentorId);
  if (!newMentor || !newMentor.permissions.protegesInvite || newMentor.id === protege.mentorId || newMentor.id === protege.id)
    return redirect("/dashboard/admin/users");

  // now we can safely change mentor
  await userModel.changeMentor(protegeId, newMentorId);

  // also push notification to protege
  await PushNotification(
    request,
    protege,
    NotificationContentType.MENTOR_CHANGE,
    newMentor.firstName + " " + newMentor.lastName,
    { mentorId: newMentor.id }
  )

  return redirect(`/dashboard/admin/users/edit/${protegeId}?mentorChanged=true`);
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminProtegesChangeMentor, "/dashboard/admin/users");

  // try to find protege
  const protegeId = params.userId as string;
  const protege = await userModel.getByIdWithRole(protegeId);
  if (!protege)
    return redirect("/dashboard/admin/users");

  // check if new mentor really exists and has permission to invite proteges
  const newMentorId = params.newMentorId as string;
  const newMentor = await userModel.getByIdWithRole(newMentorId);
  if (!newMentor || !newMentor.permissions.protegesInvite || newMentor.id === protege.mentorId || newMentor.id === protege.id)
    return redirect("/dashboard/admin/users");

  return null;
}

export default function ProtegeMentorChange() {
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
        title={t("proteges.changeMentor.confirm.title")}
        variant="info"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("proteges.changeMentor.confirm.desc")}
      </Confirm>
    </>
  )
}
