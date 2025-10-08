import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { webinarModel } from "~/models/webinar.server";

export const loader: LoaderFunction = async ({ params }) => {

  const secret = params.secret as string;
  if (secret !== process.env.CRON_SECRET)
    return redirect("/404");

  // mark webinars as expired
  await webinarModel.markWebinarsAsExpired();

  return null;
}
