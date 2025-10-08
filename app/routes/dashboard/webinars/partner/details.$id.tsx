import type { Role, User, Webinar} from "@prisma/client";
import { PermissionName, RoleName } from "@prisma/client";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import BoxTitle from "~/components/ui/BoxTitle";
import Button from "~/components/ui/Button";
import Countdown from "~/components/ui/Countdown";
import config from "~/config";
import { globalMiddleware } from "~/middlewares/global.server";
import { roleModel } from "~/models/role.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type Loader = Webinar & {
  subscribed: boolean;
  url: string;
  subscribedPartners: User[];
  subscribedGuests: User[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  await sessionService.requirePermission(request, PermissionName.webinarsAccess, "/no-permission");

  // determine if we are browsing workshop webinars or normal webinars
  const url = new URL(request.url);
  const showOnlyLiveWorkshops = url.searchParams.get("showOnlyLiveWorkshops") === "true";

  // first determine if there is usr in url
  const usrFromUrl = url.searchParams.get("usr");
  const usr = !usrFromUrl || usrFromUrl === "null" ? null : usrFromUrl;
  const userId = usr ? usr : await sessionService.getUserId(request) as string;

  // try to find desired webinar, but only if aren't yet expired and is supported user language
  const user = await userModel.getById(userId);
  if (!user)
    return redirect("/dashboard/webinars/partner?showOnlyLiveWorkshops=" + showOnlyLiveWorkshops);

  const dateMinusBufferMinutes = new Date();
  dateMinusBufferMinutes.setMinutes(dateMinusBufferMinutes.getMinutes() - config.webinarOpeningPeriod);

  const webinar = await webinarModel.getById(params.id as string, undefined, {
    expired: {
      not: true
    },
    supportedLanguages: {
      some: {
        id: user!.languageId
      }
    },
    startAt: {
      gt: dateMinusBufferMinutes
    }
  });
  if (!webinar)
    return redirect("/dashboard/webinars/partner?showOnlyLiveWorkshops=" + showOnlyLiveWorkshops);

  // we should also load info about subscribed users
  // but only those that are under us
  const subscribedUsers = await userModel.getMany({
    mentorId: user!.id,
    subscribedWebinars: {
      some: {
        webinarId: webinar.id
      }
    }
  });

  // subscribe users are both partners and guests (in fact client users or candidates for partners)
  // split them into two arrays
  const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;
  const candidatePartnerRole = await roleModel.getByName(RoleName.CANDIDATE_PARTNER) as Role;
  const subscribedGuests = subscribedUsers.filter(u => u.roleId === clientRole.id || u.roleId === candidatePartnerRole.id);
  const subscribedPartners = subscribedUsers.filter(u => u.roleId !== clientRole.id && u.roleId !== candidatePartnerRole.id);

  // check if user is subscribed to this webinar
  // return this info along with the webinar
  const hasSubscribed = await userModel.hasSubscribedToWebinar(
    userId,
    params.id as string
  );

  // get user webinar details (like url for CM webinars)
  const userWebinar = await userModel.getUserWebinar(userId!, params.id as string);

  return {
    ...webinar,
    subscribed: hasSubscribed,
    url: userWebinar?.url || "",
    subscribedPartners,
    subscribedGuests,
  };
}

export default function WebinarIndex() {
  const webinar = useLoaderData<Loader>();
  const { t, lang: currentLang } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const usr = searchParams.get("usr");

  return (
    <section>
      <AdminPageHeader returnLink={"/dashboard/webinars/partner?showOnlyLiveWorkshops=" + webinar.isWorkshop}>
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
          variant="partner"
          url={webinar.url}
          isExternal={webinar.isExternal}
          date={webinar.startAt}
          className="w-fit mx-auto"
          usr={usr}
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
         { !webinar.subscribed && (
          <Button
            icon={FaCheck}
            to={`/dashboard/webinars/partner/subscribe/${webinar.id}`}
            className="mx-auto block"
          >
            {t("webinars.subscribe")}
          </Button>
        )}
      </div>
      <section>
        <BoxTitle className="text-center">
          {t("webinars.invited.invitedUsers")} ({webinar.subscribedPartners.length})
        </BoxTitle>
        <ul>
          {webinar.subscribedPartners.map(user => (
            <li key={user.id} className="flex items-center gap-4 rounded-lg border border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker my-4 py-2 px-2 mx-auto max-w-sm">
              <div>
                <img 
                  src={ user.avatar ? "/uploads/" + user.avatar : '/images/no-avatar.webp'}
                  className="w-14 h-14 rounded-full border-primary"
                  alt="Avatar"
                />
              </div>
              <div className="">
                <h3 className="font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="text-sm text-gray-400">
                  {user.email}
                </div>
              </div>
          </li>
          ))}
        </ul>
        {webinar.subscribedPartners.length === 0 && (
          <p className="text-center text-sm">
            {t("webinars.noSubscribedUsers")}
          </p>
        )}
      </section>
      <section>
        <BoxTitle className="text-center">
          {t("webinars.invited.invitedGuests")} ({webinar.subscribedGuests.length})
        </BoxTitle>
        <ul>
          {webinar.subscribedGuests.map(user => (
           <li key={user.id} className="flex items-center gap-4 rounded-lg border border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker my-4 py-2 px-2 mx-auto max-w-sm">
            <div>
              <img 
                src={ user.avatar ? "/uploads/" + user.avatar : '/images/no-avatar.webp'}
                className="w-14 h-14 rounded-full border-primary"
                alt="Avatar"
              />
            </div>
            <div className="">
              <h3 className="font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <div className="text-sm text-gray-400">
                {user.email}
              </div>
            </div>
          </li>
          ))}
        </ul>
        {webinar.subscribedGuests.length === 0 && (
          <p className="text-center text-sm">
            {t("webinars.noSubscribedUsers")}
          </p>
        )}
      </section>
    </section>
  )
}