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

type Loader = Post[];

export const loader: LoaderFunction = async ({ request }) => {
  return await postModel.getAll();
}

export default function PostsPage() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const posts = useLoaderData<Loader>();

  return (
    <section>
      <Container>
        <PageHeader>
          {t("clients.posts.title")}
        </PageHeader>
        <div className="my-20">
          {posts.map(post => (
            <div key={post.id} className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
              <FadeInLeft>
                <img className="w-full rounded-3xl" src={"/uploads/" + post.image} alt={post.title[currentLang] || ""} />
              </FadeInLeft>
              <div className="p-10">
                <FadeIn>
                  <h2 className="text-2xl mt-20 font-bold md:mt-6">{post.title[currentLang]}</h2>
                  <Button
                    to={`/client/blog/${post.id}`}
                    variant="primary"
                    className="mx-auto mt-10"
                    icon={FaReadme}
                  >
                    {t("clients.posts.readMore")}
                  </Button>
                </FadeIn>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

        