import { redirect, type LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useParams } from "@remix-run/react";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import clientService from "~/utils/services/client.server";

export const loader: LoaderFunction = async ({ request, params }) => {
 
  // determine if webinar exist and if already started
  const webinar = await webinarModel.getById(params.id as string);
  if (!webinar || webinar.startAt > new Date())
    return redirect("/client/webinars");

  // check if user is subscribed to this webinar
  // if not, go away!
  const clientData = await clientService.getClientData(request);
  if (!clientData || !clientData.isRegistered)
    return redirect("/client/webinars");
  const webinarSub = await userModel.getWebinarSubscription(clientData.userId, params.id as string);
  if (!webinarSub)
    return redirect("/client/webinars");

  // return webinar url (personalized for the user)
  return webinarSub.url;
}

export default function WebinarPlay(){
  const url = useLoaderData<string>();
  const { t } = useContext(GlobalContext);
  const { id } = useParams();

  const fetcher = useFetcher();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetcher.submit(
        null,
        { method: "post", action: "/dashboard/action/mark-webinar-as-attended/" + id }
      );
    }, 1000 * 60 * 1); // 10 minutes

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="w-full h-full fixed z-[100] top-0 left-0">
      <nav
        className={clsx(
          "fixed p-6 xz-[100] top-0 left-0 w-full border-b bg-light"
        )}
      >
        <Link to="/client/webinars" className="flex gap-4 items-center">
          <FaArrowLeft className="text-xl tracking-widest" />
          <span>{t("common.return")}</span>
        </Link>
      </nav>
      <iframe src={url + "&skipPlatformChoice=1"} className="w-full h-full" title="Webinar" />
    </div>
   
  );
}