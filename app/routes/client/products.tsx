import type { LoaderFunction } from "@remix-run/node";
import { useContext } from "react";
import { FaAward, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FadeIn, FadeInLeft, FadeInRight, FadeInUp, InfinitePulse } from "~/components/client/AOM";
import Button from "~/components/client/Button";
import PageHeader from "~/components/client/PageHeader";
import Container from "~/components/layout/Container";
import SectionHeader from "~/components/client/SectionHeader";
import { Product, productModel } from "~/models/product.server";
import { GlobalContext } from "~/root";
import clientService from "~/utils/services/client.server";
import { userModel } from "~/models/user.server";
import { useLoaderData } from "@remix-run/react";
import ProductsList from "~/components/client/ProductsList";

type Loader = {
  products: Product[]
}
export const loader: LoaderFunction = async ({ request }) => {
  
  // determine user mentorId
  // try to get it from client data
  /*const clientData = await clientService.getClientData(request);
  let mentorId = clientData?.mentorId;

  // if mentor id doesn't exists
  // set admin as mentor
  if (!mentorId) {
    const adminId = "ac0d94b7-2ba0-4350-a45a-f782d75fa43a";
    mentorId = adminId;
  }

  // try to get userProducts
  const userProducts = await userModel.getUserProducts(mentorId);

  // enhance products with userProducts urls
  const enhancedProducts = products.map(product => {
    const userProduct = userProducts.find(up => up.productId === product.id);
    if (userProduct)
      product.price = userProduct.price;
    return product;
  });*/

  return await productModel.getAll();

}

export default function Products() {
  const { t } = useContext(GlobalContext);
  const products = useLoaderData<Loader>();

  return (
    <section>
      <Container>
        <PageHeader>
          {t("clients.products.title")}
        </PageHeader>
        <div className="mt-10 bg-[url('/images/client/products.webp')] pt-80 pb-10 bg-cover bg-center bg-no-repeat rounded-3xl p-10">
          <FadeInUp>
            <div
              className="text-white [text-shadow:_0_0px_20px_rgb(0_0_0_/_80%)] text-3xl text-center -mt-6 [&>strong]:ml-2"
              dangerouslySetInnerHTML={{ __html: t("clients.products.slogan") }}
            />
          </FadeInUp>
        </div>
        <SectionHeader className="mt-20">
          {t("clients.products.idealFor")}
        </SectionHeader>
        <div className="text-center my-20">
          <FadeInLeft delay={0.8}>
            <h4 className="text-gray-600 text-xl my-10">
              {t("clients.products.clients.professionals")}
            </h4>
          </FadeInLeft>
          <FadeInRight delay={1.6}>
            <h4 className="text-gray-600 text-2xl my-10">
              {t("clients.products.clients.athletes")}
            </h4>
          </FadeInRight>
          <FadeInLeft delay={2.4}>
            <h4 className="text-gray-600 text-3xl my-10">
              {t("clients.products.clients.you")}
            </h4>
          </FadeInLeft>
          <FadeInUp delay={3.2}>
            <h4 className="text-gray-600 text-4xl mt-20 mb-6" dangerouslySetInnerHTML={{ __html: t("clients.products.reason") }} />
          </FadeInUp>
        </div>
        <InfinitePulse delay={3.6}>
          <FaRegHeart className="text-6xl block mx-auto text-red-500" />
        </InfinitePulse>
        <div className="my-20">
          <SectionHeader>
            {t("clients.products.ourProducts")}
          </SectionHeader>  
          <ProductsList products={products} />
        </div>
      </Container>
    </section>
  )
}
