import type { Language} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import type { User} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import mailService from "~/utils/services/mail.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";

export const action: ActionFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersRemove, "/dashboard");

  const user = await userModel.getById(params.userId as string, ["language"]) as User & { language: Language };
  const t = translateService.translate;

  if (!user)
    return redirect("/dashboard/admin/users");

  // transfer own user proteges to user mentor
  await userModel.transferProteges(user.id, user.mentorId as string);

  // remove user
  await userModel.deleteById(user.id);

  // remove user image
  if (user.avatar)
    removeUploadedFile(user.avatar);

  // ...and send mail to him with happy news :)
  await mailService.sendMail(
    user.email,
    t(user.language.name, "mails.userRemoved.subject"),
    t(user.language.name, "mails.userRemoved.text")
  );

  return redirect("/dashboard/admin/users");
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersRemove, "/dashboard");
  const user = await userModel.getById(params.userId as string);

  if (!user)
    return redirect("/dashboard/admin/users");

  return null;
}

export default function RemoveUser() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/users");
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
