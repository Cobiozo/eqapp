import { GlobalContext } from "~/root";
import { useContext } from "react";
import { UserWithRole } from "~/models/user.server";
import { Link } from "@remix-run/react";
import { FaCheck } from "react-icons/fa";
import DecoratedImage from "../ui/DecoratedImage";

type Props = {
  mentor: UserWithRole
  url: string
}

export default function MentorTemplate({ mentor, url }: Props) {
  const { t } = useContext(GlobalContext);

  return (
    <Link to={url} className="block relative w-full h-full mx-auto rounded-lg border-light-border dark:border-medium-darker shadow-lg border bg-white dark:bg-dark dark:border-medium-darker p-3">
      <div className="relative w-fit mx-auto">
        <img
          src={ mentor.avatar ? "/uploads/" + mentor.avatar : '/images/no-avatar.webp'}
          className="w-32 h-32 mx-auto rounded-lg"
        />
      </div>
      <h3 className="standard-content font-semibold text-center mt-2 text-sm sm:text-md">
        {mentor.firstName} {mentor.lastName}
      </h3>
      <p className="text-center text-xs md:text-sm">
        {t("users.roles." + mentor.role.name.toLowerCase())}
      </p>
    </Link>
  );
}
