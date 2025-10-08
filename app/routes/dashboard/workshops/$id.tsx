import type { WorkshopDirectory, WorkshopItem, SupportedLanguage} from "@prisma/client";
import type { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import WorkshopLink from "~/components/layout/WorkshopLink";
import WorkshopTemplate from "~/components/layout/WorkshopTemplate";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Alert from "~/components/ui/Alert";
import { globalMiddleware } from "~/middlewares/global.server";
import { shortLinkModel } from "~/models/shortLink.server";
import { userModel } from "~/models/user.server";
import { userWorkshopModel } from "~/models/userWorkshop.server";
import { workshopDirectoryModel } from "~/models/workshopDirectory.server";
import { workshopItemModel } from "~/models/workshopItem.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = WorkshopDirectory & {
  subDirectories: WorkshopDirectory[];
  items: WorkshopItem[];
}

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // try to find the workshop dir
  // try to find it with proper language and role
  // we also should check if it's global (not any mentor's) or it's created by our mentor
  // if not found, go to 404
  const user = await sessionService.getUser(request);

  // determine user upon us in the tree (but only up till first leader/admin as it's considered organization)
  const mentorsUponUs = await userModel.getMentorsTree(user!.id as string);
  const workshopDir = await workshopDirectoryModel.getById(params.id as string, undefined, {
    OR: [
      {
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
          { userId: user!.id }
        ]
      },
      {
        parentDirectoryId: null
      }
    ]
  }) as WorkshopDirectory
  if (!workshopDir)
    return redirect("/404");

  // now we know that workshop dir is okay, so we can load all subdirectories and items
  // remember to load only the ones that are in proper lang and role
  // and are global or created by our mentor
  const subDirectories = await workshopDirectoryModel.getMany({
    parentDirectoryId: workshopDir.id,
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
      { userId: null},
      { 
        userId: {
          in: mentorsUponUs
        }
      },
      { userId: user!.id }
    ]
  }, undefined, { priority: "asc" });
  const items = await workshopItemModel.getMany({
    directoryId: workshopDir.id,
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
      { userId: null},
      { 
        userId: {
          in: mentorsUponUs
        }
      },
      { userId: user!.id }
    ]
  }, undefined, { priority: "asc" });

  // check which ones of loaded items are done by the user
  // save the done value to items array
  const userDoneWorkshops = await userWorkshopModel.getMany({
    userId: user!.id as string,
    workshopId: {
      in: items.map(item => item.id)
    }
  });

  // prepare invite urls for the items
  const inviteUrls: { itemId: string, url: string }[] = []; 
  for (const item of items) {
    inviteUrls.push({
      itemId: item.id,
      url: await shortLinkModel.generate(request, `/dashboard/webinars/client/watch/${item.id}?ref=${user!.id}`)
    });
  }

  // if found, just return the data
  return {
    ...workshopDir,
    subDirectories,
    items: items.map(item => ({
      ...item,
      done: userDoneWorkshops.some(doneItem => doneItem.workshopId === item.id),
      inviteUrl: inviteUrls.find(e => e.itemId === item.id)?.url || ""
    }))
  };
}

/********* COMPONENT *********/
export default function WorkshopDir() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const workshopDir = useLoaderData<LoaderData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard">
        {workshopDir.parentDirectoryId ? workshopDir.name[currentLang] : t("workshops.title")}
      </AdminPageHeader>
      { workshopDir.parentDirectoryId && (
       <div className="flex gap-2 items-center pt-4 pb-10 font-bold ">
          <AiOutlineArrowLeft className="text-xl" />
          <Link to={`/dashboard/workshops/${workshopDir.parentDirectoryId}`}>
            {t("workshops.backToParent")}
          </Link>
        </div>
      )}
      { workshopDir.description && workshopDir.description[currentLang] && (
        <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
          <WysiwygGeneratedContent content={workshopDir.description[currentLang]} />
        </div>
      )}
        { !workshopDir.subDirectories.length && !workshopDir.items.length && (
        <Alert
          variant="info"
          className="mx-auto"
          title={t("workshops.noDataTitle")}
        >
          {t("workshops.noData")}
        </Alert>
      )}
      {workshopDir.subDirectories.map(item => (
        <WorkshopLink
          key={item.id}
          icon={item.icon}
          variant="subDir"
          id={item.id}
          name={item.name[currentLang]}
          image={item.image}
        />
      ))}
      <ul className="grid grid-cols-1 md:grid-cols-2 standard-text md:gap-6">
        {workshopDir.items.map(item => (
          <WorkshopTemplate
            key={item.id}
            id={item.id}
            name={item.name[currentLang]}
            url={item.url}
            done={item.done}
            icon={item.icon}
            directoryId={item.directoryId}
            inviteUrl={item.inviteUrl}
          />
        ))}
      </ul>
    </section>
  );
}
