import { redirect, type LinksFunction, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useMatches,
  useNavigate,
} from "@remix-run/react";

// imports for creating global context
import { createContext, useContext, useEffect } from "react";
import prepareTranslationFunc from "./utils/prepareTranslationFunc";
import themeService from "./utils/services/theme.server";
import translateService from "./utils/services/translate.server";
import type { LangKey } from "./config.server";
import type { Theme } from "./utils/services/theme.server";

// import styles
import tailwind from "./tailwind.css";
import cropperCSS from "cropperjs/dist/cropper.css";
import animate from "animate.css/animate.min.css";
import pdfjs from "./styles/pdfjs.css";
import { sessionService } from "./utils/services/session.server";
import type { UserWithRole } from "./models/user.server";
import PageHeader from "./components/ui/PageHeader";
import PageInfo from "./components/ui/PageInfo";

// Meta data for the app
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "EQApp",
  viewport: "width=device-width,initial-scale=1,user-scalable=no",
});

// stylesheet links
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: cropperCSS },
  { rel: "stylesheet", href: animate },
  { rel: "stylesheet", href: pdfjs },
];

export type GlobalData = {
  isLogged: boolean;
  user: UserWithRole | null;
  theme: Theme;
  lang: LangKey;
  t: (key: string, data?: string | number) => string;
}

// Loader for preparing global data for the context
export const loader: LoaderFunction = async ({ request }) => {

   // redirect to https if not localhost and not https
   const url = new URL(request.url);
   const hostname = url.hostname;
   const proto = request.headers.get("X-Forwarded-Proto") ?? url.protocol;
 
   url.host =
     request.headers.get("X-Forwarded-Host") ??
     request.headers.get("host") ??
     url.host;
   url.protocol = "https:";
 
   if (proto === "http" && hostname !== "localhost") {
     return redirect(url.toString(), {
       headers: {
         "X-Forwarded-Proto": "https",
       },
     });
   }

  const theme = await themeService.getCurrentTheme(request);
  const currentLang = await translateService.getCurrentLang(request);
  const isLogged = await sessionService.isLogged(request);
  const user = await sessionService.getUser(request, true);

  return {
    global: {
      isLogged,
      user,
      theme,
      lang: currentLang,
    }
  }
};

export const GlobalContext = createContext<GlobalData>({
  isLogged: false,
  user: null,
  theme: "light",
  lang: "pl",
  t: (key: string, data?: string | number) => key,
});

export default function App() {
  let isMount = true;
  let location = useLocation();
  let matches = useMatches();

  useEffect(() => {
    let mounted = isMount;
    isMount = false;
    if ("serviceWorker" in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: "REMIX_NAVIGATION",
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        let listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: "REMIX_NAVIGATION",
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener("controllerchange", listener);
        return () => {
          navigator.serviceWorker.removeEventListener(
            "controllerchange",
            listener
          );
        };
      }
    }
  }, [location]);

  const { global } = useLoaderData<{ global: GlobalData }>();
  const t = prepareTranslationFunc(global.lang);

  return (
    <GlobalContext.Provider value={{ ...global, t }}>
      <html lang={global.lang} className={global.theme}>
        <head>
          <Meta />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#ffffff" />
          <link rel="manifest" href="/resources/manifest.webmanifest" crossOrigin="use-credentials" />
          <link rel="apple-touch-icon" href="/icons/ios/180.png" />
          <Links />
        </head>
        <body className="min-h-screen bg-light-back dark:text-light dark:bg-zinc-900">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </GlobalContext.Provider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  console.log(error);

  useEffect(() => {
    navigate("/error", { replace: true });
  }, []);


  return (
    <section className="dark:text-light dark:bg-zinc-800">
      <PageHeader className="mt-20">
        {t("common.somethingWentWrong")}
      </PageHeader>
      <PageInfo>
        {t("common.somethingWentWrongDescription")}
      </PageInfo>
      <Link to="/" className="link block mx-auto text-center">
        {t("common.goBackToHome")}
      </Link>
      <pre>
        {error.stack}
      </pre>
    </section>
  );
}


