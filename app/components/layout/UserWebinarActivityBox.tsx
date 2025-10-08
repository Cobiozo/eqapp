import type { User, Webinar } from "@prisma/client";
import clsx from "clsx";
import { useContext } from "react";
import { AiOutlineCalendar, AiOutlineUnorderedList } from "react-icons/ai";
import { FaCheck, FaPencilAlt } from "react-icons/fa";
import { GlobalContext } from "~/root";
import BoxTitle from "../ui/BoxTitle";
import Button from "../ui/Button";
import { BiMoviePlay } from "react-icons/bi";

type Props = {
  userId: User["id"];
  webinars: (Webinar & { attended: boolean } & { time: number })[];
  className: string,
  collection?: string;
}

enum WebinarActivity {
  SUBSCRIPTION,
  PRESENCE,
  OMIT,
  QUESTION
}

function ActivityIcon ({ type }: { type: WebinarActivity }) {
  const classNamesBase = "relative shrink-0 text-2xl border-3 border-current rounded-full w-12 h-12 flex justify-center items-center";
  switch (type) {
    case WebinarActivity.SUBSCRIPTION:
      return (
        <div className={clsx(classNamesBase, "text-blue-500")}>
          <FaPencilAlt />
        </div>
      );
    case WebinarActivity.PRESENCE:
      return (
        <div className={clsx(classNamesBase, "text-green-500")}>
          <BiMoviePlay />
        </div>
      );
    default:
      return null;
  }
}


export function WebinarItem({ title, attended, startAt, time }: Webinar & { attended: boolean } & { time: number }) {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const date = new Date(startAt).toLocaleDateString();

  const determineType = (): WebinarActivity => {
    if (attended) return WebinarActivity.PRESENCE;
    return WebinarActivity.SUBSCRIPTION;
  }

  const type = determineType();

  return (
    <div className="flex items-center gap-4 text-sm bg-white border-light-border dark:border-medium-darker dark:bg-dark border dark:border-medium-darker mb-2 px-4 py-2 rounded-lg max-w-sm mx-auto">
      <ActivityIcon type={type}/>
      <div>
        <div className="flex items-center text-xs mb-2 font-semibold relative z-10">
          <AiOutlineCalendar className="text-md" />
          <span className="ml-1">{date}</span>
          { type === WebinarActivity.PRESENCE && (<FaCheck className="text-green-500 ml-1 text-sm" />) }
        </div>
        <h2 className="font-bold mb-1">
          {title[currentLang] || ""}
        </h2>
        <span>
          {t("proteges.activity.webinarActivityTypes." + type)}
          { type === WebinarActivity.PRESENCE && ` (${time} min)` }
        </span>
      </div>
    </div>
  );
}


export default function UserWebinarActivityBox({ webinars, userId, className, collection = "proteges" }: Props) {
  const { t } = useContext(GlobalContext);

  return (
    <section className={clsx(className)}>
      <BoxTitle className="flex justify-center items-center gap-4">
        <BiMoviePlay className="text-3xl" />
        <span className="w-min">{t("proteges.activity.webinarActivity")}</span>
      </BoxTitle>
      { webinars.length > 0 && (
        <>
          <ul>
            {webinars.map((webinar, index) => (
              <li key={index}>
                <WebinarItem key={index} {...webinar} />
              </li>
            ))}
          </ul>
          <Button
            className="my-10 mx-auto"
            size="sm"
            icon={AiOutlineUnorderedList}
            to={`/dashboard/${collection}/${userId}/webinars`}
          >
            {t("proteges.activity.seeMore")}
          </Button>
        </>
      )}
      { !webinars.length && (
        <p className="text-center text-sm">
          {t("proteges.activity.noActivity")}
        </p>
      )}
    </section>
  );
}
