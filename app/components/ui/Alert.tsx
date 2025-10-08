import clsx from "clsx";
import { useMemo } from "react";
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

type Props = {
  children: React.ReactNode;
  title: string;
  variant: "danger" | "success" | "warning" | "info";
  className?: string;
}

export default function Alert({
  children,
  title,
  variant,
  className
}: Props) {

  const variantClasses = useMemo(() => {
    switch(variant) {
      case "danger":
        return "text-red-400 border-red-400";
      case "success":
        return "text-green-400 border-green-400";
      case "info":
        return "text-blue-400 border-blue-400";
      case "warning":
        return "text-orange-400 border-orange-400";
      default:
        return ""
    }
  }, [variant]);

  const VariantIcon = useMemo(() => {
    switch(variant) {
      case "danger":
        return FaExclamationTriangle
      case "success":
        return FaCheckCircle
      case "info":
        return FaInfoCircle
      case "warning":
        return FaExclamationCircle
      default:
        return FaExclamationTriangle
    }
  }, [variant]);

  return (
    <div className={clsx(
      "bg-white dark:bg-dark rounded-lg max-w-lg my-6 px-4 py-4 md:px-6 border-2 overflow-hidden relative",
      variantClasses,
      className
    )}>
      <div className="text-left">
        <h2 className="font-semibold my-2 text-lg md:text-xl flex items-center mb-4">
          <VariantIcon className="text-3xl md:text-3xl opacity-30 mr-4" />
          {title}
        </h2>
        <p className="font-medium text-sm">
          { children }
        </p>
      </div>
    </div>
  );
}
