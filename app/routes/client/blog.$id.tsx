import { redirect, type LoaderFunction } from "@remix-run/node";
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
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";

type Loader = Post;

export const loader: LoaderFunction = async ({ request, params }) => {

  // try to find this specific post
  const post = await postModel.getById(params.id as string);
  if (!post)
    return redirect("/client/blog");
  
  return post
}

export default function PostPage() {
  const { lang: currentLang } = useContext(GlobalContext);
  const post = useLoaderData<Loader>();
  
  return (
    <section>
      <Container>
        <PageHeader>
          {post.title[currentLang] || ""}
        </PageHeader>
        <div className="max-w-2xl mx-auto">
          <FadeInUp>
            <img className="w-full rounded-3xl my-20" src={"/uploads/" + post.image} alt={post.title[currentLang] || ""} />
          </FadeInUp>
          <WysiwygGeneratedContent content={post.content[currentLang] || ""} />
        </div>
      </Container>
    </section>
  )
}

            
        