import PageHeader from "~/components/ui/PageHeader";
import PageInfo from "~/components/ui/PageInfo";
import { GlobalContext } from "~/root";
import { useContext } from "react";

export default function NotFound() {
  const { t } = useContext(GlobalContext);
  return (
    <section>
        <PageHeader>
          {t("workInProgress.title")}
        </PageHeader>
        <PageInfo>
          {t("workInProgress.description")}
        </PageInfo>
      </section>
  );
}
