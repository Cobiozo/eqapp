import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import NotificationsBox from "~/components/layout/NotificationsBox";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import type { FullPushNotification } from "~/models/pushNotification.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = FullPushNotification[];

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  const userId = await sessionService.getUserId(request) as string;

  // get unread notifications
  const notifications = await userModel.getPushNotifications(userId);

  // mark them as read
  await userModel.markUnreadPushNotificationAsRead(userId);

  return notifications;
}

export default function() {
  const { t } = useContext(GlobalContext);
  const notifications = useLoaderData<LoaderData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard">
        {t("notifications.title")}
      </AdminPageHeader>
      <NotificationsBox
        className="max-w-2xl mx-auto"
        notifications={notifications}
      />
    </section>
  );
}