import type { Webinar} from "@prisma/client";
import { PermissionName, WebinarVariant } from "@prisma/client";
import {  type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import WebinarSummary from "~/components/layout/WebinarSummary";
import Alert from "~/components/ui/Alert";
import Notification from "~/components/ui/Notification";
import PageHeader from "~/components/ui/PageHeader";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type Loader = {
  webinars: Webinar[],
  subscribedWebinars: Webinar["id"][],
}
export const loader: LoaderFunction = async ({ request }) => {
  await sessionService.requirePermission(request, PermissionName.webinarsAccess, "/no-permission");

  // try to find webinars that aren't yet expired and are supported for user role and language
  // get only BUSINESS ones
  const user = await sessionService.getUser(request);
  const webinars = await webinarModel.getMany({
    OR: [
      { variant: WebinarVariant.BUSINESS },
      { variant: WebinarVariant.INVITED, subscribedUsers: { some: { userId: user!.id } } }
    ],
    expired: {
      not: true
    },
    supportedLanguages: {
      some: {
        id: user!.languageId
      }
    },
    supportedRoles: {
      some: {
        id: user!.roleId
      }
    }
  },  undefined, { startAt: "asc" });

  // get info about webinar subscriptions
  // but take care about only ones that are to show
  // we will use that info to determine if user can sign up for the webinar
  // or if he already done that
  const userId = await sessionService.getUserId(request);
  const subscribedWebinars = await userModel.getSubscribedWebinars(userId!, webinars.map(w => w.id));

  return {
    webinars,
    subscribedWebinars: subscribedWebinars.map(w => w.id),
  };
}

export default function WebinarsIndex() {
  const { webinars, subscribedWebinars } = useLoaderData<Loader>();
  const { t, lang: currentLang } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const webinarSubscribed = searchParams.get("webinarSubscribed");

  // enhance webinars  with subscribed info
  const webinarsEnhanced = webinars
    .map(w => ({
      ...w,
      subscribed: subscribedWebinars.includes(w.id),
    }));

  return (
    <section>
      <PageHeader>
        {t("webinars.title")}
      </PageHeader>
      { webinarSubscribed && (
        <Notification variant="success" autoClose={true}>
          {t("webinars.subscribed")}
        </Notification>
      )}
      { webinarsEnhanced.length === 0 && (
        <Alert
          variant="info"
          className="mx-auto"
          title={t("webinars.noDataTitle")}
        >
          {t("webinars.noData")}
        </Alert>
      )}
      <div className="flex flex-col gap-4">
        {webinarsEnhanced
          .map(webinar => (
            <WebinarSummary key={webinar.id} id={webinar.id} title={webinar.title[currentLang]} startAt={webinar.startAt} description={webinar.description[currentLang]} subscribed={webinar.subscribed} presenter={webinar.presenter} />
          ))}
      </div>
    </section>
  )
}