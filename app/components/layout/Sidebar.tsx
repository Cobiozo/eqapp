import { BoardColor, SupportedLanguage} from "@prisma/client";
import { Icon as IconType, RoleName} from "@prisma/client";
import { PermissionName } from "@prisma/client"
import { Link, NavLink, useLocation, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { useContext, useState } from "react";
import { GlobalContext } from "~/root";
import { FaBars } from "react-icons/fa";
import LoggedUserSummary from "./LoggedUserSummary";
import useScroll from "~/utils/hooks/useScroll";
import Icon from "./Icon";

interface Link {
  name: string;
  url: string;
  icon: ({ className }: { className: string }) => JSX.Element;
  permission?: string | (() => boolean);
  subLinks: Link[];
}

function SubMenu({ links, setIsCollapsed }: { links: Link[], setIsCollapsed: (value: boolean) => void }) {
  return (
    <ul className="text-xs border-b border-medium-dark">
      {links.map((link, index) => (
        <li
          key={index}
        >
          <NavLink
            to={link.url}
            onClick={() => setIsCollapsed(true)}
          >
            {({ isActive }) => (
              <div
                className={clsx(
                  "p-4 px-8 flex items-center gap-4 border-b border-dark",
                  isActive && "bg-medium-dark dark:bg-zinc-900"
                )}
              >
                { link.icon && <link.icon className="text-xl" /> }
                {link.name}
              </div>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

type Props = {
  links: {
    name: Record<SupportedLanguage, string>;
    url: string;
    icon: IconType;
    color: BoardColor;
  },
  shopUrl: string;
}

export default function Sidebar({ links: sidebarLinks, shopUrl }: Props) {

  const { t, isLogged, user, lang: currentLang } = useContext(GlobalContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const isScrolled = useScroll();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const [searchParams] = useSearchParams();
  
  const links: Link[] = [
    ...sidebarLinks.map(link => ({
      ...link,
      url: link.url.includes("https://eqology.com") ? shopUrl : link.url,
    })
    )
  ];

  // if admin access, add admin link
  if (user?.permissions[PermissionName.adminPanelAccess]) {
    links.unshift({
      name: t("nav.admin"),
      url: "/dashboard/admin",
      icon: IconType.CROWN,
      color: BoardColor.GREEN,
    });
  }

  // if user is candidate partner, return null
  // he should focus on quiz
  if (user?.role.name === RoleName.CANDIDATE_PARTNER)
    return null;

  const getColorClassName = (color: BoardColor) => {
    if ([BoardColor.GREEN, BoardColor.RED, BoardColor.ORANGE].includes(color))
      return "font-bold";
    else
      return "";
  }

  // built-in isActive ignores searchParams
  // therefore /workshops?showOnlyLiveWorkshops are treated the same as /workshops
  // and we often have two links highlighted
  // this function wraps isActive to check this special case
  const isReallyActive = (isActive: boolean, url: string) => {
    
    if (url.includes("/dashboard/webinars/partner") && location.pathname.includes("/dashboard/webinars/partner")) {
      const showOnlyLiveWorkshops = searchParams.get("showOnlyLiveWorkshops");
      if (url === "/dashboard/webinars/partner" && !showOnlyLiveWorkshops)
        return true;
      if (url === "/dashboard/webinars/partner?showOnlyLiveWorkshops=true" && showOnlyLiveWorkshops)
        return true;
      return false;
    }
    if (isActive)
      return true;
    return false;
  }

  return (
    <>
      <div
        className={clsx(
          "fixed z-[300] top-0 left-0 max-w-64 overflow-x-hidden overflow-y-auto",
          isLogged && "3xl:w-64 3xl:h-full 3xl:py-30 3xl:bg-light 3xl:dark:bg-dark 3xl:border-r 3xl:border-light-border dark:border-medium-darker",
          isCollapsed && "h-24 w-16",
          !isCollapsed && "h-full w-full bg-light pb-10 pt-20 dark:bg-dark border-r border-light-border dark:border-medium-darker",
        )}>
        <nav className="h-full">
          <button
            className={clsx(
              "focus:outline-none flex items-center gap-2 cursor-pointer absolute left-6 text-3xl",
              isLogged && "3xl:hidden",
              isScrolled && isCollapsed && "top-6",
              isScrolled && isCollapsed && !isAdmin && isLogged && "text-light",
              isScrolled && isCollapsed && !isAdmin && !isLogged && "text-dark bg-light rounded-lg p-2 -m-2 dark:bg-dark-lighter dark:text-light",
              isScrolled && isCollapsed && isAdmin && " text-dark",
              !isScrolled && isCollapsed && isLogged  && "top-12 2xs:top-16",
              !isScrolled && isCollapsed && !isLogged && "top-6",
              !isScrolled && isCollapsed && !isAdmin && isLogged  && "top-12 2xs:top-16 text-light",
              !isScrolled && isCollapsed && !isAdmin && !isLogged && "top-12 2xs:top-16",
              !isScrolled && isCollapsed && isAdmin && "top-12 2xs:top-16 text-dark",
              !isCollapsed && "top-6"
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FaBars />
          </button>
          { isLogged && (
            <LoggedUserSummary
              className={clsx(
                !isCollapsed && "block absolute top-10 right-8 md:hidden",
                isCollapsed && "hidden"
              )}
              descClassName="hidden"
            />
          )}
          <div className="flex flex-col justify-between h-full">
            <ul
              className={clsx(
                "h-full flex flex-col",
                isCollapsed && isLogged && "hidden 3xl:block",
                isCollapsed && !isLogged && "hidden"
              )}
            >
              {links.map(link => (
                <li key={link.url}>
                  {link.url.includes("http") && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-3 flex items-center gap-4 text-sm"
                    >
                      { link.icon && <Icon name={link.icon} className="text-xl shrink-0" /> }
                      <div>
                        {typeof link.name === "string" ? link.name : (link.name[currentLang] || "")}
                      </div>
                    </a>
                  )}
                  { !link.url.includes("http") && (
                    <NavLink
                      onClick={() => setIsCollapsed(true)}
                      end={link.url === "/dashboard"}
                      to={link.url}
                    >
                      {({ isActive }) => (
                        <div>
                          <div
                            className={clsx(
                              "px-4 py-3 flex items-center gap-4 text-sm w-fit",
                              isReallyActive(isActive, link.url) && "text-primary-lighter dark:text-gold",
                              getColorClassName(link.color)
                            )}
                          >
                            { link.icon && <Icon name={link.icon} className="text-xl shrink-0" /> }
                            <div>
                              {typeof link.name === "string" ? link.name : (link.name[currentLang] || "")}
                            </div>
                          </div>
                          {isReallyActive(isActive, link.url) && link.subLinks && <SubMenu setIsCollapsed={setIsCollapsed} links={link.subLinks} />}
                        </div>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
              { !isLogged && (
                <li className="mt-auto">
                  <Link
                    to="/dashboard/auth/login"
                    className="border-primary-lighter rounded-3xl border text-primary-lighter w-fit mx-auto block my-4 dark:text-gradient-gold dark:border-gold"
                    onClick={() => setIsCollapsed(true)}
                  >
                    <div>
                      <div className="px-4 py-3 flex items-center gap-2 text-sm w-fit">
                        <Icon name="LAPTOP" className="text-xl shrink-0 dark:text-gold" />
                        <div>
                          {t("nav.partnerZone")}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {/*<div 
            className={clsx(
              "absolute left-0 bottom-0 my-10 opacity-20 pointer-events-none",
              isCollapsed && "hidden 3xl:block"
            )}
          >
            <span className="absolute text-light bottom-0 left-40 w-5 text-4xl font-black break-words opacity-20 text-center">
              {t("nav.slogans.togetherness")}
            </span>
            <span className="absolute text-light bottom-0 left-26 w-5 text-4xl font-black break-words opacity-20 text-center">
              {t("nav.slogans.passion")}
            </span>
            <span className="absolute text-light bottom-0 left-10 w-5 text-4xl font-black break-words opacity-20 text-center">
              {t("nav.slogans.spirit")}
            </span>
          </div>*/}
        </nav>
      </div>
      { !isCollapsed && (
        <div
          className="fixed z-[290] top-0 left-0 w-screen h-screen bg-light-back dark:bg-zinc-900 opacity-50 3xl:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  )
}