import type { WorkshopItemFile, Language} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import { workshopItemFileModel } from "~/models/workshopItemFile.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import { workshopItemModel } from "~/models/workshopItem.server";
import { FaPlus } from "react-icons/fa";
import Button from "~/components/ui/Button";
import { globalMiddleware } from "~/middlewares/global.server";
import MyWorkshopItemFileView from "~/components/layout/MyWorkshopItemFileView";

export const action: ActionFunction = async ({ request , params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");
  const userId = await sessionService.getUserId(request);

  // try to find workshop item with this id that is ours
  // if not exists, return to workshops
  const id = params.id as string;
  if (!await workshopItemModel.exists({ id, userId }))
    return redirect("/dashboard/my-workshops");

  // get data and action from body
  // validate if action is valid
  const data = await request.formData();
  const action = data.get('action') as string
  if (action !== "MOVE")
    return redirect("/dashboard/my-workshops/edit/item/" + id + "/files");

  // handle action
  // check if itemToMove and itemToMoveOver are valid
  const itemToMove = data.get('itemToMove') as string;
  const itemToMoveOver = data.get('itemToMoveOver') as string;
  if (!itemToMove || !itemToMoveOver)
    return BadRequestError({ message: "Invalid items" });

  // if both are valid, try to move itemToMove over itemToMoveOver
  try {
    await workshopItemFileModel.move(itemToMove, itemToMoveOver);
    return {
      success: true,
    }
  }
  catch (error) {
    console.log(error);
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = (WorkshopItemFile & {
  language: Language;
})[]

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check permissions
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");

  // try to find workshop item with this id that is ours
  // if not exists, return to workshops
  const id = params.id as string;
  if (!await workshopItemModel.exists({ id, userId: await sessionService.getUserId(request) }))
    return redirect("/dashboard/my-workshops");

  // if found, just return the data
  return await workshopItemFileModel.getAllByWorkshopItemId(params.id as string);
}

/********* COMPONENT *********/
export default function MyWorkshopItemFileItem() {
  const { id: workshopItemId } = useParams();
  const { user, t } = useContext(GlobalContext);
  const workshopItemFiles = useLoaderData<LoaderData>();
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
            items={workshopItemFiles}
            strategy={verticalListSortingStrategy}
          >
            <ul className="mt-10">
              {workshopItemFiles.map(item => (
                <MyWorkshopItemFileView
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  title={item.title}
                  language={item.language.name}
                  type={item.type}
                  workshopItemId={workshopItemId as string}
                />
              ))}
            </ul>
            <Button
              to={`/dashboard/my-workshops/edit/item/${workshopItemId}/files/create`}
              className="mx-auto mt-6"
              icon={FaPlus}
            >
              {t('workshopItemFiles.createAction')}
            </Button>
          </SortableContext>
        </SuspenseBlock>
      </DndContext>
    </section>
  );
}
