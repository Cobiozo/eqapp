import type { Webinar} from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import Countdown from "~/components/ui/Countdown";
import config from "~/config";
import { globalMiddleware } from "~/middlewares/global.server";
import { languageModel } from "~/models/language.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import translateService from "~/utils/services/translate.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";

type Loader = Webinar & {
  subscribed: boolean;
  url: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // try to find webinar that aren't yet expired and is supported user language
  // do not look on the variant
  // if user knows webinar id, he knows it from referral
  // so somebody wanted to give it to him
  // so we can trust him 
  const unloggedUser = await unloggedUserService.getUnloggedUserData(request);
  const language = await languageModel.getByName(await translateService.getCurrentLang(request) || "pl")
  const dateMinusBufferMinutes = new Date();
  dateMinusBufferMinutes.setMinutes(dateMinusBufferMinutes.getMinutes() - config.webinarOpeningPeriod);

  const webinar = await webinarModel.getById(
    params.id as string,
    undefined,
    {
      expired: {
        not: true
      },
      supportedLanguages: {
        some: {
          id: language!.id
        }
      },
      startAt: {
        gt: dateMinusBufferMinutes
      }
    }
  );
  if (!webinar)
    return redirect("/dashboard/webinars/client");
    
  // if user is registered, return also subscription info
  if (unloggedUser.isRegistered) {
  
    // check if user is subscribed to this webinar
    // return this info along with the webinar
    const hasSubscribed = await userModel.hasSubscribedToWebinar(
      unloggedUser.userId,
      params.id as string
    );

    // get user webinar details (like url for CM webinars)
    const userWebinar = await userModel.getUserWebinar(unloggedUser.userId, params.id as string);

    return {
      ...webinar,
      subscribed: hasSubscribed,
      url: userWebinar?.url || "",
    };
  }

  // if not, return only webinar
  return {
    ...webinar,
    subscribed: false,
    url: ""
  };
}

export default function WebinarIndex() {
  const webinar = useLoaderData<Loader>();
  const { t, lang: currentLang, isLogged } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const ref = searchParams.get("ref");
  const usr = searchParams.get("usr");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/webinars/client">
        {webinar.title[currentLang]}
      </AdminPageHeader>
      {webinar.poster && (
        <img
          src={"/uploads/" + webinar.poster}
          alt={webinar.title[currentLang]}
          className="w-full object-cover rounded-lg mt-2 mb-6"
        />
      )}
      { webinar.description[currentLang] && (
         <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
          <WysiwygGeneratedContent
            className="text-center"
            content={webinar.description[currentLang]}
          />
        </div>
      )}
      <div className="mx-auto w-fit p-6 bg-white border-2 border-gold rounded-lg dark:bg-dark flex my-8 gap-4 justify-center items-center">
        <FaRegCalendarAlt className="text-8xl" />
        <div className="">
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
      <div className="text-center font-bold text-xl">
        <h2>{t("webinars.timeLeft")}</h2>
        <Countdown
          webinarId={webinar.id}
          subscribed={webinar.subscribed}
          variant="client"
          isExternal={webinar.isExternal}
          url={webinar.url}
          usr={usr}
          date={webinar.startAt} className="w-fit mx-auto"
        />
      </div>
      <div>
        { webinar.subscribed && (
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
        )}
         { (!usr || usr === "null") && !webinar.subscribed && !isLogged && (
          <Button
            icon={FaCheck}
            to={`/dashboard/webinars/client/subscribe/${webinar.id}?ref=${ref}`}
            className="mx-auto block"
          >
            {t("webinars.subscribe")}
          </Button>
        )}
      </div>

    </section>
  )
}