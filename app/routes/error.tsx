import { Link } from "@remix-run/react";
import { useContext } from "react";
import PageHeader from "~/components/ui/PageHeader";
import PageInfo from "~/components/ui/PageInfo";
import { GlobalContext } from "~/root";

export default function Offline() {
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <PageHeader>
        {t("common.somethingWentWrong")}
      </PageHeader>
      <PageInfo>
        {t("common.somethingWentWrongDescription")}
      </PageInfo>
      <Link to="/" className="link block mx-auto text-center">
        {t("common.goBackToHome")}
      </Link>
    </section>
  );
}
