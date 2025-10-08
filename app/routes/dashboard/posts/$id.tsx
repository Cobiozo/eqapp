import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { postModel } from "~/models/post.server";
import { GlobalContext } from "~/root";
import { Post } from "@prisma/client";
import { globalMiddleware } from "~/middlewares/global.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // try to find a post by given id
  const post = await postModel.getById(params.id as string);
  if (!post)
    return redirect("/404");

  return post;
}

export default function PostPage() {
  const post = useLoaderData<Post>();
  const { lang: currentLang } = useContext(GlobalContext);

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/products/${post.productCategoryId}`}>
        {post.title[currentLang]}
      </AdminPageHeader>
      <img
        src={`/uploads/${post.image}`}
        alt={post.title[currentLang]}
        className="w-full object-cover rounded-lg max-h-[20rem] mb-6"
      />
      <WysiwygGeneratedContent content={post.content[currentLang]} />
    </section>

  )
}