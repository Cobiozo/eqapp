import type { SupportedLanguage, Webinar} from "@prisma/client";
import { PermissionName, WebinarVariant } from "@prisma/client";
import {  type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import { FadeIn } from "~/components/features/AOM";
import WebinarSummary from "~/components/layout/WebinarSummary";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import Alert from "~/components/ui/Alert";
import BoxTitle from "~/components/ui/BoxTitle";
import Notification from "~/components/ui/Notification";
import PageHeader from "~/components/ui/PageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import { boardItemModel } from "~/models/boardItem.server";
import { shortLinkModel } from "~/models/shortLink.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type Loader = {
  webinars: Webinar[],
  subscribedWebinars: Webinar["id"][],
  description: Record<SupportedLanguage, string> | null,
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  await sessionService.requirePermission(request, PermissionName.webinarsAccess, "/no-permission");

  // determine if we are browsing workshop webinars or normal webinars
  const url = new URL(request.url);
  const showOnlyLiveWorkshops = url.searchParams.get("showOnlyLiveWorkshops") === "true";

  // load partner webinars board item to get this page description
  const description = (!showOnlyLiveWorkshops 
    ? (await boardItemModel.getById("3b062a29-278c-4326-99a3-30718aac4fba"))?.text
    : (await boardItemModel.getById("8f45867b-7b17-4c04-bb9d-8d136bb545f0"))?.text) || null;

  // try to find webinars that aren't yet expired and are supported for user language
  // if there is showOnlyLiveWorkshops flag, we will show only webinars with isWorkshop property set to true
  // if there is no showOnlyLiveWorkshops flag, we will only other webinars than live workshops
  const user = await sessionService.getUser(request);
  const webinars = await webinarModel.getMany({
    expired: {
      not: true
    },
    supportedLanguages: {
      some: {
        id: user!.languageId
      }
    },
    isWorkshop: showOnlyLiveWorkshops
  },  undefined, { startAt: "asc" });

  // get info about webinar subscriptions
  // but take care about only ones that are to show
  // we will use that info to determine if user can sign up for the webinar
  // or if he already done that
  const userId = await sessionService.getUserId(request);
  const subscribedWebinars = await userModel.getSubscribedWebinars(userId!, webinars.map(w => w.id));

  // get user webinars to get custom url of webinar
  // we will use that to redirect user to the webinar when can play it
  const userWebinars = await userModel.getUserWebinarsByWebinarsIds(userId!, subscribedWebinars.map(w => w.id));
  
  // prepare webinars invite urls
  const inviteUrls = await Promise.all(webinars.map(
    async w => ({
      webinarId: w.id,
      inviteUrl: await shortLinkModel.generate(request, `/dashboard/webinars/client/details/${w.id}?ref=${userId}`)
    })
  ));

  return {
    webinars: webinars.map(w => ({
      ...w,
      url: userWebinars.find(uw => uw.webinarId === w.id)?.url || "",
      subscribed: subscribedWebinars.some(ws => ws.id === w.id),
      inviteUrl: inviteUrls.find(iu => iu.webinarId === w.id)?.inviteUrl || ""
    })),
    description,
  };
}

export default function WebinarsIndex() {
  const { description, webinars: webinarsEnhanced } = useLoaderData<Loader>();
  const { t, lang: currentLang } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const webinarSubscribed = searchParams.get("webinarSubscribed");
  const showOnlyLiveWorkshops = searchParams.get("showOnlyLiveWorkshops") === "true";

  // split webinars into two categories: BUSINESS and CLIENT
  const businessWebinars = webinarsEnhanced.filter(w => w.variant === WebinarVariant.BUSINESS);
  const clientWebinars = webinarsEnhanced.filter(w => w.variant === WebinarVariant.CLIENT);

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
      <div className="standard-content mb-6 max-w-3xl text-center flex flex-col">
        <Link className="link" to={"/dashboard/webinars/partner/oldies?showOnlyLiveWorkshops=" + searchParams.get("showOnlyLiveWorkshops")}>
          {t("webinars.showFinished")}
        </Link>
      </div>
      <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
        <WysiwygGeneratedContent content={description?.[currentLang] || ""} />
      </div>
      { !showOnlyLiveWorkshops && (
        <BoxTitle>
          {t("webinars.businessWebinars")}
        </BoxTitle>
      )}
      { businessWebinars.length === 0 && (
        <Alert
          variant="info"
          className="mx-auto"
          title={t("webinars.noDataTitle")}
        >
          {t("webinars.noData")}
        </Alert>
      )}
      <FadeIn>
        <div 
          className={clsx(
            "mx-auto",
            businessWebinars.length > 2 && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            businessWebinars.length === 2 && "grid grid-cols-1 md:grid-cols-2 gap-4",
            businessWebinars.length === 1 && "grid grid-cols-1 gap-4"
          )}
        >
        {
          businessWebinars.map(webinar => (
            <WebinarSummary
              key={webinar.id}
              id={webinar.id}
              title={webinar.title[currentLang]}
              startAt={webinar.startAt}
              description={webinar.description[currentLang]}
              subscribed={webinar.subscribed}
              presenter={webinar.presenter}
              isPartner={true}
              variant={webinar.variant}
              url={webinar.url}
              isExternal={webinar.isExternal}
              inviteUrl={webinar.inviteUrl}
              isWorkshop={webinar.isWorkshop}
              poster={webinar.poster}
            />
          ))}
        </div>
      </FadeIn>
      { !showOnlyLiveWorkshops && (
        <>
        <BoxTitle>
          {t("webinars.clientWebinars")}
        </BoxTitle>
        { clientWebinars.length === 0 && (
          <Alert
            variant="info"
            className="mx-auto"
            title={t("webinars.noDataTitle")}
          >
            {t("webinars.noData")}
          </Alert>
        )}
        <FadeIn>
          <div 
            className={clsx(
              "mx-auto",
              clientWebinars.length > 2 && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
              clientWebinars.length === 2 && "grid grid-cols-1 md:grid-cols-2 gap-4",
              clientWebinars.length === 1 && "grid grid-cols-1 gap-4"
            )}
          >
          {
            clientWebinars.map(webinar => (
              <WebinarSummary
                key={webinar.id}
                id={webinar.id}
                title={webinar.title[currentLang]}
                startAt={webinar.startAt}
                description={webinar.description[currentLang]}
                subscribed={webinar.subscribed}
                presenter={webinar.presenter}
                isPartner={true}
                variant={webinar.variant}
                url={webinar.url}
                isExternal={webinar.isExternal}
                poster={webinar.poster}
                isWorkshop={webinar.isWorkshop}
                inviteUrl={webinar.inviteUrl}
              />
            ))}
          </div>
        </FadeIn>
      </>
      )}
    </section>
  )
}