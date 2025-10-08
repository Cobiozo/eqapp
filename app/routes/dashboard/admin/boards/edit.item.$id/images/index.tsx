import type { BoardItemImage} from "@prisma/client";
import { BoardItemType, PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import { boardItemImageModel } from "~/models/boardItemImage.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import BoardItemImageView from "~/components/layout/BoardItemImageView";
import { boardItemModel } from "~/models/boardItem.server";
import { FaPlus } from "react-icons/fa";

export const action: ActionFunction = async ({ request , params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find board item with this id
  // if not exists, return to pages
  const id = params.id as string;
  const boardItem = await boardItemModel.getById(id)
  if (!boardItem)
    return redirect("/dashboard/admin/pages");

  // if it exits, check if its type is ADVANCED
  // if no -> you shouldn't be here!
  if (boardItem.type !== BoardItemType.ADVANCED)
    return redirect("/no-permission");

  // get data and action from body
  // validate if action is valid
  const data = await request.formData();
  const action = data.get('action') as string
  if (action !== "MOVE")
    return redirect("/dashboard/admin/boards/edit/item/" + id + "/images");

  // handle action
  // check if itemToMove and itemToMoveOver are valid
  const itemToMove = data.get('itemToMove') as string;
  const itemToMoveOver = data.get('itemToMoveOver') as string;
  if (!itemToMove || !itemToMoveOver)
    return BadRequestError({ message: "Invalid items" });

  // if both are valid, try to move itemToMove over itemToMoveOver
  try {
    await boardItemImageModel.move(itemToMove, itemToMoveOver);
    return {
      success: true,
    }
  }
  catch (error) {
    console.log(error);
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = BoardItemImage[];

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesRead, "/no-permission");

  // try to find board item with this id
  // if not exists, return to pages
  const id = params.id as string;
  const boardItem = await boardItemModel.getById(id)
  if (!boardItem)
    return redirect("/dashboard/admin/pages");

  // if it exits, check if its type is ADVANCED
  // if no -> you shouldn't be here!
  if (boardItem.type !== BoardItemType.ADVANCED)
    return redirect("/no-permission");

  // if found, just return the data
  return await boardItemImageModel.getAllByBoardItemId(params.id as string);
}

/********* COMPONENT *********/
export default function BoardItemImageItem() {
  const { id: boardItemId } = useParams();
  const { user } = useContext(GlobalContext);
  const boardItemImages = useLoaderData<LoaderData>();
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
      { action: "MOVE", itemToMove: active.id, itemToMoveOver: over.id },
      { method: "patch" }
    );
  }

  return (
    <section>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SuspenseBlock
          status={fetcher.state}
        >
          <SortableContext
            items={boardItemImages}
          >
            <ul className="flex flex-wrap justify-center gap-6 mt-10">
              {boardItemImages.map(item => (
                <BoardItemImageView
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  boardItemId={boardItemId as string}
                />
              ))}
                { user?.permissions[PermissionName.adminPagesEdit] && (
                  <li>
                    <Link
                      to={`/dashboard/admin/boards/edit/item/${boardItemId}/images/create`}
                      className="flex items-center justify-center border border-primary-lighter text-primary-lighter bg-light dark:bg-dark dark:border-medium-darker p-2 rounded-lg w-30 h-30"
                    >
                      <FaPlus />
                    </Link>
                  </li>
                )}
            </ul>
          </SortableContext>
        </SuspenseBlock>
      </DndContext>
    </section>
  );
}
