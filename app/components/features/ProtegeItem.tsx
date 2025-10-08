import { useContext } from "react";
import { FiActivity, FiCalendar } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import type { UserWithRole } from "~/models/user.server";
import { GlobalContext } from "~/root";
import DecoratedImage from "../ui/DecoratedImage";
import PageHeader from "../ui/PageHeader";
import UserActivityBox from "../layout/UserActivityBox";
import type { UserActivity, Webinar } from "@prisma/client";
import { Link, useSearchParams } from "@remix-run/react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import clsx from "clsx";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import UserWebinarActivityBox from "../layout/UserWebinarActivityBox";
import Button from "../ui/Button";
import { MdOutlineSwapVert } from "react-icons/md";
import Notification from "../ui/Notification";

type Props = UserWithRole
& { activities: UserActivity[] }
& { webinars: (Webinar & { attended: boolean })[] };

export default function ProtegeItem({ id, verified, firstName, lastName, avatar, role, createdAt, activities, webinars, email, phone, ...rest }: Props) {
  const { t } = useContext(GlobalContext);
  const lastActiveAt = activities[0]?.createdAt || createdAt;
  const [searchParams] = useSearchParams();
  const mentorChanged = searchParams.get("mentorChanged");

  const mainInfo: {
    icon: React.ComponentType<any>,
    label: string,
    value: string | number,
  }[] = [
    {
      icon: BiUser,
      label: t("proteges.mainInfo.role"),
      value: t("users.roles." + role.name.toLowerCase()),
    },
    {
      icon: FiCalendar,
      label: t("proteges.mainInfo.createdDate"),
      value: new Date(createdAt).toLocaleDateString(),
    },
    {
      icon: FiActivity,
      label: t("proteges.mainInfo.lastActivity"),
      value: new Date(lastActiveAt).toLocaleDateString(),
    },
    {
      icon: AiOutlineMail,
      label: t("proteges.mainInfo.email"),
      value: email,
    },
    {
      icon: AiOutlinePhone,
      label: t("proteges.mainInfo.phone"),
      value: phone || "N/A",
    },
  ]

  return (
    <section>
      { mentorChanged && (
        <Notification variant="success" autoClose={true}>
          {t("proteges.mentorChanged")}
        </Notification>
      )}
      <div className="px-4 text-xl standard-content font-bold">
        <Link to={"/dashboard/proteges"} className="flex items-center gap-3">
          <FaArrowLeft />
          <span>{t("common.return")}</span>
        </Link>
      </div>
      <div className="relative z-10 max-w-xl mx-auto mt-6">
        <DecoratedImage
          src={ avatar ? "/uploads/" + avatar : '/images/no-avatar.webp'}
          className="mx-auto -mb-20"
        />
        <div className="pt-14 md:pt-16 bg-white border-gold border-2 rounded-lg dark:bg-dark p-6">
          <PageHeader className="-mb-4 md:-mb-6">
            <div className="text-center flex justify-center items-center md:text-left">
              <span
                className={clsx(
                  "shrink",
                  (firstName + lastName).length > 20 && "md:text-3xl",
                )}
              >
                {firstName} {lastName}
              </span>
              { verified && (
                <FaCheck className="bg-green-500 shrink-0 text-light p-1 rounded-full m-2 md:p-2" />
              )}
            </div>
          </PageHeader>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 mt-2">
            <Button
              size="sm"
              variant="secondary"
              className="mx-auto my-0 md:mb-6"
              icon={MdOutlineSwapVert}
              to={`/dashboard/proteges/${id}/change-mentor/list/--none--`}
            >
              {t("proteges.actions.changeMentor")}
            </Button>
            <Button
              size="sm"
              variant="danger"
              className="mx-auto my-0 mb-6"
              icon={MdOutlineSwapVert}
              to={`/dashboard/proteges/${id}/remove`}
            >
              {t("proteges.actions.delete")}
            </Button>
          </div>
          <ul className="pt-6 border-light-border dark:border-medium-darker mx-auto w-fit standard-content border-t text-sm md:text-base">
            {mainInfo.map(({ icon: Icon, label, value }) => (
              <li className="flex items-center gap-2" key={label}>
                <Icon className="text-lg" /> <span className="font-semibold">{label}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <UserActivityBox
          className="border-b border-gold md:border-b-0 md:border-r-2 md:-mt-20 md:py-20 px-4"
          activities={activities}
          userId={id}
        />
        <UserWebinarActivityBox
          className="border-zinc-600 md:pl-2"
          webinars={webinars}
          userId={id}
        />
        <hr className="block opacity-20 mt-10 md:hidden md:mt-0" />
      </div>
    </section>
  );
}
