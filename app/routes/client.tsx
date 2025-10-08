import type { LoaderFunction} from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import NavBar from "~/components/client/NavBar";
import PageFooter from "~/components/client/PageFooter";
import TallyForm from "~/components/client/TallyForm";
import Loading from "~/components/layout/Loading";
import { userModel } from "~/models/user.server";
import clientService from "~/utils/services/client.server";
import { sessionService } from "~/utils/services/session.server";
import clsx from "clsx";
import { checkConnectivity } from "~/utils/client/pwa-utils.client";
import { useEffect, useState } from "react";
import Offline from "~/components/layout/Offline";
import { useTransition } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {

  // check if user is logged,
  // if its, it means that it's a partner, so we don't have to do anything
  if (await sessionService.isLogged(request))
    return null;

  // if user is not logged, check if it's saved client
  const clientData = await clientService.getClientData(request);
  if (clientData) {

    // there is a possibility that this client used another device to activate the accound
    // synchronize this client with potential user record in db
    // also check if user has webSubscription (web push), if not, create it
    const user = await userModel.getById(clientData?.userId);
    if (user) {

      const url = new URL(request.url);
      if (!user.emailVerified || Object.keys(user.webPushSubscription).length > 0 || url.pathname.includes("subscribe") || url.pathname.includes("accept-invitation"))
        return clientService.updateClientData(request, {
          userId: user.id,
          mentorId: user.mentorId as string,
          isRegistered: true
        });
      else {
        const currentUrl = new URL(request.url);
        return clientService.updateClientData(request, {
          userId: user.id,
          mentorId: user.mentorId as string,
          isRegistered: true
        }, "/resources/refresh-subscription?returnUrl=" + currentUrl.pathname);
      }
    }

    // if user doesn't exists, but claims that isRegistered,
    // we have to remove him
    if (clientData.isRegistered && !user)
      return await clientService.removeClient();

    return null;
  }

  // otherwise, we have to create new client
  // first, we check if there is ref in searchParam
  // if there is, it should point to mentor that invited this client
  const ref = new URL(request.url).searchParams.get("ref");
  if (ref) {
    
    // try to find this user
    const mentor = await userModel.getById(ref, undefined, {
      verified: true,
    });

    // if mentor exists, save client data with random id and this mentor id
    // and that's all ;)  
    if (mentor) {
      return clientService.createClient(mentor.id);
    }

    // however if mentor doesn't exist, we will use admin as mentor
    // and after all, we redirect him to why page
    // let user inform us what is he doing here
    if (!mentor) {
      const adminId = "ac0d94b7-2ba0-4350-a45a-f782d75fa43a";
      return await clientService.createClient(adminId, "/client/what-am-i-doing-here");
    }

  } else {

    // if no ref, we will use admin as mentor
    // and ask user why he's here
    // but ask only if he enters main page
    const adminId = "ac0d94b7-2ba0-4350-a45a-f782d75fa43a";
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === "/client" || pathname === "/client/")
      return await clientService.createClient(adminId, "/client/what-am-i-doing-here");
    else
      return await clientService.createClient(adminId);
  }

}

export default function ClientLayout() {
  const transition = useTransition();
  const isLoading = ["loading", "submitting"].includes(transition.state);
  const [status, setStatus] = useState<"online"|"offline">('online');

  // check connectivity,save status to state
  useEffect(() => {
    checkConnectivity(() => setStatus('online'), () => setStatus('offline'));
  }, [])

  return (
    <div className="font-client bg-[#fafafa] min-h-screen overflow-x-hidden">
      { isLoading && <Loading />}
      <Offline className={clsx(status === "online" && "hidden")} />
      <TallyForm />
      <NavBar />
      <Outlet />
      <PageFooter />
    </div>
  )
}