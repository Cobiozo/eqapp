import type { Post } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaReadme } from "react-icons/fa";
import Button from "~/components/client/Button";
import { FadeIn, FadeInLeft } from "~/components/features/AOM";
import PageHeader from "~/components/ui/PageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import { postModel } from "~/models/post.server";
import { GlobalContext } from "~/root";

type Loader = Post[];

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  return await postModel.getAll();
}

export default function PostsPage() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const posts = useLoaderData<Loader>();

  return (
    <section>
      <PageHeader>
        {t("clients.posts.title")}
      </PageHeader>
      <div className="my-6 md:my-20">
        {posts.map(post => (
          <div key={post.id} className="mb-6 md:mb-0 p-4 bg-white dark:bg-dark border-light-border border dark:border-medium-darker rounded-lg md:border-none md:p-0 md:bg-transparent dark:md:bg-transparent">
            <div className="flex items-center md:grid md:grid-cols-2 gap-4 md:gap-10 md:my-10">
              <div className="shrink-0">
                <FadeInLeft>
                  <img className="w-26 md:w-full rounded-xl md:rounded-3xl" src={"/uploads/" + post.image} alt={post.title[currentLang] || ""} />
                </FadeInLeft>
              </div>
              <div className="md:p-10">
                <FadeIn>
                  <h2 className="text-sm md:text-xl md:mt-6 font-bold">{post.title[currentLang]}</h2>
                  <Button
                    to={`/dashboard/posts/post/${post.id}`}
                    variant="primary"
                    className="mx-auto md:mt-10 hidden md:block"
                    icon={FaReadme}
                  >
                    {t("clients.posts.readMe")}
                  </Button>
                </FadeIn>
              </div>
            </div>
            <Button
              to={`/dashboard/posts/post/${post.id}`}
              variant="primary"
              className="mx-auto my-2 block md:hidden"
              icon={FaReadme}
            >
              {t("clients.posts.readMe")}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}

        