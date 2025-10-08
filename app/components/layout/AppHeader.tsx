import NavBar from "./NavBar";
import clsx from "clsx";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import Container from "./Container";
import { Link, useLocation } from "@remix-run/react";
import QuickSettingsBox from "./QuickSettingsBox";
import useScroll from "~/utils/hooks/useScroll";

export default function AppHeader() {
  const { isLogged } = useContext(GlobalContext);
  const isScrolled = useScroll();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");

  return (
    <>
      <header
        className={clsx(
          "select-none z-50",
          isAdmin && "bg-gradient-gold text-dark",
          !isAdmin && isLogged && "bg-primary text-light",
          !isAdmin && !isLogged && "text-dark",
          !isScrolled && "relative",
          isScrolled && isLogged && "fixed top-0 left-0 w-full py-2",
          isScrolled && isLogged && "dark:shadow-lg dark:border-none",
          !isLogged && "dark:text-light"
        )}
      >
        <Container>
          <div
            className={clsx(
              "grid grid-cols-3 justify-between items-center",
              isScrolled && isLogged && "-my-6",
            )}
          >
            <NavBar
              isScrolled={isScrolled}
            />
            <div className="shrink-0">
              <Link to="/">
                <img
                  src={isAdmin || !isLogged ? "/images/logo.webp" : "/images/logo-dark-v2.webp"}
                  alt="Logo"
                  className={clsx(
                    "block mx-auto transition",
                    isScrolled && isLogged ? "w-24" : "min-w-30",
                    !isLogged && "dark:hidden"
                  )}
                />
                <img
                  src={"/images/logo-dark.webp"}
                  alt="Logo"
                  className={clsx(
                    !isLogged && "hidden dark:block min-w-30 mx-auto",
                    isLogged && "hidden dark:hidden"
                  )}
                />
              </Link>
            </div>
            <QuickSettingsBox
              className="justify-end items-center relative z-10 flex"
            />
          </div>
        </Container>
      </header>
      {isScrolled && isLogged && (
        <div className="h-40 sm:h-52" />
      )}
    </>
  );
}
