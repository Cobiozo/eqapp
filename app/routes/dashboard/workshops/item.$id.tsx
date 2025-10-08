import type { WorkshopItem, WorkshopItemFile, PermissionName} from "@prisma/client";
import { SupportedLanguage } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useContext, useEffect } from "react";
import { workshopItemModel } from "~/models/workshopItem.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import FilesBox from "~/components/features/FilesBox";
import { workshopItemFileModel } from "~/models/workshopItemFile.server";
import { languageModel } from "~/models/language.server";
import Video from "~/components/ui/Video";
import { globalMiddleware } from "~/middlewares/global.server";
import { userModel } from "~/models/user.server";
import { useWakeLock } from 'react-screen-wake-lock';

/********* LOADER *********/
type WorkshopItemFull = WorkshopItem & {
  files: WorkshopItemFile[];
}
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // try to find the workshop item
  // try to find it with proper language and role
  // get only the global ones or created by our mentor
  // if not found, go to 404
  const user = await sessionService.getUser(request);
  // determine user upon us in the tree (but only up till first leader/admin as it's considered organization)
  const mentorsUponUs = await userModel.getMentorsTree(user!.id as string);
  const workshopItem = await workshopItemModel.getById(params.id as string, undefined, {
    supportedLanguages: {
      some: {
        id: user?.languageId as SupportedLanguage
      }
    },
    supportedRoles: {
      some: {
        id: user?.roleId as PermissionName
      }
    },
    OR: [
      { userId: null },
      { 
        userId: {
          in: mentorsUponUs
        }
      },
      { userId: user?.id }
    ],
  }) as WorkshopItem;
  if (!workshopItem)
    return redirect("/404");

  // additionally load all related files
  // remember to load only the ones that are in proper lang (intl or user lang)
  const intlLanguage = await languageModel.getOne({
    name: SupportedLanguage.intl
  });

  const relatedFiles = await workshopItemFileModel.getMany({
    workshopItemId: workshopItem.id,
    languageId: {
      in: [intlLanguage!.id, user?.languageId as SupportedLanguage]
    },
  }, undefined, { priority: "asc" });

  // if found, return it
  return { ...workshopItem, files: relatedFiles };
}

export default function WorkshopItemView() {
  const item = useLoaderData<WorkshopItemFull>();
  const { lang } = useContext(GlobalContext);
  const fetcher = useFetcher();
  const { request } = useWakeLock();

  useEffect(() => {
    request();
    const timer = setTimeout(() => {
      fetcher.submit(
        null,
        { method: "post", action: "/dashboard/action/finish-workshop/" + item.id }
      );
    }, 5 * 60 * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/workshops/${item.directoryId}`}>
        <span className="text-sm md:text-lg">
          {item.name[lang]}
        </span>
      </AdminPageHeader>
      { item.description[lang] && (
        <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
          <WysiwygGeneratedContent
            content={item.description[lang]}
          />
        </div>
      )}
      <Video
        className="my-6"
        src={item.url}
      />
      {item.files.length > 0 && (
        <FilesBox files={item.files} className="mb-6" />
      )}
    </section>
  );

}