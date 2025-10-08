import type { Language} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import type { User} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import isInProtegeTree from "~/utils/isInProtegeTree.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import mailService from "~/utils/services/mail.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";

export const action: ActionFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.protegesInvite, "/no-permission");

  const user = await userModel.getById(params.userId as string, ["language"]) as User & { language: Language };
  const t = translateService.translate;

  if (!user)
    return redirect("/dashboard/proteges");

  // make sure if we are mentor of this user or if he is at least in our proteges list
  // if no -> no permission
  const loggedUserId = await sessionService.getUserId(request) as string;
  if (user.mentorId !== loggedUserId && !await isInProtegeTree(loggedUserId, user.id))
    return redirect("/no-permission");

  // transfer own user proteges to user mentor
  await userModel.transferProteges(user.id, user.mentorId as string);

  // remove user
  await userModel.deleteById(user.id);

  // remove user image
  if (user.avatar)
    removeUploadedFile(user.avatar);

  // ...and send mail to him with sad news :)
  await mailService.sendMail(
    user.email,
    t(user.language.name, "mails.userRemoved.subject"),
    t(user.language.name, "mails.userRemoved.text")
  );

  return redirect("/dashboard/proteges");
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.protegesInvite, "/no-permission");
  const user = await userModel.getById(params.userId as string);

  if (!user)
    return redirect("/dashboard/proteges");

  return null;
}

export default function RemoveUser() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { userId } = useParams();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/proteges/" + userId);
  }

  return (
    <>
      <Confirm
        title={t("users.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("users.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
