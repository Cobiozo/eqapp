import type { Webinar} from "@prisma/client";
import { WebinarVariant } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import { ReturnLink } from "~/components/client/ReturnLink";
import Container from "~/components/layout/Container";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import Alert from "~/components/ui/Alert";
import PageHeader from "~/components/ui/PageHeader";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { cm } from "~/utils/cm.server";
import clientService from "~/utils/services/client.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";

type Loader = { webinar: Webinar } & { unverified: true } | null;
export const loader: LoaderFunction = async ({ request, params }) => {

  // check if we aren't logged in
  // if we are, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/client");
  
  // get current lang
  // try to find webinar
  // check if client is available for this webinar
  // if no, go to "/"
  // load client webinars
  const currentLang = await translateService.getCurrentLang(request);
  const webinar = await webinarModel.getById(params.id as string, undefined, {
    variant: WebinarVariant.CLIENT,
    expired: false,
    supportedLanguages: {
      some: {
        name: currentLang
      }
    },
    startAt: {
      gte: new Date()
    }
  });
  if (!webinar)
    return redirect("/client");

  // here we know that webinar in fact exist and is created for a client like us ;)
  // get client data
  const clientData = await clientService.getClientData(request);

  // now check if client is already registered
  // if so, check if user is not already subscribed,
  // if he is -> go to /client
  // if no register the client to the event
  // and return null
  // let client show happy info
  // otherwise redirect user to /client/register with return url
  if (clientData?.isRegistered) {

    // load the user
    // if user is not okay -> remove invalid cookie
    // if use is okay, but email is not verified yet -> return { unverified: true }
    const user = await userModel.getById(clientData.userId);
    if (!user)
      return await clientService.removeClient();
    if (!user.emailVerified)
      return { unverified: true };

    // check if user is already subscribed
    // if so -> get out
    const hasSubscribed = await userModel.hasSubscribedToWebinar(
      user.id,
      params.id as string
    );
    if (hasSubscribed)
      return redirect("/client");

    // subscribe to the webinar at clickMeeting
    const web = await cm.subscribeToWebinar(webinar.cmId, {
      firstName: user!.firstName,
      lastName: user!.lastName,
      email: user!.email,
    });

    // and save subscription info in the database
    await userModel.subscribeToWebinar(user!.id, params.id as string, web.url);

    return { webinar };
  } else {
    return redirect(`/client/register?forWebinar=${params.id}`);
  }
}

export default function SubscribedToWebinar() {
  const loaderData = useLoaderData<Loader>();
  const { t, lang: currentLang } = useContext(GlobalContext);

  return (
    <section>
      <Container>
        {loaderData?.unverified && (
          <>
            <PageHeader>
              {t("clients.webinars.subscribe")}
            </PageHeader>
            <ReturnLink url="/client/webinars" />
            <Alert
              className="rounded-2xl mx-auto my-10"
              variant="danger"
              title={t("clients.webinars.youHaveToVerify.title")}
            >
              {t("clients.webinars.youHaveToVerify.description")}
            </Alert>
          </>
        )}
        { loaderData?.webinar && (
          <>
            <PageHeader>
              {loaderData.webinar.title[currentLang]}
            </PageHeader>
            { loaderData.webinar.description[currentLang] && (
              <WysiwygGeneratedContent
                className="text-center py-6"
                content={loaderData.webinar.description[currentLang]}
              />
            )}
            <div className="flex my-8 gap-4 justify-center items-center max-w-lg mx-auto">
              <FaRegCalendarAlt className="text-8xl" />
              <div className="tracking-widest">
                <h3 className="font-bold mt-2">
                  {t("webinars.startAt")}
                </h3>
                <p>
                  {new Date(loaderData.webinar.startAt).toLocaleString()}
                </p>
                <h3 className="font-bold mt-2">
                  {t("webinars.presenter")}
                </h3>
                <p>
                  {loaderData.webinar.presenter}
                </p>
              </div>
            </div>
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
          </>
        )}
      </Container>
    </section>
  )
};
  