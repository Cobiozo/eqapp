import { useFetcher, useLocation, useTransition } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "~/root";
import Notification from "../ui/Notification";

export default function PushNotificationsChecker() {
  const pushNotificationsFetcher = useFetcher();
  const { t } = useContext(GlobalContext);
  const transition = useTransition();
  const location = useLocation();

  const [count, setCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const checkUnseenPushNotifications = () => {
    pushNotificationsFetcher.submit(
      null,
      {
        method: "get",
        action: `/dashboard/action/count-unseen-push-notifications`
      }
    )
  }

  useEffect(() => {
    checkUnseenPushNotifications();
  }, [location.pathname])

  useEffect(() => {
    if (pushNotificationsFetcher.data) {
      setCount(pushNotificationsFetcher.data);
    }
  }, [pushNotificationsFetcher.data])

  useEffect(() => {
    if (count > 0) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  }, [count]);

  useEffect(() => {
    if (showNotification && transition.state !== "idle")
      setShowNotification(false);
  }, [transition])

  if (!showNotification || count < 1) return null;
  return (
    <>
      <Notification
        key={Math.random()}
        variant="notification"
        autoClose={true}
        onClose={() => setCount(0)}
        delay={5000}
      >
        {t("notifications.unseenPushNotifications", count)}
      </Notification>
    </>
  );

}