import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { BoardDirectory} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineArrowLeft, AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";
import BoardLink from "~/components/layout/BoardLink";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Alert from "~/components/ui/Alert";
import Button from "~/components/ui/Button";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // check if board dir exists
  // if not, return /admin/pages
  const boardDir = await boardDirectoryModel.exists({ id: params.id as string });
  if (!boardDir)
    return redirect("/dashboard/admin/pages");

  // get data and action from body
  // validate if action is valid
  const data = await request.formData();
  const action = data.get('action') as string
  if (action !== "MOVE")
    return redirect("/dashboard/admin/boards/" + params.id);

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
  // use boardDirectoryModel or boardItemModel depending on the type
  try {
    await boardDirectoryModel.move(itemToMove, itemToMoveOver);
   
    return {
      success: true,
    }
  }
  catch (error) {
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = BoardDirectory & {
  subDirectories: BoardDirectory[];
  items: BoardDirectory[];
}

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesRead, "/no-permission");

  // try to find the boardDir
  // if not found, redirect to 404
  const boardDir = await boardDirectoryModel.getById(params.id as string, ["subDirectories", "items"]) as null | LoaderData;
  if (!boardDir)
    return redirect("/404");

  // sort subDirectories and items by priority
  boardDir.subDirectories.sort((a, b) => a.priority - b.priority);
  boardDir.items.sort((a, b) => a.priority - b.priority);

  // if found, just return the data
  return boardDir;
}

/********* COMPONENT *********/
export default function BoardDir() {
  const { t, lang: currentLang, user } = useContext(GlobalContext);
  const boardDir = useLoaderData<LoaderData>();
  
  // gather items and subDirs in one array
  // sort them and map to add type info
  const elements = boardDir.subDirectories
    .map(subDir => ({ ...subDir, type: "subDir" }))
    .concat((boardDir.items as any).map(item => ({ ...item, type: "item" })))
    .sort((a, b) => a.priority - b.priority);

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

  function handleDragEnd(event: any) {
    const { active, over } = event;

    // if active and over are the same, do nothing
    if (active.id === over.id) return;

    fetcher.submit(
      { action: "MOVE", type: "dir", itemToMove: active.id, itemToMoveOver: over.id },
      { method: "patch" }
    );
  }

  return (
    <section>
      <AdminPageHeader returnLink={"/dashboard/admin/pages" }>
        {boardDir.name[currentLang]}
      </AdminPageHeader>
      { boardDir.parentDirectoryId && (
        <div className="flex gap-2 items-center pt-4 pb-10 font-bold tracking-widest">
          <AiOutlineArrowLeft className="text-xl" />
          <Link to={`/dashboard/admin/boards/${boardDir.parentDirectoryId}`}>
            {t("boards.backToParent")}
          </Link>
        </div>
      )}
      { boardDir.description && boardDir.description[currentLang] && (
        <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
          <WysiwygGeneratedContent content={boardDir.description[currentLang]} />
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
      <SuspenseBlock status={fetcher.state}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={elements}
            strategy={verticalListSortingStrategy}
          >
           <ul>
            {elements.map(item => (
              <BoardLink
                key={item.id}
                icon={item.icon}
                variant={item.type}
                id={item.id}
                name={item.name[currentLang]}
                url={item.link || "" as any}
                isAdmin={true}
                color = {item.color}
                removable={item.removable}
              />
            ))}
          </ul>
          </SortableContext>
        </DndContext>
      </SuspenseBlock>
      <div className="flex flex-col items-center mt-2">
        { user?.permissions[PermissionName.adminPagesEdit] && (
          <>
            <Button
              size="sm"
              className="my-2"
              icon={AiOutlineFolderAdd}
              to={`/dashboard/admin/boards/${boardDir.id}/create-subdirectory`}
            >
              {t("boards.addSubdirectory")}
            </Button>
            <Button
              size="sm"
              icon={AiOutlineFileAdd}
              className="my-1"
              to={`/dashboard/admin/boards/${boardDir.id}/create-item`}
            >
              {t("boards.addItem")}
            </Button>
          </>
        )}
      </div>
    </section>
  );
}
