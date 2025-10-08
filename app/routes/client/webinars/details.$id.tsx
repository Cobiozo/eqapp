import type { Webinar} from "@prisma/client";
import { WebinarVariant } from "@prisma/client";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import Button from "~/components/client/Button";
import PageHeader from "~/components/client/PageHeader";
import { ReturnLink } from "~/components/client/ReturnLink";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import { languageModel } from "~/models/language.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import clientService from "~/utils/services/client.server";
import translateService from "~/utils/services/translate.server";

type Loader = Webinar & {
  subscribed: boolean;
}

export const loader: LoaderFunction = async ({ request, params }) => {

  // try to find webinars that aren't yet expired and are supported for client role and language
  // get only CLIENT ones or supported for this specific client
  const client = await clientService.getClientData(request);
  const language = await languageModel.getByName(await translateService.getCurrentLang(request) || "pl")
  if (!client?.userId || !client?.isRegistered) {
    const webinar = await webinarModel.getById(
      params.id as string,
      undefined,
      {
        variant: WebinarVariant.CLIENT,
        expired: {
          not: true
        },
        supportedLanguages: {
          some: {
            id: language!.id
          }
        },
        startAt: {
          gt: new Date()
        }
      }
    );
    if (!webinar)
      return redirect("/client/webinars");
    
    return {
      webinar,
      subscribed: false
    };
  }
  else {
    const webinar = await webinarModel.getById(
      params.id as string,
      undefined,
      {
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
        startAt: {
          gt: new Date()
        }
      }
    );

  
    // check if user is subscribed to this webinar
    // return this info along with the webinar
    const hasSubscribed = await userModel.hasSubscribedToWebinar(
      client.userId,
      params.id as string
    );

    return {
      ...webinar,
      subscribed: hasSubscribed,
    };
  }
}

export default function WebinarIndex() {
  const webinar = useLoaderData<Loader>();
  const { t, lang: currentLang, isLogged } = useContext(GlobalContext);

  return (
    <section>
      <PageHeader>
        {webinar.title[currentLang]}
      </PageHeader>
      <ReturnLink url="/client/webinars" />
      { webinar.description[currentLang] && (
        <WysiwygGeneratedContent
          className="text-center py-6"
          content={webinar.description[currentLang]}
        />
      )}
      <div className="flex my-8 gap-4 justify-center items-center max-w-lg mx-auto">
        <FaRegCalendarAlt className="text-8xl" />
        <div className="tracking-widest">
          <h3 className="font-bold mt-2">
            {t("webinars.startAt")}
          </h3>
          <p>
            {new Date(webinar.startAt).toLocaleString()}
          </p>
          <h3 className="font-bold mt-2">
            {t("webinars.presenter")}
          </h3>
          <p>
            {webinar.presenter}
          </p>
        </div>
      </div>
      <div>
        { webinar.subscribed && (
          <div className="text-center">
            <h4 className="flex justify-center items-center gap-4 font-bold tracking-widest">
              <FaCheck className="text-green-500 text-2xl" />
              {t("webinars.subscribed")}
            </h4>
            <div className="max-w-sm mx-auto mt-4 text-sm">
              <p>{t("webinars.subscribedInfo")}</p>
              <p className="mt-4">{t("webinars.seeYouSoon")}</p>
            </div>
          </div>
        )}
         { !webinar.subscribed && !isLogged && (
          <Button
            icon={FaCheck}
            to={`/client/webinars/subscribe/${webinar.id}`}
            className="mx-auto block"
            variant="primary"
          >
            {t("webinars.subscribe")}
          </Button>
        )}
      </div>

    </section>
  )
}