import { useContext } from "react";
import { GlobalContext } from "~/root";
import { FaCalendarAlt, FaCheck, FaInfo, FaPlay } from "react-icons/fa";
import Animated from "../ui/Animated";
import Button from "./Button";

type Props = {
  id: string;
  title: string;
  presenter: string;
  startAt: string;
  subscribed: boolean;
}

export default function WebinarSummary({ id, title, presenter, startAt, subscribed }: Props) {
  const { t, isLogged } = useContext(GlobalContext);

  return (
    <article className="border border-gray-400 rounded-2xl max-w-sm p-6 relative">
      <div className="flex gap-4 flex-col items-center">
        <div>
          <div className="text-sm text-gray-400 flex items-center gap-2">
            { new Date(startAt) > new Date() && (
              <>
                <FaCalendarAlt />
                {(new Date(startAt)).toLocaleString()}
              </>
            )}
            { new Date(startAt) < new Date() && (
              <>
                <Animated
                  animation="flash"
                  infinite
                >
                  <div className="bg-red-500 w-4 h-4 rounded-full" />
                </Animated>
                {t("webinars.live")}
              </>
            )}
            { subscribed && (
              <div className="text-green-500 flex items-center gap-2">
                <FaCheck />
                {t("webinars.subscribed")}
              </div>
            )}
          </div>
        </div>
        <header>
          <h2 className="font-black uppercase text-lg tracking-widest pt-2">
            {title}
          </h2>
        </header>
        <div>
          {presenter}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          { subscribed && new Date(startAt) < new Date() && (
            <Button
              icon={FaPlay}
              size="sm"
              variant="primary"
              to={`/client/webinars/play/${id}`}
            >
              {t("webinars.goToWebinar")}
            </Button>
          )}
           { !subscribed && new Date(startAt) < new Date() && (
            <Button
              disabled
              icon={FaPlay}
              size="sm"
              variant="primary"
            >
              {t("webinars.goToWebinar")}
            </Button>
          )}
          { new Date(startAt) > new Date() && (
            <Button
              icon={FaInfo}
              size="sm"
              variant="info"
              to={`/client/webinars/details/${id}`}
            >
              {t("webinars.details")}
            </Button>
          )}
          { !subscribed && !isLogged && new Date(startAt) > new Date() && (
            <Button
              icon={FaCheck}
              size="sm"
              variant="primary"
              to={`/client/webinars/subscribe/${id}`}
            >
              {t("webinars.subscribe")}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
