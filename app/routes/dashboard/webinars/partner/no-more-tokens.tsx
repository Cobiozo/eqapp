import { useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import { GlobalContext } from "~/root";

export default function NoMoreTokens() {
  const { t } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();

  return (
    <section>
      <AdminPageHeader returnLink={"/dashboard/webinars/partner?showOnlyLiveWorkshops=" + searchParams.get("showOnlyLiveWorkshops")}>
        {t(`webinars.noMoreTokens`)}
      </AdminPageHeader>
      <p className="text-center mt-8">
        {t(`webinars.noMoreTokensDesc`)}
      </p>
      <Button
        icon={FaArrowLeft}
        to="/dashboard/webinars/partner"
        className="mx-auto block mt-8"
        variant="secondary"
      >
        {t(`common.goBack`)}
      </Button>
    </section>
  )
}