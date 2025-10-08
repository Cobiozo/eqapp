import { FaCheck } from "react-icons/fa";
import type { IconType } from "react-icons";
import clsx from "clsx";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import type { UserWithRole } from "~/models/user.server";

type Props = {
  user: UserWithRole
}

const UserIcon = ({ icon, bg }: { icon: IconType, bg: string }) => {
  const Icon = icon as () => JSX.Element;
  return (
    <div className={clsx(
      "w-4 h-4 p-1 mx-1 flex items-center justify-center rounded-full",
      "text-white", bg
    )}>
      {Icon()}
    </div>
  );
}

const UserIcons = ({ user, className }: { user: UserWithRole, className?: string }) => {
  return (
    <div className={clsx(className)}>
      { user.verified && <UserIcon icon={FaCheck} bg="bg-green-500" /> }
    </div>
  );
};

export default function UserTemplate({ user }: Props) {
  const { t } = useContext(GlobalContext);

  return (
    <div className="flex w-full relative">
      <div className="mx-4 shrink-0">
        <img
          src={ user.avatar ? "/uploads/" + user.avatar : '/images/no-avatar.webp'}
          alt={user.firstName + " " + user.lastName}
          className="w-14 h-14 rounded-lg border-light-border dark:border-medium-darker"
        />
      </div>
      <div>
        <h3 className="font-bold text-md md:text-lg flex flex-col items-start md:flex-row md:items-center">
          {user.firstName} {user.lastName}
          <UserIcons user={user} className="absolute top-1 left-3 md:static" />
        </h3>
        <span className="text-sm">
          {t("users.roles." + user.role.name.toLowerCase())} (eqId: {user.eqId})
          <div>
            <span className="block md:inline">{user.email}</span> <span className="block md:inline">tel. {user.phone}</span>
          </div>
        </span>
      </div>
    </div>
  );
}
