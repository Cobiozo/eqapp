import type { Language} from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { languageModel } from "~/models/language.server";
import { userModel } from "~/models/user.server";
import mailService from "~/utils/services/mail.server";
import translateService from "~/utils/services/translate.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const secret = params.secret as string;
  if (secret !== process.env.CRON_SECRET)
    return redirect("/404");

  // 1. get all the users and languages
  const users = await userModel.getMany({
    verified: true
  });
  const languages = await languageModel.getMany({});

  // 2. loop through every user and send him the e-mail
  const t = translateService.translate;
  for (const user of users) {
    const languageName = languages.find(l => l.id === user.languageId)?.name as Language["name"];

     // ...and send mail:)
     await mailService.sendMail(
       user.email,
       t(languageName, "mails.verificationReminder.subject"),
       t(languageName, "mails.verificationReminder.text")
     );
  }

  return null;
}
