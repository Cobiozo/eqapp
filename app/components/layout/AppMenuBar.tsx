import { RoleName } from "@prisma/client";
import { Link, NavLink } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import { BiMoviePlay } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { HiOutlineHome } from "react-icons/hi";
import { IoIosGitNetwork } from "react-icons/io";
import { IoCartOutline, IoMailOutline, IoPeopleOutline, IoSearchSharp } from "react-icons/io5";
import { GlobalContext } from "~/root";

type AppMenuBarLinkProps = {
  url: string;
  label: string;
  icon: ({ className }: { className: string }) => JSX.Element;
  variant?: "external" | "internal";
}
const AppMenuBarLink = ({ url, label, icon, variant = "internal" }: AppMenuBarLinkProps) => {
  if (variant === "internal")
    return (
      <NavLink to={url} className="flex flex-col justify-center items-center my-3 gap-1">
        {({ isActive }) => (
          <>
            {icon({ className: clsx("text-2xl", isActive && "text-primary-lighter") })}
            <span className={clsx("text-sm", isActive && "text-primary-lighter dark:text-medium-dark")}>
              {label}
            </span>
          </>
        )}
      </NavLink>
    );
  else
    return (
      <a href={url} className="flex flex-col justify-center items-center my-2 gap-1">
        {icon({ className: "text-2xl" })}
        <span className="text-sm">
          {label}
        </span>
      </a>
    )
}

export default function AppMenuBar() {
  const { isLogged, t, user } = useContext(GlobalContext);

  if (user && user.role.name === RoleName.CANDIDATE_PARTNER)
    return null;
  if (!isLogged)
    return null;
  return (
    <div className="fixed bottom-0 left-0 w-full z-[90]">
      <nav className="bg-light dark:bg-primary dark:text-light max-w-2xl mx-auto w-full border border-b-0 grid grid-cols-5 dark:border-0">
        <AppMenuBarLink
          url={"/dashboard/"}
          label={t("nav.home")}
          icon={HiOutlineHome}
        />
        <AppMenuBarLink
          url={isLogged ? "/dashboard/webinars/partner" : "/dashboard/webinars/client"}
          label={t("nav.webinars")}
          icon={BiMoviePlay}
        />
        <AppMenuBarLink
          url="/dashboard/products"
          label={t("nav.products")}
          icon={IoSearchSharp}
        />
        { !isLogged && (
          <>
            <AppMenuBarLink
              variant="external"
              url="https://eqology.com/"
              label={t("nav.shop")}
              icon={IoCartOutline}
            />
            <AppMenuBarLink
              url="/dashboard/boards/item/c0b5a2f5-e401-4cd6-9a75-65de55537091"
              label={t("nav.contact")}
              icon={IoMailOutline}
            />
          </>
        )}
        { isLogged && (
          <>
            <AppMenuBarLink
              url="/dashboard/proteges"
              label={t("nav.partners")}
              icon={IoIosGitNetwork}
            />
            <AppMenuBarLink
              url="/dashboard/clients"
              label={t("nav.clients")}
              icon={IoPeopleOutline}
            />
          </>
        )}
      </nav>
    </div>
  )
}