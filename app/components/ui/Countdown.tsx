import { useContext } from "react";
import { GlobalContext } from "~/root";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Button from "./Button";
import { FaPlay } from "react-icons/fa";

type Props = {
  webinarId: string;
  date: string;
  url: string;
  variant: "partner" | "client";
  isExternal: boolean;
  className?: string;
  subscribed?: boolean;
  usr?: string;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function ValueSlot ({ value, pad, title }: { value: number, pad?: boolean, title: string }) {
  const preparedValue = pad ? value.toString().padStart(2, "0") : value;

  return (
    <div className="w-16 h-16 flex flex-col justify-center items-center border-2 bg-white text-primary-lighter rounded-lg border-primary-lighter md:w-20 md:h-20 dark:border-medium-darker dark:bg-dark">
      {preparedValue}
      <div className="text-xs standard-content font-normal md:text-sm">{title}</div>
    </div>
  );
}

export default function Countdown({ webinarId, usr, isExternal, variant, subscribed, date, url, className }: Props) {
  const { t } = useContext(GlobalContext);
  const calculateTimeLeft = () => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = null

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    <div className={clsx("text-medium-dark py-6 flex gap-1 items-center text-2xl font-bold md:text-4xl md:gap-2", className)}>
      {timeLeft ? (
        <>
          <ValueSlot value={timeLeft.days} title={t("common.days")}/>
          <span>:</span>
          <ValueSlot value={timeLeft.hours} title={t("common.hours")} pad />
          <span>:</span>
          <ValueSlot value={timeLeft.minutes} title={t("common.minutes")} pad />
          <span>:</span>
          <ValueSlot value={timeLeft.seconds} title={t("common.seconds")} pad />
        </>
      ) : (
        <div>
          <p className="text-2xl font-bold">
            {t("common.ready")}
          </p>
          { (usr || subscribed) && (
            isExternal ? (
              <Button
                to={"/dashboard/webinars/" + variant + "/play/" + webinarId + (usr && usr !== "null" ? "?usr=" + usr : "")}
                variant="primary"
                icon={FaPlay}
                size="sm"
                className="mx-auto my-4"
              >
                {t("webinars.goToWebinar")}
              </Button>
            ) : (
              <a href={url + "&skipPlatformChoice=1"}>
                <Button
                  variant="primary"
                  icon={FaPlay}
                  size="sm"
                  className="mx-auto my-4"
                >
                  {t("webinars.goToWebinar")}
                </Button>
              </a>
            )
          )}
        </div>
      )}
    </div>
  );
}
