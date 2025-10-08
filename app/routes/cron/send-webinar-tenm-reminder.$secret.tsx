import type { Language} from "@prisma/client";
import { NotificationContentType, RoleName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { User} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import type { Webinar} from "~/models/webinar.server";
import { webinarModel } from "~/models/webinar.server";
import { PushNotification } from "~/utils/server/pwa-utils.server";
import mailService from "~/utils/services/mail.server";
import translateService from "~/utils/services/translate.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const secret = params.secret as string;
  if (secret !== process.env.CRON_SECRET)
    return redirect("/404");

  // find webinars that starts in 10 minutes and send push notifications to subscribers
  // also send mails if it's external webinar (YT)
  // 1. determine safe range for 10 minutes (we check e.g. at 16:50 for webinars that starts at 17:00, but with safe range from from 16:55 to 17:05)
  const dateSafeOne = new Date();
  dateSafeOne.setMinutes(dateSafeOne.getMinutes() + 15);
  const dateSafeTwo = new Date();
  dateSafeTwo.setMinutes(dateSafeTwo.getMinutes() + 5);

  // 2. find webinars that startAt is between now and datePlusOneAndHalfHour
  // get subscribers for each webinar
  const webinarsTwo = await webinarModel.getMany({
    startAt: {
      gte: dateSafeTwo,
      lte: dateSafeOne
    }
  }, ["subscribedUsers"]) as (Webinar & { subscribedUsers: { userId: string }[] })[];

  // 3. loop over each webinar
  for(const web of webinarsTwo) {

    // a) load real users (subscribedUsers has only userId)
    const users = await userModel.getMany({
      id: {
        in: web.subscribedUsers.map(u => u.userId)
      },
    }, ["language", "role"]) as (User & { language: Language } & { role: { name: RoleName } })[];

    // b) send push notification to each user
    for(const user of users) {
      const title = web.title[user.language.name] || "";
      await PushNotification(
        request,
        user,
        NotificationContentType.WEBINAR_STARTS_IN_10_MINUTES,
        title,
        { webinarId: web.id }
      );

      // if it's external webinar, send mail
      if (web.isExternal) {
        const url = new URL(request.url);
        const webinarLink = url.origin + "/dashboard/webinars/" + ((user.role.name === RoleName.CLIENT || user.role.name === RoleName.CANDIDATE_PARTNER) ? "client" : "partner") + "/play/" + web.id + "?usr=" + user.id;
        const t = translateService.translate;
        await mailService.sendMail(
          user.email,
          t(user.language.name, "mails.webinarStartsInTenMinutes.subject"),
          t(user.language.name, "mails.webinarStartsInTenMinutes.text", web.title[user.language.name] || "", webinarLink)
        );
      }
    }
  }
  
  return null;
}
