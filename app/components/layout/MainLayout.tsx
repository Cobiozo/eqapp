import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import Container from "./Container";
import clsx from "clsx";
import { useTransition } from "@remix-run/react";
import Loading from "./Loading";
import { checkConnectivity } from "~/utils/client/pwa-utils.client";
import { useContext, useEffect, useRef, useState } from "react";
import Offline from "./Offline";
import AppMenuBar from "./AppMenuBar";
import { GlobalContext } from "~/root";
import Sidebar from "./Sidebar";
import CookieBox from "../features/CookieBox";

type Props = {
  children: React.ReactNode;
  sidebarLinks?: any;
  shopUrl: string;
}

export default function MainLayout({ children, sidebarLinks, shopUrl }: Props) {
  const transition = useTransition();
  const isLoading = ["loading", "submitting"].includes(transition.state);
  const [status, setStatus] = useState<"online"|"offline">('online');
  const { isLogged } = useContext(GlobalContext);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // check connectivity,save status to state
  useEffect(() => {
    checkConnectivity(() => setStatus('online'), () => setStatus('offline'));
  }, [])

  return (
    <div
      className={clsx(
        "transition min-h-screen",
        "text-dark bg-light-back",
        "dark:text-light dark:bg-zinc-900",
        !isLogged && "font-bitter"
      )}
    >
      {/*<div className="bg-[url('/images/back.webp')] bg-cover bg-center opacity-10 w-screen h-screen fixed top-0 left-0" />*/}
      <div className="relative z-10">
        <CookieBox />
        <AppHeader />
        <Sidebar
          links={sidebarLinks}
          shopUrl={shopUrl}
          ref={sidebarRef}
        />
        { isLoading && <Loading />}
        <Offline className={clsx(status === "online" && "hidden")} />
        <Container>
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </Container>
        <AppMenuBar />
        <AppFooter />
      </div>
    </div>
  );
}
