import type { User, Webinar} from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import Container from "~/components/layout/Container";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import Alert from "~/components/ui/Alert";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { cm } from "~/utils/cm.server";
import clientService from "~/utils/services/unloggedUser.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";
import { globalMiddleware } from "~/middlewares/global.server";
import Countdown from "~/components/ui/Countdown";
import config from "~/config";
import { languageModel } from "~/models/language.server";
import mailService from "~/utils/services/mail.server";
import { determineLocalesByLang } from "~/utils/determineLocalesByLang";
import unloggedUserService from "~/utils/services/unloggedUser.server";

type Loader = { webinar: Webinar } & { unverified: true } | null;
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check if we aren't logged in
  // if we are, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/dashboard");
  
  // get current lang
  // and try to find webinar
  // if it doesn't exist, go to "/dashboard/webinars/client"
  // do not look on the variant
  // if user knows webinar id, he knows it from referral
  // so somebody wanted to give it to him
  // so we can trust him
  const currentLang = await translateService.getCurrentLang(request);
  const dateMinusBufferMinutes = new Date();
  dateMinusBufferMinutes.setMinutes(dateMinusBufferMinutes.getMinutes() - config.webinarOpeningPeriod);
  const webinar = await webinarModel.getById(params.id as string, undefined, {
    expired: false,
    supportedLanguages: {
      some: {
        name: currentLang
      }
    }
  });
  if (!webinar)
    return redirect("/dashboard/webinars/client");

  // here we know that webinar in fact exist
  // get unloggedUser data
  const unloggedUserData = await clientService.getUnloggedUserData(request);

  // now check if client is already registered
  // if so, check if user is not already subscribed,
  // if he is -> go to /dashboard/webinars/client
  // if no register the client to the event
  // and return null
  // let client show happy info
  // otherwise redirect user to /client/register with return url
  if (unloggedUserData.isRegistered) {

    // load the user
    // if use is okay, but email is not verified yet -> return { unverified: true }
    const user = await userModel.getById(unloggedUserData.userId) as User;
    if (!user.emailVerified)
      return { unverified: true };

    // check if user is already subscribed
    // if so -> get out
    const hasSubscribed = await userModel.hasSubscribedToWebinar(
      user.id,
      params.id as string
    );
    if (hasSubscribed)
      return redirect("/dashboard/webinars/client");

    // now we know, that user is verified and not subscribed yet
    // subscribe to the webinar at clickMeeting (if it's internal webinar)
    // and save subscription info in the database
    // if isExternal, use CM generated url
    // if not, just use webinar url
    try {

      let url = webinar.embedUrl;

      if (!webinar.isExternal) {
        const web = await cm.subscribeToWebinar(webinar.cmId, {
          firstName: user!.firstName,
          lastName: user!.lastName,
          email: user!.email,
        });
        url = web.url;
        console.log(web)
      }

      // and save subscription info in the database
      await userModel.subscribeToWebinar(user!.id, params.id as string, url as string);

      // we should send partner email with webinar link
      try {
        const currentLang = await translateService.getCurrentLang(request);
        const langRecord = await languageModel.getByName(currentLang);
        if (!langRecord)
          throw new Error("Language not found");

        const t = translateService.translate;
        const url = new URL(request.url);
            
        const webinarUrl = url.origin + "/dashboard/webinars/client/play/" + webinar.id + "?usr=" + user!.id;
        const locales = determineLocalesByLang(langRecord.name);
        const startAt = (new Date(webinar.startAt)).toLocaleString(locales);
        await mailService.sendMail(
          user!.email,
          t(langRecord.name, "mails.webinarConfirmation.subject"),
          t(langRecord.name, "mails.webinarConfirmation.text", startAt, webinarUrl)
        );
      } catch (err) {
        console.log("Do nothing")
      }

      // and we should update user unlogged data
      // try to get ref user
      const pageUrl = new URL(request.url);
      const refFromUrl = pageUrl.searchParams.get("ref");
      const ref = refFromUrl !== "null" ? refFromUrl : null
    
      const mentorId = (ref
        ? (await userModel.getById(ref))?.id
        : user.mentorId) || config.defaultMentorId;

      // update mentorId in user
      await userModel.changeMentor(user.id, mentorId);

      // update unlogged cookie
      return unloggedUserService.updateUnloggedUserData(request, {
        userId: user.id,
        mentorId,
        isRegistered: true,
      }, `/dashboard/webinars/client/details/${params.id}`);  

    } catch (error) {

      console.log(error)

      // if error, there are no more tokens left
      // so we have to go to no-more-tokens page
      return redirect("/dashboard/webinars/client/no-more-tokens");
    }

    return { webinar };

  } else {
    const url = new URL(request.url);
    const ref = url.searchParams.get("ref");
    
    return redirect(`/dashboard/register-client?forWebinar=${params.id}&ref=${ref}`);
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
            <AdminPageHeader returnLink="/dashboard/webinars/client">
              {t("clients.webinars.subscribe")}
            </AdminPageHeader>
            <Alert
              className="rounded-lg mx-auto my-10"
              variant="danger"
              title={t("clients.webinars.youHaveToVerify.title")}
            >
              {t("clients.webinars.youHaveToVerify.description")}
            </Alert>
          </>
        )}
        { loaderData?.webinar && (
          <>
            <AdminPageHeader returnLink="/dashboard/webinars/client">
              {loaderData.webinar.title[currentLang]}
            </AdminPageHeader>
            { loaderData.webinar.description[currentLang] && (
              <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
                <WysiwygGeneratedContent
                  className="text-center"
                  content={loaderData.webinar.description[currentLang]}
                />
              </div>
            )}
            <div className="mx-auto w-fit p-6 bg-white border-2 border-gold rounded-lg dark:bg-dark dark:border-medium-darker flex my-8 gap-4 justify-center items-center">
              <FaRegCalendarAlt className="text-8xl" />
              <div className="">
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
            <div className="text-center font-bold text-xl">
              <h2>{t("webinars.timeLeft")}</h2>
              <Countdown
                subscribed={true}
                url={`/dashboard/webinars/client/play/${loaderData.webinar.id}`}
                date={loaderData.webinar.startAt} className="w-fit mx-auto"
              />
            </div>
            <div className="text-center">
              <h4 className="flex justify-center items-center gap-4 font-bold ">
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
  