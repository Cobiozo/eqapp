import type { LoaderFunction } from "@remix-run/node";
import { sessionService } from "~/utils/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await sessionService.logout(request);
};
