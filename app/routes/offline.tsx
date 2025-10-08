import { useContext } from "react";
import { RiWifiOffLine } from "react-icons/ri";
import PageHeader from "~/components/ui/PageHeader";
import PageInfo from "~/components/ui/PageInfo";
import { GlobalContext } from "~/root";

export default function Offline() {
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <RiWifiOffLine className="text-dark text-6xl mx-auto block"/>
      <PageHeader>
        {t("common.noInternet")}
      </PageHeader>
      <PageInfo>
        {t("common.noInternetDescription")}
      </PageInfo>
    </section>
  );
}
