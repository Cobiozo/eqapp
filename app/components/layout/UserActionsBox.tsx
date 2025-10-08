import clsx from "clsx";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import BoxTitle from "../ui/BoxTitle";
import { GiMagickTrick, GiPartyPopper } from "react-icons/gi";
import { RoleName } from "@prisma/client";
import { UserWithRole } from "~/models/user.server";
import Button from "../ui/Button";
import { IconType } from "react-icons/lib";
import { FaRegSadCry } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";

type Props = {
  protege: UserWithRole;
  className?: string;
}

interface Action {
  name: string;
  icon: IconType;
  url: string;
  show?: boolean;
  variant?: "default" | "danger" | "success" | "warning";
}
export default function UserActionsBox({ protege, className }: Props) {
  const { t, user } = useContext(GlobalContext);
  const loggedUser = user as UserWithRole;

  const actions: Action[] = [
    {
      name: t("proteges.actions.changeMentor"),
      icon: BiTransfer,
      url: "/dashboard/admin/users/" + protege.id + "/change-mentor/list/--none--",
      show: loggedUser.permissions.adminProtegesChangeMentor && protege.id !== loggedUser.id
    },
    {
      name: t("proteges.actions.promoteToLeader"),
      icon: GiPartyPopper,
      url: "/dashboard/admin/users/" + protege.id + "/promote/LEADER",
      show: loggedUser.permissions.adminProtegesPromoteToLEADER && protege.role.name === RoleName.PARTNER
    },
    {
      name: t("proteges.actions.promoteToAdmin"),
      icon: GiPartyPopper,
      url: "/dashboard/admin/users/" + protege.id + "/promote/ADMIN",
      show: loggedUser.permissions.adminProtegesPromoteToADMIN && protege.role.name === RoleName.LEADER
    },
    {
      name: t("proteges.actions.demoteToLeader"),
      icon: FaRegSadCry,
      url: "/dashboard/admin/users/" + protege.id + "/demote/LEADER",
      show: loggedUser.permissions.adminProtegesDemoteToLEADER && protege.role.name === RoleName.ADMIN
    },
    {
      name: t("proteges.actions.demoteToPartner"),
      icon: FaRegSadCry,
      url: "/dashboard/admin/users/" + protege.id + "/demote/PARTNER",
      show: loggedUser.permissions.adminProtegesDemoteToPARTNER && protege.role.name === RoleName.LEADER
    },
  ]

  return (
    <section className={clsx(className)}>
      <BoxTitle className="flex justify-center items-center gap-4">
        <GiMagickTrick className="text-3xl" />
        {t("proteges.actions.title")}
      </BoxTitle>
      <ul className="flex flex-col gap-2 px-2">
        {actions.filter(i => i.show).map((action, index) => (
          <li
            key={index}
          >
            <Button
              to={action.url}
              variant="secondary"
              size="md"
              icon={action.icon}
              className="w-full mt-0 mb-0"
            >
              {action.name}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
