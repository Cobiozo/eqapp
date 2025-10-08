import { NotificationContentType, PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import isInProtegeTree from "~/utils/isInProtegeTree.server";
import { PushNotification } from "~/utils/server/pwa-utils.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.protegesInvite, "/dashboard/proteges");

  // try to find protege and mentor
  // check if protege exists and is under mentor's tree
  const mentorId = await sessionService.getUserId(request) as string;
  const protegeId = params.userId as string;
  const protege = await userModel.getByIdWithRole(protegeId, ["language"]);
  if (!protege || (protege.mentorId !== mentorId && !(await isInProtegeTree(mentorId, protege.id))))
    return redirect("/dashboard/proteges");

  // check if new mentor really exists and has permission to invite proteges
  const newMentorId = params.newMentorId as string;
  const newMentor = await userModel.getByIdWithRole(newMentorId);
  if (!newMentor)
    return redirect("/dashboard/proteges");

  // also check if newMentor is not protege's current mentor, because it would be useless
  // also check if new mentor isn't protege itself, because it would be useless too
  // also check if new mentor isn't down under protege's tree, because then the change would mess up the tree
  if (newMentorId === protege.mentorId || newMentorId === protege.id)
    return redirect("/dashboard/proteges");
 
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

  return redirect(`/dashboard/proteges/${protegeId}?mentorChanged=true`);
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.protegesInvite, "/dashboard/proteges");

  // try to find protege and mentor
  // check if protege exists and is under mentor's tree
  const mentorId = await sessionService.getUserId(request) as string;
  const protegeId = params.userId as string;
  const protege = await userModel.getByIdWithRole(protegeId);
  if (!protege || (protege.mentorId !== mentorId && !(await isInProtegeTree(mentorId, protege.id))))
    return redirect("/dashboard/proteges");

  // check if new mentor really exists and has permission to invite proteges
  const newMentorId = params.newMentorId as string;
  const newMentor = await userModel.getByIdWithRole(newMentorId);
  if (!newMentor)
    return redirect("/dashboard/proteges");

  // also check if newMentor is not protege's current mentor, because it would be useless
  // also check if new mentor isn't protege itself, because it would be useless too
  // also check if new mentor isn't down under protege's tree, because then the change would mess up the tree
  if (newMentorId === protege.mentorId || newMentorId === protege.id)
    return redirect("/dashboard/proteges");

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
