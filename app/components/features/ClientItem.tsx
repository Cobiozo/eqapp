import { useContext } from "react";
import { FiCalendar } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import type { UserWithRole } from "~/models/user.server";
import { GlobalContext } from "~/root";
import DecoratedImage from "../ui/DecoratedImage";
import PageHeader from "../ui/PageHeader";
import type { Webinar } from "@prisma/client";
import { Link } from "@remix-run/react";
import { FaArrowLeft } from "react-icons/fa";
import clsx from "clsx";
import { AiOutlineMail } from "react-icons/ai";
import UserWebinarActivityBox from "../layout/UserWebinarActivityBox";

type Props = UserWithRole
& { webinars: (Webinar & { subscribed: boolean, attended: boolean })[] };

export default function ClientItem({ id, verified, firstName, lastName, avatar, role, createdAt, activities, webinars, email, phone, ...rest }: Props) {
  const { t } = useContext(GlobalContext);

  const mainInfo: {
    icon: React.ComponentType<any>,
    label: string,
    value: string | number,
  }[] = [
    {
      icon: FiCalendar,
      label: t("proteges.mainInfo.createdDate"),
      value: new Date(createdAt).toLocaleDateString(),
    },
    {
      icon: AiOutlineMail,
      label: t("proteges.mainInfo.email"),
      value: email,
    },
  ]

  return (
    <section>
      <div className="px-4 text-xl standard-content font-semibold">
        <Link to={"/dashboard/clients"} className="flex items-center gap-3">
          <FaArrowLeft />
          <span>{t("common.return")}</span>
        </Link>
      </div>
      <div>
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
          </div>
        </PageHeader>
        <ul className="py-6 border-light-border dark:border-medium-darker text-dark  dark:text-light md:pt-0 md:px-10 standard-content border-t md:border-t-0">
          {mainInfo.map(({ icon: Icon, label, value }) => (
            <li className="flex justify-center items-center gap-2" key={label}>
              <Icon className="text-md" /> <strong>{label}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
      <hr className="hidden opacity-20 md:block" />
      <UserWebinarActivityBox
        collection={"clients"}
        className="border-zinc-600 md:pl-2"
        webinars={webinars}
        userId={id}
      />
    </section>
  );
}
