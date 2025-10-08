import { redirect, type LoaderFunction } from "@remix-run/node";
import { useContext } from "react";
import Alert from "~/components/ui/Alert";
import Animated from "~/components/ui/Animated";
import PageHeader from "~/components/ui/PageHeader";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { gr } from "~/utils/gr.server";
import mailService from "~/utils/services/mail.server";
import translateService from "~/utils/services/translate.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  
  // try to find user with given id
  const userId = params.userId as string;
  const user = await userModel.getById(userId, ["language"]);
  if(!user)
    return redirect("/404")

  if (user.emailVerified)
    return null;

  // if user is okay, activate his email
  await userModel.activateEmail(userId);

  // we can also save this contact in GetResponse db
  await gr.saveContactToCampaign({
    variant: "partner",
    name: `${user!.firstName} ${user!.lastName}`,
    email: user!.email,
  });

  // send email with mail verification link
  const t = translateService.translate;

  await mailService.sendMail(
    user!.email,
    t(user.language.name, "mails.waitForActivationEmail.subject"),
    t(user.language.name, "mails.waitForActivationEmail.text")
  );

  return null;
}

export default function VerifyEmail() {
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <PageHeader>
        {t("verifyEmail.title")}
      </PageHeader>
      <Animated animation="fadeInUp" className="w-fit mx-auto">
        <Alert
          variant="success"
          title={t("verifyEmail.successTitle")}
        >
          {t("verifyEmail.successDescription")}
        </Alert>
     </Animated>
    </section>
  )
}