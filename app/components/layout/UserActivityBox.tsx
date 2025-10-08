import type { Role, User, UserActivity, Webinar, WorkshopItem } from "@prisma/client";
import { ActivityType } from "@prisma/client";
import clsx from "clsx";
import { useContext } from "react";
import { AiOutlineCalendar, AiOutlineSafetyCertificate, AiOutlineUnorderedList } from "react-icons/ai";
import { FaCheck, FaPencilAlt, FaRegSadCry } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { GlobalContext } from "~/root";
import BoxTitle from "../ui/BoxTitle";
import { TbFileCertificate } from "react-icons/tb";
import Button from "../ui/Button";
import { GiPartyPopper } from "react-icons/gi";
import { BsPen } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";

type Props = {
  userId: User["id"];
  activities: UserActivity[];
  className: string,
}

function ActivityIcon ({ type }: { type: UserActivity["type"] }) {
  const classNamesBase = "relative shrink-0 text-2xl border-3 border-current rounded-full w-12 h-12 flex justify-center items-center";
  switch (type) {
    case ActivityType.WORKSHOP_FINISH:
      return (
        <div className={clsx(classNamesBase, "text-green-500")}>
          <TbFileCertificate />
        </div>
      )
    case ActivityType.REGISTRATION:
      return (
        <div className={clsx(classNamesBase, "text-red-400")}>
          <BsPen />
        </div>
      );
    case ActivityType.ACTIVATION:
      return (
        <div className={clsx(classNamesBase, "text-purple-500")}>
          <AiOutlineSafetyCertificate />
        </div>
      );
    case ActivityType.PROMOTION:
      return (
        <div className={clsx(classNamesBase, "text-purple-500")}>
          <GiPartyPopper />
        </div>
      ); 
    case ActivityType.DEMOTION:
      return (
        <div className={clsx(classNamesBase, "text-red-500")}>
          <FaRegSadCry />
        </div>
      );
    case ActivityType.WEBINAR_SUBSCRIPTION:
      return (
        <div className={clsx(classNamesBase, "text-blue-500")}>
          <FaPencilAlt />
        </div>
      );
    case ActivityType.WEBINAR_PRESENCE:
      return (
        <div className={clsx(classNamesBase, "text-green-500")}>
          <BiMoviePlay />
        </div>
      );
    default:
      return null;
  }
}


export function Activity({ type, createdAt, workshop, webinar, role }: UserActivity & { workshop?: WorkshopItem } & { role?: Role } & { webinar?: Webinar }) {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const date = new Date(createdAt).toLocaleDateString();

  const determineName = () => {
    if (workshop)
      return workshop.name[currentLang];
    if (webinar)
      return webinar.title[currentLang];
    if (role)
      return t("users.roles." + role.name.toLowerCase());
    return "";
  }

  return (
    <div className="flex items-center gap-4 text-sm standard-content bg-white dark:bg-dark border-light-border dark:border-medium-darker border dark:border-medium-darker mb-2 px-4 py-2 rounded-lg">
      <ActivityIcon type={type} />
      <div>
        <div className="flex items-center text-xs mb-2 font-semibold relative z-10">
          <AiOutlineCalendar className="text-md" />
          <span className="ml-1">{date}</span>
          { (type.includes("FINISH") || type.includes("PRESENCE"))&& (<FaCheck className="text-green-500 ml-1 text-sm" />) }
        </div>
        <h2
          dangerouslySetInnerHTML={{ __html: t("proteges.activity.descriptions." + type, determineName()) }}
        />
      </div>
    </div>
  );
}

export default function UserActivityBox({ activities, className, userId }: Props) {
  const { t } = useContext(GlobalContext);

  return (
    <section className={clsx(className)}>
      <BoxTitle className="flex justify-center items-center gap-4">
        <FiActivity className="text-3xl" />
        <span className="w-min">{t("proteges.activity.lastActivity")}</span>
      </BoxTitle>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            <Activity key={index} {...activity} />
          </li>
        ))}
      </ul>
      <Button
        className="my-10 mx-auto"
        size="sm"
        icon={AiOutlineUnorderedList}
        to={`/dashboard/proteges/${userId}/activities`}
      >
        {t("proteges.activity.seeAll")}
      </Button>
    </section>
  );
}
