import { GlobalContext } from "~/root";
import { useContext } from "react";
import type { UserWithRole } from "~/models/user.server";
import { Link } from "@remix-run/react";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";
import { GiSandsOfTime } from "react-icons/gi";
import { TbBabyCarriage } from "react-icons/tb";
import { RoleName } from "@prisma/client";

type Props = {
  protege: UserWithRole
}

export default function ProtegeTemplate({ protege }: Props) {
  const { t } = useContext(GlobalContext);

  return (
    <Link
      className={clsx(
        "block relative w-full h-full mx-auto rounded-lg border-light-border dark:border-medium-darker shadow-lg border bg-white dark:bg-dark dark:border-medium-darker p-3",
        !protege.verified && "opacity-80"
      )}
      to={`/dashboard/proteges/${protege.id}`}
    >
      <div className="relative">
        <img
          src={ protege.avatar ? "/uploads/" + protege.avatar : '/images/no-avatar.webp'}
          className="w-32 h-32 mx-auto rounded-lg"
        />
        { protege.verified && (
          <FaCheck className="absolute text-2xl top-0 -right-2 bg-green-500 shrink-0 text-light p-1 rounded-full m-2 md:p-2" />
        )}
        { !protege.verified && (
          <GiSandsOfTime className="absolute text-2xl top-0 -right-2 bg-gray-500 shrink-0 text-light p-1 rounded-full m-2 md:p-1" />
        )}
        { protege.role.name === RoleName.CANDIDATE_PARTNER && (
          <TbBabyCarriage className="absolute text-2xl top-7 -right-2 bg-pink-500 shrink-0 text-light p-1 rounded-full m-2 md:p-2" />
        )}
      </div>
      <h3 className="standard-content font-semibold text-center mt-2 text-sm sm:text-md">
        {protege.firstName} {protege.lastName}
      </h3>
      <p className="text-center text-xs md:text-sm">
        {t("users.roles." + protege.role.name.toLowerCase())}
      </p>
    </Link>
  );
}
