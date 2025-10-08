import type { LoaderFunction } from "@remix-run/node";
import { useContext } from "react";
import { FaAward, FaHeart, FaReadme, FaRegHeart, FaStar } from "react-icons/fa";
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
import { Post } from "@prisma/client";
import { postModel } from "~/models/post.server";


export default function CookiesPage() {
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <Container>
        <PageHeader>
          {t("clients.cookies.title")}
        </PageHeader>
        <div className="my-20 [&>p]:my-3 [&>h2]:font-bold [&>h2]:text-lg [&>h2]:mt-6" dangerouslySetInnerHTML={{ __html: t("clients.cookies.content") }}></div>
      </Container>
    </section>
  )
}

        