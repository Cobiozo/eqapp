import { NotificationContentType } from "@prisma/client";
import clsx from "clsx";
import { useContext } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import { BsPen } from "react-icons/bs";
import { FaCheck, FaRegSadCry } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { IoSwapHorizontalOutline } from "react-icons/io5";
import { FullPushNotification } from "~/models/pushNotification.server";
import { GlobalContext } from "~/root";
import Alert from "../ui/Alert";
import { CgSandClock } from "react-icons/cg";

type Props = {
  notifications: FullPushNotification[];
  className?: string,
}

function NotificationIcon ({ type }: { type: NotificationContentType }) {
  const classNamesBase = "relative shrink-0 text-2xl border-3 border-current rounded-full w-12 h-12 flex justify-center items-center";
  switch (type) {
    case NotificationContentType.USER_REGISTRATION:
      return (
        <div className={clsx(classNamesBase, "text-red-400")}>
          <BsPen />
        </div>
      );
    case NotificationContentType.PROMOTION:
      return (
        <div className={clsx(classNamesBase, "text-purple-500")}>
          <GiPartyPopper />
        </div>
      );
    case NotificationContentType.DEMOTION:
      return (
        <div className={clsx(classNamesBase, "text-purple-500")}>
          <FaRegSadCry />
        </div>
      );

    case NotificationContentType.MENTOR_CHANGE:
      return (
        <div className={clsx(classNamesBase, "text-red-400")}>
          <IoSwapHorizontalOutline />
        </div>
      );
    case NotificationContentType.ACCOUNT_SUSPENSION:
      return (
        <div className={clsx(classNamesBase, "text-red-400")}>
          <FaRegSadCry />
        </div>
      );
    case NotificationContentType.WEBINAR_STARTS_NOW:
      return (
        <div className={clsx(classNamesBase, "text-red-500")}>
          <BiAlarm />
        </div>
      );
    case NotificationContentType.WEBINAR_STARTS_SOON:
      return (
        <div className={clsx(classNamesBase, "text-red-500")}>
          <CgSandClock />
        </div>
      );
    case NotificationContentType.WEBINAR_STARTS_IN_10_MINUTES:
      return (
        <div className={clsx(classNamesBase, "text-red-500")}>
          <CgSandClock />
        </div>
      );
    default:
      return null;
  }
}


export function Notification({ content, createdAt, workshop, role, mentor, relatedUser, webinar }: FullPushNotification) {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const date = new Date(createdAt).toLocaleDateString();

  const determineName = () => {
    if (workshop)
      return workshop.name;
    if (webinar)
      return webinar.title[currentLang];
    if (role)
      return t("users.roles." + role.name.toLowerCase());
    if (mentor)
      return mentor.firstName + " " + mentor.lastName;
    if (relatedUser)
      return relatedUser.firstName + " " + relatedUser.lastName;
    return "";
  }

  return (
    <div className="px-4 py-2 flex items-start gap-4 text-sm standard-content bg-light dark:bg-dark border border-light-border dark:border-medium-darker dark:border-medium-darker rounded-lg my-2">
      <div className="mt-4">
        <NotificationIcon type={content.type} />
      </div>
      <div>
        <div className="flex items-center text-xs mb-2 font-semibold relative z-10">
          <AiOutlineCalendar className="text-md text-medium-dark" />
          <span className="ml-1">{date}</span>
          { content.type.includes("FINISH") && (<FaCheck className="text-green-500 ml-1 text-sm" />) }
        </div>
        <h2
          className="font-semibold text-md mb-2"
          dangerouslySetInnerHTML={{ __html: content.title[currentLang] }} 
        />
        <div
          dangerouslySetInnerHTML={{ __html: content.description[currentLang].replace("{0}", determineName()) }}
        />
      </div>
    </div>
  );
}

export default function NotificationsBox({ notifications, className }: Props) {
  const { t } = useContext(GlobalContext);

  return (
    <section className={clsx(className)}>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <Notification {...notification} />
          </li>
        ))}
      </ul>
      {notifications.length === 0 && (
        <Alert
          className="mx-auto"
          variant="info"
          title={t("notifications.noNotifications")}
        >
          {t("notifications.noNotificationsDesc")}
        </Alert>
      )}
    </section>
  );
}
