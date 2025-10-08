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
import unloggedUserService from "~/utils/services/unloggedUser.server";
import { useDeviceDetect } from "~/utils/useDeviceDetect";

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // try to get usr from searchParam
  const url = new URL(request.url);
  const usr = url.searchParams.get("usr");
  
  // determine if webinar exist and if already started
  const webinar = await webinarModel.getById(params.id as string);
  const datePlusBufferMinutes = new Date();
  datePlusBufferMinutes.setMinutes(datePlusBufferMinutes.getMinutes() + config.webinarOpeningPeriod);
  if (!webinar)
    return redirect("/dashboard/webinars/client");
  /*if(webinar.isExternal && webinar.startAt > datePlusBufferMinutes)
    return redirect("/dashboard/webinars/client/details/" + params.id + (usr ? "?usr=" + usr : ""));*/
  
  // check if user is logged
  // if so, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/dashboard");

  // if not userId in link, just check unloggedUser if he has access to this webinar
  // otherwise try to check if usr is subscribed to this webinar
  // if not, go away!
  let userId = "";
  if (usr)
    userId = usr;
  else {
    const unloggedUserData = await unloggedUserService.getUnloggedUserData(request);
    if (!unloggedUserData.isRegistered)
      return redirect("/dashboard/webinars/client");
    userId = unloggedUserData.userId;
  }

  // check if user exists
  const user = await userModel.getById(userId);
  if (!user)
    return redirect("/dashboard/webinars/client");
 
  const webinarSub = await userModel.getWebinarSubscription(userId, params.id as string);
  if (!webinarSub)
      return redirect("/dashboard/webinars/client");

  // if webinar is internal, we should watch this on CM
  // so we have to redirect to the proper place
  if (!webinar.isExternal)
    return redirect(webinarSub.url + "&skipPlatformChoice=1");

  // return webinar url (global is external, personalized for the user if internal)
  return {
    isExternal: webinar.isExternal,
    url: webinar.isExternal ? webinar.embedUrl : webinarSub.url,
    userId,
    embedCode: webinar.embedCode
  }
}

export default function WebinarPlay(){
  const { isExternal, url, userId, embedCode } = useLoaderData<{ embedCode: string, isExternal: boolean, url: string, userId: string }>();
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
            <Link to="/dashboard/webinars/client" className="flex gap-4 items-center">
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