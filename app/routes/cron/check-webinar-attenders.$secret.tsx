import { ActivityType } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { cm } from "~/utils/cm.server";

export const loader: LoaderFunction = async ({ params }) => {

  const secret = params.secret as string;
  if (secret !== process.env.CRON_SECRET)
    return redirect("/404");

  // find expired internal webinars that wasn't checked yet
  const eligibleWebinars = await webinarModel.getMany({
    expired: true,
    checked: false,
    isExternal: false
  });

  // try to check attenders for each of them
  for (const webinar of eligibleWebinars) {

    // find all webinar sessions
    const webinarSessions = await cm.getWebinarSessions(webinar.cmId);

    // if there aren't any session, assume webinar hasn't finished yet, so continue the loop
    if (!webinarSessions.length)
      continue;

    // gather all attendees from each session
    const attendees = [];
    for (const session of webinarSessions) {
      attendees.push(await cm.getWebinarSessionAttendees(webinar.cmId, session.id));
    }

    // merge repeating attendees records (email is unique) into single records (sum their minutes)
    const flattenAttendees = attendees.flat() as { email: string, start_date: string, end_date: string }[];
    const uniqueAttendees = flattenAttendees.filter((v, i, a) => a.findIndex(t => (t.email === v.email)) === i);
    const mergedAttendees = uniqueAttendees.map(attendee => {
    const sessions = flattenAttendees.filter(a => a.email === attendee.email);
    const startDate = new Date(Math.min(...sessions.map(s => new Date(s.start_date).getTime())));
    const endDate = new Date(Math.max(...sessions.map(s => new Date(s.end_date).getTime())));
      return {
        email: attendee.email,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };
    });

    // find users with attendees mails
    const attendeesUsers = await userModel.getMany(
      {
        email: {
          in: uniqueAttendees.map(a => a.email)
        }
      }
    );

    // create webinar attender record for them with minutes details info
    for (const user of attendeesUsers) {
      const userAttendee = mergedAttendees.find(a => a.email.toLowerCase() === user.email.toLowerCase());
      const startDate = new Date(userAttendee!.startDate);
      const endDate = new Date(userAttendee!.endDate);
      const minutes = Math.floor((endDate.getTime() - startDate.getTime()) / 60000);
      await webinarModel.markUserAsAttended(webinar.id, user.id, minutes);

      /*await db.userAttendedWebinar.updateMany({
        where: {
          webinarId: webinar.id,
          userId: user.id
        },
        data: {
          time: minutes,
        }
      })*/
      // now it's time to save activity
      await userModel.saveActivity(user.id as string, {
        type: ActivityType.WEBINAR_PRESENCE,
        webinarId: webinar.id
      });
    }

    // mark webinar as checked
    await webinarModel.markWebinarAsChecked(webinar.id);
  
  }

  return null;
}
