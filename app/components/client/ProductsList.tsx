import type { Product } from "@prisma/client"
import { FadeIn } from "./AOM"
import { useContext } from "react"
import { GlobalContext } from "~/root"
import { FaArrowRight } from "react-icons/fa"
import Button from "./Button"

type Props = {
  products: Product[]
}

export default function ProductsList({ products }: Props) {
  const { lang: currentLang, t } = useContext(GlobalContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product, idx) => (
        <div key={idx}>
          <FadeIn delay={idx * 0.1}>
            <>
              <img
                src={"/uploads/" + product.image}
                alt={product.name[currentLang]}
                className="w-full mx-auto rounded-3xl aspect-square max-w-64"
              />
              <h2 className="text-xl font-bold text-center mt-4">
                {product.name[currentLang] || ""}
              </h2>
              <p className="text-gray-600 text-center font-bold text-sm mt-2">
                {t("clients.products.fromProducer")}
              </p>
              <p className="text-gray-600 text-center mt-4">
                {product.price} zł
              </p>
              <Button
                to={"/client/products/" + product.id}
                variant="primary"
                className="mx-auto my-6"
                icon={FaArrowRight}
              >
                {t("clients.products.seeMore")}
              </Button>
            </>
          </FadeIn>
        </div>
      ))}
    </div>
  )
}