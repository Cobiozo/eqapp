import type { Webinar} from "@prisma/client";
import { WebinarVariant } from "@prisma/client";
import { type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import { FadeIn } from "~/components/client/AOM";
import PageHeader from "~/components/client/PageHeader";
import WebinarSummary from "~/components/client/WebinarSummary";
import Container from "~/components/layout/Container";
import Alert from "~/components/ui/Alert";
import { languageModel } from "~/models/language.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import clientService from "~/utils/services/client.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";

type Loader = {
  webinars: Webinar[],
  subscribedWebinars: Webinar["id"][],
}
export const loader: LoaderFunction = async ({ request }) => {

  // try to find webinars that aren't yet expired and are supported for client role and language
  // get only CLIENT ones or supported for this specific client
  const client = await clientService.getClientData(request);
  const language = await languageModel.getByName(await translateService.getCurrentLang(request) || "pl")
  if (!client?.userId || !client?.isRegistered) {
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

    return {
      webinars,
      subscribedWebinars: [],
    };
  }
  else {
    const webinars = await webinarModel.getMany({
      OR: [
        { variant: WebinarVariant.CLIENT },
        { variant: WebinarVariant.INVITED, subscribedUsers: { some: { userId: client.userId } } }
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
    const userId = await sessionService.getUserId(request);
    const subscribedWebinars = await userModel.getSubscribedWebinars(userId!, webinars.map(w => w.id));

    return {
      webinars,
      subscribedWebinars: subscribedWebinars.map(w => w.id),
    };
  }
}

export default function WebinarsIndex() {
  const { webinars, subscribedWebinars } = useLoaderData<Loader>();
  const { t, lang: currentLang } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const activationMailSent = searchParams.get("activationMailSent");

  // enhance webinars  with subscribed info
  const webinarsEnhanced = webinars
    .map(w => ({
      ...w,
      subscribed: subscribedWebinars.includes(w.id),
    }));

  return (
    <section>
      <Container>
        <PageHeader>
          {t("webinars.title")}
        </PageHeader>
        {activationMailSent && (
          <Alert
            className="mx-auto my-10 mb-20 rounded-2xl"
            variant="success"
            title={t("clients.webinars.success.title")}
          >
            {t("clients.webinars.success.description")}
          </Alert>
        )}
        { webinarsEnhanced.length === 0 && (
          <p className="text-center mt-10 mb-20">{t("clients.webinars.noData")}</p>
        )}
        <FadeIn>
          <div 
            className={clsx(
              "mx-auto w-fit",
              webinars.length > 2 && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
              webinars.length === 2 && "grid grid-cols-1 md:grid-cols-2 gap-4",
              webinars.length === 1 && "grid grid-cols-1 gap-4"
            )}
          >
            {webinarsEnhanced
              .map(webinar => (
                <WebinarSummary key={webinar.id} id={webinar.id} title={webinar.title[currentLang]} startAt={webinar.startAt} description={webinar.description[currentLang]} subscribed={webinar.subscribed} presenter={webinar.presenter} />
              ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}