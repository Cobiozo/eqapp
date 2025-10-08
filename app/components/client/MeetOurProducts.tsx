import { FaArrowRight, FaAward, FaHeart, FaMap, FaStar } from "react-icons/fa";
import Container from "../layout/Container";
import SectionHeader from "./SectionHeader";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import Button from "./Button";
import { FadeInUp, InfinitePulse } from "./AOM";
import { ProductCategory } from "@prisma/client";

type Props = {
  products: ProductCategory[]
}
export default function MeetOurProducts({ products }: Props) {
  const { t, lang: currentLang } = useContext(GlobalContext);

  return (
    <section>
      <h2 className="font-bold text-lg md:text-2xl mx-1 my-4">
        {t("clients.products.theChoiceIsYours")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {products.map((product, index) => (
          <FadeInUp key={index} delay={index * 0.2}>
            <div key={product.id} className="flex flex-col items-start">
              <img src={"/uploads/"+product.image} alt={product.name[currentLang]} className="w-full aspect-square object-cover rounded-lg" />
              <h2 className="text-center text-xs md:text-sm text-semibold pt-4 pb-2">{product.name[currentLang] || ""}</h2>
              <h3 className="uppercase my-0 text-base md:text-xl">
                {t("clients.products.fromProducer")}
              </h3>
              <h3 className="text-sm md:text-base uppercase mt-2 md:my-0">
                {t("clients.products.deliveryInTwoDays")}
              </h3>
              <Button
                size="lg"
                to={`/dashboard/products/${product.id}`}
                className="mx-auto my-4"
              >
                {t("clients.products.shop")}
              </Button>
            </div>
          </FadeInUp>
        ))}
      </div>
    </section>
  )
}