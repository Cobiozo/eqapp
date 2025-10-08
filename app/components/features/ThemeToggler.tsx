import { useFetcher } from "@remix-run/react";
import { FaMoon } from "react-icons/fa";
import { CgSun } from "react-icons/cg";
import { useContext } from "react";
import { GlobalContext } from "~/root";

export default function ThemeToggler() {
  const fetcher = useFetcher();
  const { theme } = useContext(GlobalContext);

  return (
    <fetcher.Form method="post" action="/action/set-theme" className="mx-1">
      <button type="submit" className="border-2 border-current rounded-full text-xl w-10 h-10 flex justify-center items-center">
        { theme === "light"
          ? <FaMoon  />
          : <CgSun  />
        }
      </button>
    </fetcher.Form>
  )
}
