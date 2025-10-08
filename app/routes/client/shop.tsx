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
        <div className="my-20">
          <ProductsList products={products} />
        </div>
      </Container>
    </section>
  )
}
