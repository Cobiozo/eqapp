import type {  UserActivity, Webinar } from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ProtegeItem from "~/components/features/ProtegeItem";
import { globalMiddleware } from "~/middlewares/global.server";
import type { UserWithRole } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { userAttendedWebinarModel } from "~/models/userAttendedWebinar";
import { webinarModel } from "~/models/webinar.server";
import isInProtegeTree from "~/utils/isInProtegeTree.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = UserWithRole
  & { activities: UserActivity[] }
  & { webinars: (Webinar & { attended: boolean } & { time: string })[] };

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // require permission
  await sessionService.requirePermission(request, PermissionName.protegesRead, "/no-permission");

  // get user id from session, it will be used to filter proteges
  const loggedUserId = await sessionService.getUserId(request) as string;

  // try to find protege
  const protegeId = params.userId as string;
  const protege = await userModel.getByIdWithRole(protegeId) as UserWithRole
    & { activities: UserActivity[] } & { webinars: (Webinar & { attended: boolean } & { time: string })[] };

  // if protege is not found or loggedUser is not its mentor and is not higher in the tree and it's not the protege itself
  // -> redirect to proteges list
  if (!protege || (protege.mentorId !== loggedUserId && !(await isInProtegeTree(loggedUserId, protege.id)))) {
    return redirect("/dashboard/admin/proteges");
  }

  // if protege is found, retrieve its last activities
  const activities = await userModel.getActivities(
    protegeId,
    ["workshop", "role", "webinar"],
    5,
  );

  // find last 5 webinars that user could take part in
  const latestWebinars = await webinarModel.getMany({
    subscribedUsers: {
      some: {
        userId: protegeId,
      },
    },
  }, undefined, {
    startAt: "desc",
  }, 5);

  // now get info about user attendance in these workshops and enhance them
  // with this info
  const webinarsAttended = await userModel.getAttendedWebinars(protegeId, latestWebinars.map(w => w.id));

  // get details about attended webinars and time spent on them
  const webinarsAttendedDetails = await userAttendedWebinarModel.getMany({
    webinarId: {
      in: webinarsAttended.map(ws => ws.id),
    },
    userId: protegeId,
  });

  // enhance webinars with subscribed info
  const webinarsEnhanced = latestWebinars
    .map(w => ({
      ...w,
      attended: webinarsAttended.some(ws => ws.id === w.id),
      time: webinarsAttendedDetails.find(ws => ws.webinarId === w.id)?.time || 0,
    }));
  
  // ...and save it to protege object
  protege.activities = activities || []
  protege.webinars = webinarsEnhanced;

  return protege;
}

export default function Protege() {
  const protege = useLoaderData<LoaderData>();

  return (
    <ProtegeItem {...protege} />
  );
}
