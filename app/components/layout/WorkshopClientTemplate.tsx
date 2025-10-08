import { useContext } from "react";
import type { Icon as IconType } from "@prisma/client"
import { GlobalContext } from "~/root";
import Button from "../ui/Button";
import { Link } from "@remix-run/react";
import { BsArrowRight } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import generateYTPosterImg from "~/utils/generateYTPosterImg";

type Props = {
  id: string;
  name: string;
  url: string;
  done: boolean;
  poster: string;
  icon?: IconType;
}

export default function WorkshopClientTemplate({ id, name, url, done, icon, poster }: Props) {  
  const { t } = useContext(GlobalContext);

  return (
    <article className="rounded-lg overflow-hidden border-2 border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker w-full mx-auto my-1 md:my-0 relative">
      <div className="relative">
        <img
          src={ poster ? "/uploads/" + poster : generateYTPosterImg(url)}
          alt={name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="relative z-10 overflow-hidden items-center justify-between">
        <h2 className="font-semibold px-4 pt-2 md:pt-4 md:pb-0 flex items-center gap-2 text-sm md:text-md shrink">
          {name}
        </h2>
        <Link
          to={`/dashboard/webinars/client/watch/${id}`}
          className="w-fit mx-4 my-4 block shrink-0"
        >
          <Button icon={BsArrowRight} size="sm" className="my-0">
            {t("common.watch")}
          </Button>
        </Link>
      </div>
      { done && <FaCheck className="absolute top-2 left-4 md:right-4 md:bottom-auto md:left-auto text-green-500 opacity-20 text-6xl" /> }
    </article>
  );
}
