import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { WorkshopDirectory} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineArrowLeft, AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import WorkshopLink from "~/components/layout/WorkshopLink";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Alert from "~/components/ui/Alert";
import Button from "~/components/ui/Button";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import { workshopDirectoryModel } from "~/models/workshopDirectory.server";
import { workshopItemModel } from "~/models/workshopItem.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";


export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminWorkshopsEdit, "/no-permission");

  // check if workshop dir exists
  // if not, return /admin/workshops
  const workshopDir = await workshopDirectoryModel.exists({ id: params.id as string });
  if (!workshopDir)
    return redirect("/dashboard/admin/workshops");

  // get data and action from body
  // validate if action is valid
  const data = await request.formData();
  const action = data.get('action') as string
  if (action !== "MOVE")
    return redirect("/dashboard/admin/workshops/" + params.id);

  // also check if type is one of the valid types
  const type = data.get('type') as string;
  if (type !== "dir" && type !== "item")
    return BadRequestError({ message: "Invalid type" });

  // handle action
  // check if itemToMove and itemToMoveOver are valid
  const itemToMove = data.get('itemToMove') as string;
  const itemToMoveOver = data.get('itemToMoveOver') as string;
  if (!itemToMove || !itemToMoveOver)
    return BadRequestError({ message: "Invalid items" });

  // if both are valid, try to move itemToMove over itemToMoveOver
  // use workshopDirectoryModel or workshopItemModel depending on the type
  try {
    if (type === "dir")
      await workshopDirectoryModel.move(itemToMove, itemToMoveOver);
    else
      await workshopItemModel.move(itemToMove, itemToMoveOver);
    return {
      success: true,
    }
  }
  catch (error) {
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = WorkshopDirectory & {
  subDirectories: WorkshopDirectory[];
  items: WorkshopDirectory[];
}

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWorkshopsRead, "/no-permission");

  // try to find the workshopDir
  // if not found, redirect to 404
  const workshopDir = await workshopDirectoryModel.getById(params.id as string, ["items"]) as null | LoaderData;
  if (!workshopDir)
    return redirect("/404");

  // get subDirectories for the root directory
  // omit user generated
  const subDirectories = await workshopDirectoryModel.getMany({
    parentDirectoryId: workshopDir.id,
    userId: null,
  }, undefined, { priority: "asc" });

  // sort items by priority
  workshopDir.items.sort((a, b) => a.priority - b.priority);

  // if found, just return the data
  return {
    ...workshopDir,
    subDirectories,
  };
}

/********* COMPONENT *********/
export default function WorkshopDir() {
  const { t, lang: currentLang, user } = useContext(GlobalContext);
  const workshopDir = useLoaderData<LoaderData>();

  const fetcher = useFetcher();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragDirEnd(event: any) {
    const { active, over } = event;

    // if active and over are the same, do nothing
    if (active.id === over.id) return;

    fetcher.submit(
      { action: "MOVE", type: "dir", itemToMove: active.id, itemToMoveOver: over.id },
      { method: "patch" }
    );
  }

  function handleDragItemEnd(event: any) {
    const { active, over } = event;

    // if active and over are the same, do nothing
    if (active.id === over.id) return;

    fetcher.submit(
      { action: "MOVE", type: "item", itemToMove: active.id, itemToMoveOver: over.id },
      { method: "patch" }
    );
  }

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {workshopDir.parentDirectoryId ? workshopDir.name[currentLang] : t("workshops.title")}
      </AdminPageHeader>
      { workshopDir.parentDirectoryId && (
        <div className="flex gap-2 items-center pt-4 pb-10 font-bold ">
          <AiOutlineArrowLeft className="text-xl" />
          <Link to={`/dashboard/admin/workshops/${workshopDir.parentDirectoryId}`}>
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
      <SuspenseBlock status={fetcher.state}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragDirEnd}
        >
          <SortableContext
            items={workshopDir.subDirectories}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {workshopDir.subDirectories.map(item => (
                <WorkshopLink
                  key={item.id}
                  icon={item.icon}
                  variant="subDir"
                  id={item.id}
                  name={item.name[currentLang]}
                  isAdmin={true}
                  image={item.image}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragItemEnd}
        >
          <SortableContext
            items={workshopDir.items}
            strategy={verticalListSortingStrategy}
          >
            <ul>
              {workshopDir.items.map(item => (
                <WorkshopLink
                  key={item.id}
                  icon={item.icon}
                  variant="item"
                  id={item.id}
                  name={item.name[currentLang]}
                  isAdmin={true}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </SuspenseBlock>
      <div className="flex flex-col items-center mt-2">
        { user?.permissions[PermissionName.adminWorkshopsEdit] && (
          <>
            <Button
              size="sm"
              className="-mb-1"
              icon={AiOutlineFolderAdd}
              to={`/dashboard/admin/workshops/${workshopDir.id}/create-subdirectory`}
            >
              {t("workshops.addSubdirectory")}
            </Button>
            <Button
              size="sm"
              icon={AiOutlineFileAdd}
              to={`/dashboard/admin/workshops/${workshopDir.id}/create-item`}
            >
              {t("workshops.addItem")}
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
