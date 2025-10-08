import type { Notification, NotificationContent } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import Button from "~/components/ui/Button";
import GoldBox from "~/components/ui/GoldBox";
import { globalMiddleware } from "~/middlewares/global.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  // search for unread notification
  const userId = await sessionService.getUserId(request) as string;
  const notification = await userModel.getUnreadNotification(userId);

  // if there isn't one -> redirect to dashboard
  if(!notification)
    return redirect("/dashboard");

  // if there is -> mark it as read
  await userModel.markNotificationAsRead(userId, notification.id);

  return redirect("/dashboard");
}


type LoaderData = Notification & { content: NotificationContent };

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  // search for unread notification
  const userId = await sessionService.getUserId(request) as string;
  const notification = await userModel.getUnreadNotification(userId);

  // if there isn't one -> redirect to dashboard
  if(!notification)
    return redirect("/dashboard");

  // if there is -> simply return it
  return notification;
}

export default function NotificationIndex() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const notification = useLoaderData<LoaderData>();

  return (
    <GoldBox
      title={notification.content.title[currentLang]}
    >
      <div
        className="standard-post"
        dangerouslySetInnerHTML={{
          __html: notification.content.description[currentLang]
        }}
      />
      <Form method="post">
        <Button
          className="mx-auto mt-10"
          variant="gold"
          icon={FaCheck}
        >
          {t("common.confirm")}
        </Button>
      </Form>
    </GoldBox>
  );
}

