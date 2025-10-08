import type { BoardDirectory, BoardItem, Language, SupportedLanguage} from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import BoardLink from "~/components/layout/BoardLink";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Alert from "~/components/ui/Alert";
import { globalMiddleware } from "~/middlewares/global.server";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { boardItemModel } from "~/models/boardItem.server";
import { languageModel } from "~/models/language.server";
import { GlobalContext } from "~/root";
import translateService from "~/utils/services/translate.server";

type LoaderData = BoardDirectory & {
  subDirectories: BoardDirectory[];
  items: BoardItem[];
}

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // try to find the board dir
  // try to find it with proper language role
  // if not found, go to 404
  const language = await translateService.getCurrentLang(request);
  const languageRecord = await languageModel.getByName(language) as Language;
  const boardDir = await boardDirectoryModel.getById(params.id as string, undefined, {
    supportedLanguages: {
      some: {
        id: languageRecord.id as SupportedLanguage
      }
    },
  }) as BoardDirectory
  if (!boardDir)
    return redirect("/404");

  // if board dir is a page, just redirect to dashboard page
  if (boardDir.pageId)
    return redirect("/dashboard");

  // now we know that board dir is okay, so we can load all subdirectories and items
  // remember to load only the ones that are in proper lang
  const subDirectories = await boardDirectoryModel.getMany({
    parentDirectoryId: boardDir.id,
    supportedLanguages: {
      some: {
        id: languageRecord.id as SupportedLanguage
      }
    },
  }, undefined, { priority: "asc" });
  const items = await boardItemModel.getMany({
    directoryId: boardDir.id,
    supportedLanguages: {
      some: {
        id: languageRecord.id as SupportedLanguage
      }
    },
  }, undefined, { priority: "asc" });

  // if found, just return the data
  return {
    ...boardDir,
    subDirectories,
    items
  };
}

/********* COMPONENT *********/
export default function BoardDir() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const boardDir = useLoaderData<LoaderData>();

  // gather items and subDirs in one array
  // sort them and map to add type info
  const elements = boardDir.subDirectories
    .map(subDir => ({ ...subDir, type: "subDir" }))
    .concat((boardDir.items as any).map(item => ({ ...item, type: "item" })))
    .sort((a, b) => a.priority - b.priority);

  return (
    <section>
      <AdminPageHeader>
        {boardDir.name[currentLang]}
      </AdminPageHeader>
      { boardDir.parentDirectoryId && (
       <div className="flex gap-2 items-center pt-4 pb-10 font-bold ">
          <AiOutlineArrowLeft className="text-xl" />
          <Link to={`/dashboard/boards/${boardDir.parentDirectoryId}`}>
            {t("boards.backToParent")}
          </Link>
        </div>
      )}
      { boardDir.description && boardDir.description[currentLang] && (
        <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
          <WysiwygGeneratedContent content={boardDir.description[currentLang] }/>
        </div>
      )}
        { !boardDir.subDirectories.length && !boardDir.items.length && (
        <Alert
          variant="info"
          className="mx-auto"
          title={t("boards.noDataTitle")}
        >
          {t("boards.noData")}
        </Alert>
      )}
      <ul>
        {elements.map(item => (
          <BoardLink
            key={item.id}
            icon={item.icon}
            variant={item.type}
            id={item.id}
            name={item.name[currentLang]}
            url={item.link || "" as any}
          />
        ))}
      </ul>
    </section>
  );
}
