import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { sessionService } from "~/utils/services/session.server";
import datePickerStyles from "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';
import en from 'date-fns/locale/en-US';
import de from 'date-fns/locale/de';
import ua from 'date-fns/locale/uk';
import { useContext } from "react";
import { GlobalContext } from "~/root";

// react-datepicker install
export const links = function() {
  return [
    { rel: "stylesheet", href: datePickerStyles },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  // require permission
  await sessionService.requirePermission(request, "adminPanelAccess", "/dashboard");

  return null;
}

export default function AdminLayout() {
  const { lang: currentLang } = useContext(GlobalContext);
  registerLocale('pl', pl);
  registerLocale('en', en);
  registerLocale('de', de);
  registerLocale('ua', ua);
  setDefaultLocale(currentLang);

  return <Outlet />
}
