import type { BoardItem, BoardItemFile, BoardItemImage, BoardItemVideo, Language, PermissionName, Post} from "@prisma/client";
import { BoardItemType, SupportedLanguage } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import { boardItemModel } from "~/models/boardItem.server";
import { GlobalContext } from "~/root";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import FilesBox from "~/components/features/FilesBox";
import { boardItemFileModel } from "~/models/boardItemFile.server";
import { languageModel } from "~/models/language.server";
import { boardItemVideoModel } from "~/models/boardItemVideo.server";
import { boardItemImageModel } from "~/models/boardItemImage.server";
import ImagesBox from "~/components/features/ImagesBox";
import VideosBox from "~/components/features/VideosBox";
import translateService from "~/utils/services/translate.server";
import { globalMiddleware } from "~/middlewares/global.server";
import { postModel } from "~/models/post.server";

/********* LOADER *********/
type BoardItemFull = BoardItem & {
  articles: Post[];
  videos: BoardItemVideo[];
  images: BoardItemImage[];
  files: BoardItemFile[];
}
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // try to find the board item
  // try to find it with proper language
  // ignore other types than ADVANCED -> links are just pure links and we don't have to manage them here
  // to know if user can see it
  // if not found, go to 404
  const language = await translateService.getCurrentLang(request);
  const languageRecord = await languageModel.getByName(language) as Language;
  const boardItem = await boardItemModel.getById(params.id as string, undefined, {
    type: BoardItemType.ADVANCED,
    supportedLanguages: {
      some: {
        id: languageRecord.id
      }
    },
  }) as BoardItem;
  if (!boardItem)
    return redirect("/404");

  // additionally load all related files, images and videos
  // remember to load only the ones that are in proper lang (intl or user lang)
  const intlLanguage = await languageModel.getOne({
    name: SupportedLanguage.intl
  });

  const relatedFiles = await boardItemFileModel.getMany({
    boardItemId: boardItem.id,
    languageId: {
      in: [intlLanguage!.id, languageRecord.id]
    },
  }, undefined, { priority: "asc" });

  const relatedVideos = await boardItemVideoModel.getMany({
    boardItemId: boardItem.id,
  }, undefined, { priority: "asc" });

  const relatedImages = await boardItemImageModel.getMany({
    boardItemId: boardItem.id,
  }, undefined, { priority: "asc" });

  // for "Why Eqology" page we need to load all non-product articles
  const relatedArticles = [];
  if (params.id === "d4c064e5-8de6-482d-b7d2-31ea319f8ca7")
    relatedArticles.push(...await postModel.getMany({
      productCategoryId: null,
    }));

  // if found, return it
  return { ...boardItem, articles: relatedArticles, files: relatedFiles, videos: relatedVideos, images: relatedImages };
}

export default function BoardItemView() {
  const item = useLoaderData<BoardItemFull>();
  const { lang } = useContext(GlobalContext);
  const { id } = useParams();

  const Content = () => {
    if (id === "d4c064e5-8de6-482d-b7d2-31ea319f8ca7") {
      
      // get item.text and split it into two parts at {articles} placeholder
      const textContent = item.text[lang] || "";
      const parts = textContent.split("<p>{articles}</p>").map(p => p.replace("<p>{articles}</p>", ""))

      return (
        <>
          <WysiwygGeneratedContent
            content={parts[0] || ""}
          />
          {item.articles.map(post => (
            <Link
              to={`/dashboard/posts/post/${post.id}`}
              key={post.id}
              className="max-w-lg mx-auto shadow mb-6 p-4 bg-white dark:bg-dark border-light-border border dark:border-medium-darker rounded-lg flex gap-4 md:gap-6 items-center"
            >
             <div className="shrink-0">
                <img className="w-26 rounded-xl" src={"/uploads/" + post.image} alt={post.title[lang] || ""} />
             </div>
             <div>
                <h2 className="text-sm md:text-base font-semibold">{post.title[lang]}</h2>
             </div>
           </Link>
          ))}
          <WysiwygGeneratedContent
            content={parts[1] || ""}
          />
        </>
      )
    }
    else
      return (
        <WysiwygGeneratedContent
          content={item.text[lang] || ""}
        />
      );
  }



  return (
    <section>
      <AdminPageHeader returnLink={ item.pageId ? undefined : `/dashboard/boards/${item.directoryId}`}>
        {item.name[lang]}
      </AdminPageHeader>
      { item.text[lang] && (
        <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
          <Content />
        </div>
      )}
      {item.images.length > 0 && (
        <ImagesBox images={item.images} className="mb-6" />
      )}
      {item.videos.length > 0 && (
        <VideosBox videos={item.videos} className="mb-6" />
      )}
      {item.files.length > 0 && (
        <FilesBox files={item.files} className="mb-6" />
      )}
    </section>
  );

}