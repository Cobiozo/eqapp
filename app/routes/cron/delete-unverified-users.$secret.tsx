import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { userModel } from "~/models/user.server";

export const loader: LoaderFunction = async ({ params }) => {

  const secret = params.secret as string;
  if (secret !== process.env.CRON_SECRET)
    return redirect("/404");

  // delete old unverified users
  await userModel.deleteUnverifiedUsers();

  return null;
}
