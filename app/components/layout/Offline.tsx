import clsx from "clsx";
import { useContext } from "react";
import { RiWifiOffLine } from "react-icons/ri";
import { GlobalContext } from "~/root";
import PageHeader from "../ui/PageHeader";

type Props = {
  className?: string;
};

export default function Offline({ className }: Props) {
  const { t } = useContext(GlobalContext);

  return (
    <div className={clsx(className, "fixed z-40 bg-light top-0 left-0 w-full h-full flex items-center justify-center")}>
      <div>
        <RiWifiOffLine className="text-dark text-6xl mx-auto block"/>
        <PageHeader>
          {t("offline.title")}
        </PageHeader>
        <p className="standard-content text-center">
          {t("offline.description")}
        </p>
      </div>
    </div>
  );
}
