import PageHeader from "~/components/ui/PageHeader";
import PageInfo from "~/components/ui/PageInfo";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import { Link } from "@remix-run/react";

export default function NotFound() {
  const { t } = useContext(GlobalContext);
  return (
    <section className="mt-20">
      <PageHeader>
        {t("unauthorized.title")}
      </PageHeader>
      <PageInfo>
        {t("unauthorized.description")}
      </PageInfo>
      <Link to="/" className="link block mx-auto text-center">
        {t("common.goBackToHome")}
      </Link>
    </section>
  );
}
