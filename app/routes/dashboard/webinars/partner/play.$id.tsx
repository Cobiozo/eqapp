import { PermissionName } from "@prisma/client";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "~/components/ui/Spinner";
import Video from "~/components/ui/Video";
import VideoChat from "~/components/ui/VideoChat";
import config from "~/config";
import { globalMiddleware } from "~/middlewares/global.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { useDeviceDetect } from "~/utils/useDeviceDetect";

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // first determine if there is usr in url
  const url = new URL(request.url);
  const usr = url.searchParams.get("usr");

  // if no usr, we are here locally, so check permissions
  if (!usr)
    await sessionService.requirePermission(request, PermissionName.webinarsAccess, "/no-permission");

  // try to find desired webinar, but only if  aren't yet expired and is supported user language
  const userId = usr ? usr : await sessionService.getUserId(request) as string;
  const user = await userModel.getById(userId, ["language"]);

  // check if user exists
  if (!user)
    return redirect("/dashboard/webinars/partner");

  const datePlusBufferMinutes = new Date();
  datePlusBufferMinutes.setMinutes(datePlusBufferMinutes.getMinutes() + config.webinarOpeningPeriod);
  const webinar = await webinarModel.getById(params.id as string, undefined, {
    expired: {
      not: true
    },
    supportedLanguages: {
      some: {
        id: user!.languageId
      }
    },
  });
  if (!webinar)
    return redirect("/dashboard/webinars/partner");

  // if webinar is not live yet - go to details
  /*const isLogged = await sessionService.isLogged(request);
  if (webinar.isExternal && new Date(webinar.startAt) > datePlusBufferMinutes)
    return isLogged
      ? redirect("/dashboard/webinars/partner/details/" + params.id + (usr ? "?usr=" + usr : ""))
      : redirect("/dashboard/webinars/client/details/" + params.id + (usr ? "?usr=" + usr : ""));
*/
  // check if user is subscribed to this webinar
  // if not, go away!
  const webinarSub = await userModel.getWebinarSubscription(user!.id, params.id as string);
  if (!webinarSub)
    return redirect("/dashboard/webinars/partner?showOnlyLiveWorkshops=" + webinar.isWorkshop);

  // if webinar is internal, we should watch this on CM
  // so we have to redirect to the proper place
  if (!webinar.isExternal)
    return redirect(webinarSub.url + "&skipPlatformChoice=1");

  // return webinar url (global is external, personalized for the user if internal)
  return {
    isExternal: webinar.isExternal,
    url: webinar.isExternal ? webinar.embedUrl : webinarSub.url,
    userId: user.id,
    isWorkshop: webinar.isWorkshop,
    embedCode: webinar.embedCode
  }
}

export default function WebinarPlay() {
  const { isExternal, url, userId, isWorkshop, embedCode } = useLoaderData<{ embedCode: string, isExternal: boolean, url: string, userId: string, isWorkshop: string }>();
  const { t } = useContext(GlobalContext);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const usr = searchParams.get("usr");
  const isUsr = usr && usr !== "null";
  const isTouchDevice = useDeviceDetect();

  const fetcher = useFetcher();

  useEffect(() => {
    const timer = setInterval(() => {
      fetcher.submit(
        null,
        { method: "post", action: "/dashboard/action/mark-webinar-as-attended/" + id + "/" + userId }
      );
    }, 1000 * 60 * 10); // 10 minutes

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="w-full h-screen fixed z-[500] top-0 left-0 bg-light-back dark:bg-dark">
        { !isUsr && (
          <nav
            className={clsx(
              "fixed p-6 xz-[100] top-0 left-0 w-full border-b bg-light dark:bg-dark",
              "dark:bg-zinc-900"
            )}
          >
            <Link to={"/dashboard/webinars/partner?showOnlyLiveWorkshops=" + isWorkshop} className="flex gap-4 items-center">
              <FaArrowLeft className="text-xl " />
              <span>{t("common.return")}</span>
            </Link>
          </nav>
        )}
        { !isExternal && (<iframe src={url + "&skipPlatformChoice=1"} className="w-full h-full" title="Webinar" />) }
        { isExternal && (!isTouchDevice || embedCode === ".") && (
          <div
            className={clsx(
              "flex flex-col lg:flex-row pb-10 h-screen lg:pb-0",
              !isUsr && "pt-18"
            )}
          >
            <Video src={url} className="w-full h-full" />
            <VideoChat className="w-full shrink-0 h-[400px] lg:w-1/3 lg:h-full" src={url} />
          </div>
        )}
        { isExternal && isTouchDevice && embedCode !== "." && (
          <>
            <div
              className={clsx(
                "fixed left-0 w-full z-50 flex overflow-y-auto",
                !isUsr && "top-18 h-[calc(100vh-4.5rem)]",
                isUsr && "top-0 h-screen"
              )}
            >
              <iframe
                src={ embedCode + "?embed=true" }
                width="100%"
                height="100%"
                frameborder="0"
                allow="autoplay; fullscreen"
                style={{ width: "100%", height: "100%", position: "absolute", left: "0px",top: "0px", overflow: "hidden" }}
              />
            </div>
          </>
        )}
      </div>
      <Spinner className="block mx-auto mt-20" />
    </>
  );
}