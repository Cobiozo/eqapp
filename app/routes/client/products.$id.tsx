import { redirect, type LoaderFunction } from "@remix-run/node";
import { useContext } from "react";
import { FaAward, FaHeart, FaRegHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FadeIn, FadeInLeft, FadeInRight, FadeInUp, FadeInZoomAndLand, InfinitePulse } from "~/components/client/AOM";
import Button from "~/components/client/Button";
import PageHeader from "~/components/client/PageHeader";
import Container from "~/components/layout/Container";
import SectionHeader from "~/components/client/SectionHeader";
import { Product, productModel } from "~/models/product.server";
import { GlobalContext } from "~/root";
import clientService from "~/utils/services/client.server";
import { userModel } from "~/models/user.server";
import { Link, useLoaderData } from "@remix-run/react";
import ProductsList from "~/components/client/ProductsList";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";

type Loader = Product & {
  url: string;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const adminId = "ac0d94b7-2ba0-4350-a45a-f782d75fa43a";

  // try to find the product
  const product = await productModel.getById(params.id as string);
  if (!product)
    return redirect("/client/products");

  // determine user mentorId
  // try to get it from client data
  const clientData = await clientService.getClientData(request);
  let mentorId = clientData?.mentorId;

  // if mentor id doesn't exists
  // set admin as mentor
  if (!mentorId) {
    mentorId = adminId;
  } else {

    // check if mentor is real user
    // if not, remove client and go away
    if (!await userModel.exists({ id: mentorId })) {
      return await clientService.removeClient();
    }
  }

  // try to get userProduct (we need to get ref link)
  const userProduct = await userModel.getUserProduct(mentorId, params.id as string);
  let refLink = "";

  // if this user doesn't have ref link
  // get admin one
  // if user has one, use it
  if (!userProduct) {
    const adminProduct = await userModel.getUserProduct(adminId, params.id as string);
    if (adminProduct)
      refLink = adminProduct.url;
  } else {
    refLink = userProduct.url;
  }

  return {
    ...product,
    url: refLink || ""
  }

}

export default function ProductPage() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const product = useLoaderData<Loader>();

  return (
    <section>
      <Container>
        <PageHeader>
          {product.name[currentLang] || ""}
        </PageHeader>
        <FadeInZoomAndLand>
          <p className="text-center text-gray-400 -mt-10 text-2xl mb-20">
            {t("clients.products.fromProducer")}
          </p>
        </FadeInZoomAndLand>
        <FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
            <img src={"/uploads/" + product.image} alt={product.name[currentLang] || ""} className="w-full mx-auto rounded-3xl aspect-square" />
            <div>
              <WysiwygGeneratedContent content={product.description[currentLang] || ""} />
              <a href={product.url} className="block w-fit mx-auto">
                <Button
                  variant="primary"
                  className="mx-auto my-6"
                  icon={FaShoppingCart}
                >
                  {t("clients.products.buyNow")}
                </Button>
              </a>
            </div>
          </div>
        </FadeInUp>
      </Container>
    </section>
  )
}
