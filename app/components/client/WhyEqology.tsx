import { useContext } from "react";
import Container from "../layout/Container";
import { GlobalContext } from "~/root";
import SectionHeader from "./SectionHeader";
import { TbWorld } from "react-icons/tb";
import { RiEmotionHappyLine } from "react-icons/ri";
import { FadeInUpAndRotate } from "./AOM";
import { FaRegHeart } from "react-icons/fa";
import Button from "./Button";

export default function WhyEqology() {
  const { t } = useContext(GlobalContext);


  return (
    <section className="my-10">
      <div className="relative bg-[url('/images/client/why-eqology.webp')] bg-cover bg-center bg-no-repeat rounded-3xl p-10">
        <div className="absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 rounded-3xl" />
        <div className="relative z-20">
          <SectionHeader className="text-white [text-shadow:_0_0px_20px_rgb(0_0_0_/_80%)]">
            {t("clients.why.title")}
          </SectionHeader>
          <p className="text-white text-center text-base md:text-lg my-6">
            {t("clients.why.slogan")}
          </p>
          <Button
            size="lg"
            variant="primary"
            to="/dashboard/boards/item/d4c064e5-8de6-482d-b7d2-31ea319f8ca7"
            className="mx-auto my-4"
          >
            {t("clients.why.learnMore")}
          </Button>
        </div>
      </div>
    </section>
  )
}