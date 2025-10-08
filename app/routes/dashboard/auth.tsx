import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { globalMiddleware } from "~/middlewares/global.server";
import { sessionService } from "~/utils/services/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (!pathname.includes("/dashboard/auth/join/"))
    await globalMiddleware({ request, params });

  const isLogged = await sessionService.isLogged(request);

  if(isLogged && url.pathname !== "/dashboard/auth/logout")
    return redirect("/dashboard");

  return null;
}

export default function AuthIndex() {
  return (
    <Outlet />
  )
}
