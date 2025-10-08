import { FaArrowRight, FaAward, FaHeart, FaMap, FaStar } from "react-icons/fa";
import Container from "../layout/Container";
import SectionHeader from "./SectionHeader";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import Button from "./Button";
import { FadeIn, FadeInLeft, InfinitePulse } from "./AOM";

export default function MeetUs() {
  const { t } = useContext(GlobalContext);

  return (
    <section className="my-10">
      <Container>
        <SectionHeader>
          {t("clients.meetUs.title")}
        </SectionHeader>
        <p className="text-center text-gray-600 mt-4 mb-10">
          {t("clients.meetUs.slogan")}
        </p>
        <div className="bg-[url('/images/client/estera-kamil.png')] bg-cover bg-top bg-no-repeat rounded-3xl p-10 py-20">
          <div
            className="text-white text-center text-2xl [text-shadow:_0_0px_5px_rgb(0_0_0_/_50%)] [&>p]:mt-4"
            dangerouslySetInnerHTML={{ __html: t("clients.meetUs.description") }}
          />
          <Button
            to="/client/about-us"
            variant="primary"
            size="lg"
            className="mx-auto my-6"
            icon={FaArrowRight}
          >
             {t("clients.meetUs.link")}
          </Button>
        </div>
        <section className="grid grid-cols-1 my-20 md:grid-cols-2 gap-6">
          <FadeInLeft>
            <img className="w-full rounded-3xl" src="/images/client/marriage.png" alt="Marriage" />
          </FadeInLeft>
          <div>
            <FadeIn>
              <>
                <p className="text-xl italic p-10 mx-auto max-w-lg">
                  {t("clients.meetUs.marriageContent")}
                </p>
                <div className="flex flex-col mt-4 ml-auto w-fit">
                  <span>{t("clients.meetUs.signature")}</span>
                  <span className="text-sm text-gray-600">{t("clients.meetUs.signatureDesc")}</span>
                </div>
              </>
            </FadeIn>
          </div>
        </section>
      </Container>
    </section>
  )
}