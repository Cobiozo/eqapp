import type { Webinar } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import { WebinarItem } from "~/components/layout/UserWebinarActivityBox";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Alert from "~/components/ui/Alert";
import { globalMiddleware } from "~/middlewares/global.server";
import type { User } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { userAttendedWebinarModel } from "~/models/userAttendedWebinar";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = { 
  protege: User,
  webinars: (Webinar & { attended: boolean })[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  
  // require permission
  await sessionService.requirePermission(request, "protegesRead", "/dashboard");

  // get user id from session, it will verify if protege is a protege of logged user
  const loggedUserId = await sessionService.getUserId(request) as string;

  // try to find protege
  const protegeId = params.userId as string;
  const protege = await userModel.getById(protegeId);

  // if protege is not found or loggedUser is not its mentor
  // -> redirect to proteges list
  if (!protege || protege.mentorId !== loggedUserId)
    return redirect("/dashboard/admin/clients");

  // find webinars from last 30 days that user could take part in
  const ThirtyDaysAgo = new Date();
  ThirtyDaysAgo.setDate(ThirtyDaysAgo.getDate() - 30);

  const latestWebinars = await webinarModel.getMany({
    subscribedUsers: {
      some: {
        userId: protegeId,
      },
    },
    startAt: {
      gte: ThirtyDaysAgo,
    },
  }, undefined, {
    startAt: "desc",
  });

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
  return {
    webinars: latestWebinars
    .map(w => ({
      ...w,
      attended: webinarsAttended.some(ws => ws.id === w.id),
      time: webinarsAttendedDetails.find(ws => ws.webinarId === w.id)?.time || 0,
    })),
    protege,
  }
  
}

export default function ProtegeWebinarActivities() {
  const { userId } = useParams();
  const { t } = useContext(GlobalContext);
  const { webinars, protege } = useLoaderData<LoaderData>();
  const protegeFullName = protege.firstName + " " + protege.lastName;

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/clients/${userId}`}>
        {t("proteges.activity.webinarsLatest")}
      </AdminPageHeader>
      <div className="standard-content mb-4 max-w-3xl text-center">
        <p
          className="mb-10"
          dangerouslySetInnerHTML={{ __html: t("proteges.activity.browsingActivity", protegeFullName) }}
        />
      </div>
      <ul>
        {webinars.map((webinar, index) => (
          <li key={index}>
            <WebinarItem key={index} {...webinar} />
          </li>
        ))}
      </ul>
      {!webinars.length && (
        <Alert title={t("proteges.activity.noDataTitle")} variant="info" className="mx-auto">
          {t("proteges.activity.noData")}
        </Alert>
      )}
    </section>
  );
}
