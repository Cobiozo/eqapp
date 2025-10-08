import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import Animated from "./Animated";

type Props = {
  children: React.ReactNode;
  variant?: "default" | "info" | "success" | "warning" | "danger" | "notification";
  className?: string;
  onClose?: () => void;
  autoClose?: boolean;
  delay?: number;
}

export default function Notification({ children, variant = "default", className, onClose, autoClose, delay }: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
      if (autoClose) setShow(false);
    }, delay || 5000);
    return () => clearTimeout(timer);
  }, []);

  const variantClasses = useMemo(() => {
    switch(variant) {
      case "success":
        return "bg-green-500 text-white";
      case "danger":
        return "bg-red-500 text-white";
      case "notification":
        return "bg-green-500 text-white";
      default:
        return "bg-none border-dark text-dark dark:border-medium-darker dark:text-light";
    }
  }, [variant]);

  const VariantIcon = useMemo(() => {
    switch(variant) {
      case "success":
        return FaCheckCircle;
      case "danger":
        return BsExclamationTriangle
      case "notification":
        return IoMdNotificationsOutline
      default:
        return BsExclamationTriangle
    }
  }, [variant]);

  if (!show) return null;
  return (
    <div className="fixed top-24 z-70 left-0 w-full flex justify-center text-sm rounded-3xl">
      <Animated
        animation="fadeInUp"
      >
        <div className={clsx(
          "w-80 border-3 rounded-lg border-current standard-content font-bold p-4 shadow-lg flex items-center justify-center",
          variantClasses,
          className,
        )}>
          <VariantIcon className="text-lg mr-4" />
          {children}
        </div>
      </Animated>
    </div>
  );
};
