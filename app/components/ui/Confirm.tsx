import clsx from "clsx";
import { useContext, useMemo } from "react";
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";
import { GlobalContext } from "~/root";
import Button from "./Button";
import Fog from "./Fog";
import { FaCheck } from "react-icons/fa";
import Spinner from "./Spinner";

type Props = {
  title: string;
  variant: "danger" | "success" | "warning" | "info";
  children: React.ReactNode;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
  status?: "idle" | "loading" | "submitting" | "success" | "error";
}

export default function Confirm({ title, variant, children, confirmLabel, onConfirm, onCancel, className, status = "idle" }: Props) {
  const { t } = useContext(GlobalContext);

  const variantClasses = useMemo(() => {
    switch(variant) {
      case "danger":
        return "text-red-400 border-red-400";
      case "success":
        return "text-green-400 border-green-400";
      case "info":
        return "text-blue-400 border-blue-400";
      case "warning":
        return "text-light bg-gradient-to-r from-orange-400 to-orange-700";
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
    <Fog>
      <>
        {/*<div className="bg-[url('/images/back.webp')] bg-cover bg-center opacity-10 w-screen h-screen fixed top-0 left-0" />*/}
        <div className={clsx(
          "bg-light-back z-10 dark:bg-zinc-900 max-w-sm my-10 px-6 py-6 md:px-10 border-4 shadow-xl overflow-hidden relative",
          variantClasses,
          className
        )}>
          <div className="text-left">
            <h2 className="font-bold my-2 text-md md:text-xl flex items-center mb-6">
              <VariantIcon className="text-3xl md:text-5xl opacity-30 mr-4" />
              {title}
            </h2>
            { status === "idle" && (
              <>
                <p className="font-medium">
                  { children }
                </p>
                <div className="flex mt-4">
                  <Button
                    icon={FaCheck}
                    variant={variant}
                    onClick={onConfirm}
                    className="mr-2"
                    size="sm"
                  >
                    {confirmLabel}
                  </Button>
                  <Button
                    variant="secondary"
                    icon={FaTimes}
                    onClick={onCancel}
                    size="sm"
                  >
                    {t("common.cancel")}
                  </Button>
                </div>
              </>
            )}
            { status !== "idle" && (
              <Spinner className="mx-auto block mb-10" />
            )}
          </div>
        </div>
      </>
    </Fog>
  );
}
