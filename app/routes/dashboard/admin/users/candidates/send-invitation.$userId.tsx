import { PermissionName, RoleName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";
import mailService from "~/utils/services/mail.server";
import { languageModel } from "~/models/language.server";

export const action: ActionFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersEdit, "/dashboard");

  // try to find the user
  const userId = params.userId as string;
  const user = await userModel.getByIdWithRole(userId, ["language"]);
  if (!user)
    return redirect("/dashboard/admin/users/candidates");

  // check if user is really candidate partner and is not already verified
  // if so, we shouldn't send him invitation again
  if (user.role.name !== RoleName.CANDIDATE_PARTNER || user.verified)
    return redirect("/dashboard/admin/users/candidates");

  // send mail with invitation
  const t = translateService.translate;
  const currentLang = await translateService.getCurrentLang(request);
  const langRecord = await languageModel.getByName(currentLang);
  const url = new URL(request.url);
  const registerUrl = url.origin + "/dashboard/auth/before-join/" + user.mentorId;

  await mailService.sendMail(
    user.email,
    t(langRecord!.name, "mails.userInvited.subject"),
    t(langRecord!.name, "mails.userInvited.text", registerUrl)
  );

  return redirect(`/dashboard/admin/users/candidates?invitationSent=true`);
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersEdit, "/dashboard");

  // try to find the user
  const userId = params.userId as string;
  const user = await userModel.getByIdWithRole(userId, ["language"]);
  if (!user)
    return redirect("/dashboard/admin/users/candidates");

  // check if user is really candidate partner and is not already verified
  // if so, we shouldn't send him invitation again
  if (user.role.name !== RoleName.CANDIDATE_PARTNER || user.verified)
    return redirect("/dashboard/admin/users/candidates");

  return null;
}

export default function ProtegeInvite() {
  const { t } = useContext(GlobalContext);

  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/users/candidates");
  }

  return (
    <>
      <Confirm
        title={t("users.invitation.confirm.title")}
        variant="info"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("users.invitation.confirm.desc")}
      </Confirm>
    </>
  )
}
