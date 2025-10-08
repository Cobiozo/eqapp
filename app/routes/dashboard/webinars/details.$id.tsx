import type { Webinar} from "@prisma/client";
import { PermissionName, WebinarVariant } from "@prisma/client";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type Loader = Webinar & {
  subscribed: boolean;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.webinarsAccess, "/no-permission");

  // try to find desired webinar, but only if  aren't yet expired and is supported for user role and language
  // get only BUSINESS one
  const user = await sessionService.getUser(request);
  const webinar = await webinarModel.getById(params.id as string, undefined, {
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
  });
  if (!webinar)
    return redirect("/dashboard/webinars");

  // check if user is subscribed to this webinar
  // return this info along with the webinar
  const userId = await sessionService.getUserId(request);
  const hasSubscribed = await userModel.hasSubscribedToWebinar(
    userId!,
    params.id as string
  );

  return {
    ...webinar,
    subscribed: hasSubscribed,
  };
}

export default function WebinarIndex() {
  const webinar = useLoaderData<Loader>();
  const { t, lang: currentLang } = useContext(GlobalContext);

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/webinars">
        {webinar.title[currentLang]}
      </AdminPageHeader>
      <WysiwygGeneratedContent
        className="text-center"
        content={webinar.description[currentLang]}
      />
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
         { !webinar.subscribed && (
          <Button
            icon={FaCheck}
            to={`/dashboard/webinars/subscribe/${webinar.id}`}
            className="mx-auto block"
          >
            {t("webinars.subscribe")}
          </Button>
        )}
      </div>

    </section>
  )
}