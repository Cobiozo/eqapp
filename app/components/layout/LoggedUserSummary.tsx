import { RoleName } from "@prisma/client";
import { Link, useFetcher, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import type { UserWithRole } from "~/models/user.server";
import { GlobalContext } from "~/root";

type Props = {
  className?: string;
  avatarClassName?: string;
  descClassName?: string;
}

export default function LoggedUserSummary({ className, avatarClassName, descClassName }: Props) {
  const { t, user: currentUser } = useContext(GlobalContext);
  const user = currentUser as UserWithRole;
  const fullName = user.firstName + ' ' + user.lastName;

  // LoggedSummary load unread notifications count at startup and every 2 minutes
  // but also... if user is on /dashboard/notifications page, because it means he has read all notifications and it's time to refresh the count
  const pushNotificationsFetcher = useFetcher();
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location.pathname);

  const checkUnreadPushNotifications = () => {
    pushNotificationsFetcher.submit(
      null,
      {
        method: "get",
        action: `/dashboard/action/count-unread-push-notifications`
      }
    )
  }

  useEffect(() => {
    checkUnreadPushNotifications();
  }, [location.pathname])

  useEffect(() => {
    if (previousLocation === "/dashboard/notifications" && location.pathname !== "/dashboard/notifications")
      checkUnreadPushNotifications();
    setPreviousLocation(location.pathname);
  }, [location])

  return (
    <div className={clsx(className, "flex items-center standard-content pl-12 2xl:pl-0")}>
      <Link to={ pushNotificationsFetcher.data > 0 ? "/dashboard/notifications" : "/dashboard" }>
        <div className={clsx(avatarClassName, "relative")}>
          <div className="bg-green-500 w-3 h-3 rounded-full absolute top-0 left-0 border-2 border-light shadow" />
          { pushNotificationsFetcher.data > 0 && (
            <div className="bg-gold text-light w-6 h-6 rounded-full absolute -top-1 -right-1 border-2 border-light shadow flex justify-center items-center">
              {pushNotificationsFetcher.data}
            </div>
          )}
          <img
            src={user.avatar ? `/uploads/${user.avatar}` : "/images/no-avatar.webp"}
            alt={fullName}
            className={clsx(
              "w-12 h-12 rounded-full border-2",
              user.role.name === RoleName.ADMIN ? "border-gold" : "border-primary-lighte"
            )}
          />
        </div>
      </Link>
      <div className={clsx(descClassName, "mx-4")}>
        <h2 className="font-semibold">
          {fullName}
        </h2>
        <div className="text-sm">
          {t(`users.roles.${user.role.name.toLowerCase()}`)}
        </div>
      </div>
    </div>
  );
}
