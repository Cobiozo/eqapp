import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { notificationModel } from "~/models/notificaction.server";
import { pushNotificationModel } from "~/models/pushNotification.server";

export const loader: LoaderFunction = async ({ params }) => {
  const secret = params.secret as string;
  if (secret !== process.env.CRON_SECRET)
    return redirect("/404");

  // remove expired notifications
  await notificationModel.removeExpiredNotifications();
  await pushNotificationModel.removeExpiredNotifications();

  return null;
}
