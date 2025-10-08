import type { SupportedLanguage, Webinar, WorkshopItem} from "@prisma/client";
import { WebinarVariant } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import { FadeIn } from "~/components/features/AOM";
import WebinarSummary from "~/components/layout/WebinarSummary";
import WorkshopClientTemplate from "~/components/layout/WorkshopClientTemplate";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Alert from "~/components/ui/Alert";
import SectionTitle from "~/components/ui/SectionTitle";
import { globalMiddleware } from "~/middlewares/global.server";
import { boardItemModel } from "~/models/boardItem.server";
import { languageModel } from "~/models/language.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { workshopItemModel } from "~/models/workshopItem.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";

type Loader = {
  webinars: Webinar[],
  workshops: WorkshopItem[],
  subscribedWebinars: Webinar["id"][],
  description: Record<SupportedLanguage, string> | null,
  clientMentorId: string
}
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // if logged -> go to partner workshops
  if (await sessionService.isLogged(request))
    return redirect("/dashboard/webinars/partner");

  // load client webinars board item to get this page description
  const description = (await boardItemModel.getById("b3c5c54f-38f4-49b6-b73b-a38d8280a8d7"))?.text || null;

  // determine unlogged user mentor id
  const unloggedUser = await unloggedUserService.getUnloggedUserData(request);

  // try to find webinars that aren't yet expired and are supported for client role and language
  // get only CLIENT ones or supported for this specific client
  const language = await languageModel.getByName(await translateService.getCurrentLang(request) || "pl")
  if (!unloggedUser.isRegistered) {
    const webinars = await webinarModel.getMany({
      variant: WebinarVariant.CLIENT,
      expired: {
        not: true
      },
      supportedLanguages: {
        some: {
          id: language!.id
        }
      },
    },  undefined, { startAt: "asc" });

    // get client workshops to 30 days bac
    const currentLang = await translateService.getCurrentLang(request);
    const clientWorkshops = await workshopItemModel.getClientWorkshops(currentLang);

    return {
      webinars,
      subscribedWebinars: [],
      description,
      workshops: clientWorkshops,
    };
  }
  else {
    const webinars = await webinarModel.getMany({
      OR: [
        { variant: WebinarVariant.CLIENT },
        { variant: WebinarVariant.BUSINESS, subscribedUsers: { some: { userId: unloggedUser.userId } } }
      ],
      expired: {
        not: true
      },
      supportedLanguages: {
        some: {
          id: language!.id
        }
      },

    },  undefined, { startAt: "asc" });

    // get info about webinar subscriptions
    // but take care about only ones that are to show
    // we will use that info to determine if user can sign up for the webinar
    // or if he already done that
    const userId = unloggedUser.userId;
    const subscribedWebinars = await userModel.getSubscribedWebinars(userId, webinars.map(w => w.id));

    // get user webinars to get custom url of webinar
    // we will use that to redirect user to the webinar when can play it
    const userWebinars = await userModel.getUserWebinarsByWebinarsIds(userId, subscribedWebinars.map(w => w.id));
    
    // get client workshops to 30 days back
    const currentLang = await translateService.getCurrentLang(request);
    const clientWorkshops = await workshopItemModel.getClientWorkshops(currentLang);

    return {
      webinars: webinars.map(w => ({
        ...w,
        url: userWebinars.find(uw => uw.webinarId === w.id)?.url || "",
        subscribed: subscribedWebinars.some(ws => ws.id === w.id),
      })),
      workshops: clientWorkshops,
      description,
    };
  }
}

export default function WebinarsIndex() {
  const { description, webinars: webinarsEnhanced, workshops } = useLoaderData<Loader>();
  const { t, lang: currentLang } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const activationMailSent = searchParams.get("activationMailSent");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard">
        {t("webinars.title")}
      </AdminPageHeader>
      {activationMailSent && (
        <Alert
          className="mx-auto my-6 rounded-lg"
          variant="success"
          title={t("clients.webinars.success.title")}
        >
          {t("clients.webinars.success.description")}
        </Alert>
      )}
      { description?.[currentLang] && (
        <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
          <WysiwygGeneratedContent content={description?.[currentLang] || ""} />
        </div>
      )}
      { webinarsEnhanced.length === 0 && (
        <p className="text-center text-sm mt-10 mb-20">{t("clients.webinars.noData")}</p>
      )}
      <FadeIn>
        <div 
          className={clsx(
            "mx-auto",
            webinarsEnhanced.length > 2 && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            webinarsEnhanced.length === 2 && "grid grid-cols-1 md:grid-cols-2 gap-4",
            webinarsEnhanced.length === 1 && "grid grid-cols-1 gap-4"
          )}
        >
          {webinarsEnhanced
            .map(webinar => (
              <WebinarSummary
                key={webinar.id}
                id={webinar.id}
                title={webinar.title[currentLang]}
                startAt={webinar.startAt}
                description={webinar.description[currentLang]}
                subscribed={webinar.subscribed}
                presenter={webinar.presenter}
                isPartner={false}
                variant={webinar.variant}
                isExternal={webinar.isExternal}
                url={webinar.url}
                poster={webinar.poster}
              />
            ))}
        </div>
      </FadeIn>
      { workshops.length > 0 && (
        <section>
          <SectionTitle>
            {t("webinars.finishedWebinars")}
          </SectionTitle>
          <ul className="grid grid-cols-2 standard-text gap-2 md:gap-6 md:grid-cols-4">
            {workshops.map(item => (
              <WorkshopClientTemplate
                key={item.id}
                id={item.id}
                name={item.name[currentLang]}
                poster={item.poster}
                url={item.url}
                done={item.done}
                icon={item.icon}
              />
            ))}
          </ul>
        </section>
      )}
    </section>
  )
}