import { MdOutlineHealthAndSafety } from "react-icons/md";
import Container from "../layout/Container";
import Button from "./Button";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { FadeIn, FadeInUp, FadeInZoomAndLand } from "./AOM";
import { HiOutlineShoppingBag } from "react-icons/hi";
import WysiwygGeneratedContent from "../layout/WysiwygGeneratedContent";
import { TbFileCertificate, TbTruckDelivery } from "react-icons/tb";
import { BsPiggyBank } from "react-icons/bs";
import { FaRegThumbsUp } from "react-icons/fa";

type Props = {
  title: string;
  description?: string;
}
export default function Splash({ title, description }: Props) {
  const { t } = useContext(GlobalContext);

  const benefits: {
    title: string;
    description: string;
    icon?: JSX.Element;
  }[] = [
    { 
      title: t("productCategory.benefits.one.title"),
      description: t("productCategory.benefits.one.description"),
      icon: <TbTruckDelivery />
    },
    { 
      title: t("productCategory.benefits.two.title"),
      description: t("productCategory.benefits.two.description"),
      icon: <BsPiggyBank />
    },
    { 
      title: t("productCategory.benefits.three.title"),
      description: t("productCategory.benefits.three.description"),
      icon: <FaRegThumbsUp />
    },
    { 
      title: t("productCategory.benefits.four.title"),
      description: t("productCategory.benefits.four.description"),
      icon: <TbFileCertificate />
    },
  ];

  return (
    <section>
      <FadeInUp>
        <h1 className="text-xl md:text-4xl lg:text-7xl font-bold text-center my-4 md:mt-10 md:mb-6 max-w-2xl mx-auto">
          {title}
        </h1>
      </FadeInUp>
      <FadeInZoomAndLand>
        <WysiwygGeneratedContent className="font-bitter text-sm md:text-base text-client-brighter" content={description || ""} />
      </FadeInZoomAndLand>  
      <FadeInUp>
        <div className="flex justify-center items-center gap-1 my-4 md:my-16">
          <MdOutlineHealthAndSafety className="text-3xl" />
          <p className="text-center">
            {t("clients.splash.healthProtect")}
          </p>
        </div>
      </FadeInUp>
      <FadeInUp delay={0.5}>
        <Button
          to="/dashboard/products"
          variant="primary"
          size="lg"
          className="mx-auto my-6"
          icon={HiOutlineShoppingBag}
        >
          {t("clients.splash.goToShop")}
        </Button>
      </FadeInUp>
      <FadeIn>
        <img
          src="/images/client/products.webp" alt="products"
          className="w-full rounded-xl my-10"
        />
      </FadeIn>
      <div className="grid grid-cols-4 gap-1 md:gap-5 -mx-2 2xl:-mx-10 my-10 md:my-20">
        {benefits.map((benefit, index) => (
          <FadeInUp key={index} delay={index * 0.2}>
            <div className="flex flex-col gap-2 md:gap-5 h-full md:h-auto">
              <span className="text-xl md:text-3xl dark:text-gold">
                {benefit.icon}
              </span>
              <h4 className="text-[0.7rem] md:text-lg md:uppercase font-semibold dark:text-gradient-gold">
                {benefit.title}
              </h4>
              <div className="mt-auto w-full bg-gradient-to-r from-light-border to-light-back h-0.5 dark:bg-gradient-gold">
                <div className="h-full w-4 md:w-10 bg-client-base-lighter dark:bg-gold" />
              </div>
              <p className="client-base-lighter hidden md:block">
                {benefit.description}
              </p>
            </div>
          </FadeInUp>
        ))}
      </div>
    </section>
  );
}