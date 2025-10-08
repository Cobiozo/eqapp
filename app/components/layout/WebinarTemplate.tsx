import { WebinarVariant } from "@prisma/client";
import clsx from "clsx";
import { FiSend, FiShoppingCart } from "react-icons/fi";
import { IoBriefcaseOutline } from "react-icons/io5";
import Animated from "../ui/Animated";
import { GlobalContext } from "~/root";
import { useContext } from "react";

type Props = {
  title: string;
  presenter: string;
  startAt: Date;
  variant: WebinarVariant;
  expired: boolean;
}

export default function WebinarTemplate({ title,  expired, presenter, startAt, variant }: Props) {
  const { t } = useContext(GlobalContext);

  const Icon = () => {
    const classNamesBase = "relative shrink-0 border-3 border-current rounded-full w-14 h-14 text-2xl flex justify-center items-center";
    
    switch(variant) {
      case WebinarVariant.CLIENT:
        return (
          <div className={clsx(classNamesBase, "text-green-500")}>
            <FiShoppingCart />
          </div>
        )
      case WebinarVariant.BUSINESS:
        return (
          <div className={clsx(classNamesBase, "text-purple-500")}>
            <IoBriefcaseOutline />
          </div>
        )
      case WebinarVariant.INVITED:
        return (
          <div className={clsx(classNamesBase, "text-blue-500")}>
            <FiSend />
          </div>
        )
      default:
        return null;
    }
  }

  return (
    <div className="py-4 gap-4 flex items-center justify-start ">
      <Icon />
      <div>
        { new Date(startAt) < new Date() && !expired && (
          <div className="flex items-center gap-2">
            <Animated
              animation="flash"
              infinite
            >
              <div className="bg-red-500 w-4 h-4 rounded-full" />
            </Animated>
            {t("webinars.live")}
          </div>
        )}
        <h3 className="flex items-center gap-2 font-bold text-md md:text-lg">
          {title}
        </h3>
        <span className="text-sm block  ">
          {presenter}
        </span>
        <span className="text-sm">
          {(new Date(startAt)).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
