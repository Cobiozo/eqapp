import { MdOutlineHealthAndSafety } from "react-icons/md";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FadeInUp, FadeInZoomAndLand } from "~/components/client/AOM";
import Container from "~/components/layout/Container";
import PageHeader from "~/components/client/PageHeader";

export default function Contact() {
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <Container>
        <PageHeader>
          {t("clients.contact.title")}
        </PageHeader>
        <FadeInZoomAndLand>
          <p className="text-center text-gray-400" dangerouslySetInnerHTML={{ __html: t("clients.contact.slogan") }} />
        </FadeInZoomAndLand>  
        <FadeInUp>
          <div className="flex justify-center items-center gap-8 my-32">
            <IoMailUnreadOutline className="text-6xl" />
            <div>
              <p className="text-center text-gray-600 font-bold text-lg">
                {t("clients.contact.sendUsEmail")}
              </p>
              <p className="text-center text-gray-600">
                eqologypoland@gmail.com
              </p>
            </div>
          </div>
        </FadeInUp>
      </Container>
    </section>
  );
}