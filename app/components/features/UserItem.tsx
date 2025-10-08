import { useContext } from "react";
import { FiActivity, FiCalendar } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import type { UserWithRole } from "~/models/user.server";
import { GlobalContext } from "~/root";
import DecoratedImage from "../ui/DecoratedImage";
import PageHeader from "../ui/PageHeader";
import UserActivityBox from "../layout/UserActivityBox";
import UserActionsBox from "../layout/UserActionsBox";
import type { UserActivity } from "@prisma/client";
import { Link, useSearchParams } from "@remix-run/react";
import Notification from "../ui/Notification";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import clsx from "clsx";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

type Props = UserWithRole
& { activities: UserActivity[] }

export default function ProtegeItem({ id, verified, firstName, lastName, avatar, role, createdAt, activities, email, phone, ...rest }: Props) {
  const { t } = useContext(GlobalContext);
  const lastActiveAt = activities[0]?.createdAt || createdAt;
  const [searchParams] = useSearchParams();
  const protegePromoted = searchParams.get("protegePromoted");
  const protegeActivated = searchParams.get("protegeActivated");
  const invitationSent = searchParams.get("invitationSent");
  const mentorChanged = searchParams.get("mentorChanged");
  const inviteLinkCopied = searchParams.get("inviteLinkCopied");
  const protegeDemoted = searchParams.get("protegeDemoted");

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
      <div className="px-4 text-xl standard-content font-bold">
        <Link to={"/dashboard/admin/proteges"} className="flex items-center gap-3">
          <FaArrowLeft />
          <span>{t("common.return")}</span>
        </Link>
      </div>
      <div className="flex flex-col items-center md:flex-row md:items-start">
        { protegePromoted && (
          <Notification variant="success" autoClose={true}>
            {t("proteges.protegePromoted")}
          </Notification>
        )}
        { protegeActivated && (
          <Notification variant="success" autoClose={true}>
            {t("proteges.protegeActivated")}
          </Notification>
        )}
        { invitationSent && (
          <Notification variant="success" autoClose={true}>
            {t("proteges.invitationSent")}
          </Notification>
        )}
        { mentorChanged && (
          <Notification variant="success" autoClose={true}>
            {t("proteges.mentorChanged")}
          </Notification>
        )}
        { inviteLinkCopied && (
          <Notification variant="success" autoClose={true}>
            {t("proteges.inviteLinkCopied")}
          </Notification>
        )}
        { protegeDemoted && (
          <Notification variant="success" autoClose={true}>
            {t("proteges.protegeDemoted")}
          </Notification>
        )}
        <DecoratedImage
          src={ avatar ? "/uploads/" + avatar : '/images/no-avatar.webp'}
          className="w-52 mx-auto"
        />
        <div className="-mt-10 mb-10 md:mb-0 md:mt-0">
          <PageHeader className="mt-5 md:px-10">
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
          <ul className="py-6 border-zinc-600 md:pt-0 md:px-10 standard-content border-t md:border-t-0">
            {mainInfo.map(({ icon: Icon, label, value }) => (
              <li className="flex items-center gap-2" key={label}>
                <Icon className="text-lg" /> <strong>{label}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr className="hidden opacity-20 md:block" />
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <UserActivityBox
          className="border-b border-zinc-600 -mt-10 md:border-r md:border-b-0 md:mt-0 px-2"
          activities={activities}
          userId={id}
        />
        <UserActionsBox
          protege={{ id, firstName, lastName, avatar, role, verified, step, ...rest }}
        />
        <hr className="block opacity-20 mt-10 md:hidden md:mt-0" />
      </div>
    </section>
  );
}
