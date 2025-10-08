import { RoleName, type Language} from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { announcementModel } from "~/models/announcement.server";
import { languageModel } from "~/models/language.server";
import { roleModel } from "~/models/role.server";
import { userModel } from "~/models/user.server";
import { PushSimpleNotification } from "~/utils/server/pwa-utils.server";

export const loader: LoaderFunction = async ({ request, params }) => {

  const secret = params.secret as string;
  if (secret !== process.env.CRON_SECRET)
    return redirect("/404");

  // find announcements that was already started or starts in 5 minutes
  // send push notifications to all the users

  // 1. determine date in 5 minutes (safe value)
  const dateSafe = new Date();
  dateSafe.setMinutes(dateSafe.getMinutes() + 5);

  // 2. find announcements that startAt is older than now and datePlusFiveMinutes
  const items = await announcementModel.getMany({
    startAt: {
      lte: dateSafe,
    },
    notificationSent: false
  });

  // 3. if no items -> just return
  if (!items.length)
    return null;

  // 4. get all the users (but only partners) and languages
  const clientRole = await roleModel.getByName(RoleName.CLIENT);
  const candidateRole = await roleModel.getByName(RoleName.CANDIDATE_PARTNER);
  const users = await userModel.getMany({
    roleId: {
      notIn: [clientRole!.id, candidateRole!.id]
    }
  });
  const languages = await languageModel.getMany({});

  // 5. loop through every announcement and send push notification to each of them
  for(const item of items) {
    let counter = 1;
    for (const user of users) {
      const languageName = languages.find(l => l.id === user.languageId)?.name as Language["name"];
      await PushSimpleNotification(
        request,
        user,
        item!.title[languageName] || "",
        item!.description[languageName] || ""
      );

      console.log("Push notification sent to user", counter, user.id, "for announcement", item.title[languageName])
      counter++;
    }

    await announcementModel.markAsChecked(item.id)
  }
  
  return null;
}
