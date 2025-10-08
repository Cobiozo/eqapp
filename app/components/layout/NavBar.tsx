import { useContext, useState } from "react";
import { GlobalContext } from "~/root";
import LoggedUserSummary from "./LoggedUserSummary";
import { FaBars } from "react-icons/fa";
import { NavLink } from "@remix-run/react";
import clsx from "clsx";
import { Icon as IconType } from "@prisma/client";
import Icon from "./Icon";

type Props = {
  isScrolled: boolean;
}

function NavBarUnauthorized({ isScrolled }: Props) {
  const { t } = useContext(GlobalContext);
  const [collapsed, setCollapsed] = useState(true);

  const links = [
    {
      name: t("nav.partnerZone"),
      href: '/dashboard/auth/login',
      icon: IconType.KEY
    },
  ];

  return (
    <nav>
      <a
        className="block cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars className="text-3xl" />
      </a>
      <ul
        className={clsx(
          "font-bold z-10",
          collapsed ? "hidden" : "flex",
          "fixed w-full justify-center left-0 py-5 bg-primary text-light shadow-lg",
          !collapsed && !isScrolled && "top-30",
          !collapsed && isScrolled && "top-16",
        )}
      >
        {links.map((link, index) => (
          <li
            key={index}
            className="text-center py-4 mx-2 flex items-center justify-center gap-2"
            onClick={() => setCollapsed(true)}
          >
            <Icon name={link.icon} className="text-2xl shrink-0" />
            <NavLink to={link.href}>{link.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function NavBarAuthorized () {
  return (
    <LoggedUserSummary
      avatarClassName="block"
      descClassName="hidden lg:block"
    />
  )
}

export default function NavBar({ isScrolled }: Props) {
  const { isLogged } = useContext(GlobalContext);

  if (isLogged)
    return <NavBarAuthorized />
  else
    return <div></div>
}
