import { PermissionName, WebinarVariant } from "@prisma/client";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useParams } from "@remix-run/react";
import clsx from "clsx";
import { useContext, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

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
    },
    startAt: {
      lte: new Date(),
    }
  });
  if (!webinar)
    return redirect("/dashboard/webinars");

  // check if user is subscribed to this webinar
  // if not, go away!
  const webinarSub = await userModel.getWebinarSubscription(user!.id, params.id as string);
  if (!webinarSub)
    return redirect("/dashboard/webinars");

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
    }, 1000 * 60 * 10); // 10 minutes

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="w-full h-full fixed z-[100] top-0 left-0">
      <nav
        className={clsx(
          "fixed p-6 xz-[100] top-0 left-0 w-full border-b bg-light",
          "dark:bg-zinc-900"
        )}
      >
        <Link to="/dashboard/webinars" className="flex gap-4 items-center">
          <FaArrowLeft className="text-xl tracking-widest" />
          <span>{t("common.return")}</span>
        </Link>
      </nav>
      <iframe src={url + "&skipPlatformChoice=1"} className="w-full h-full" title="Webinar" />
    </div>
   
  );
}