import type { Faq} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import { faqModel } from "~/models/faq.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import FaqView from "~/components/layout/FaqView";
import Notification from "~/components/ui/Notification";

export const action: ActionFunction = async ({ request }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminFaqsEdit, "/no-permission");

  // get data and action from body
  // validate if action is valid
  const data = await request.formData();
  const action = data.get('action') as string
  if (action !== "MOVE")
    return redirect("/dashboard/admin/faqs");

  // handle action
  // check if itemToMove and itemToMoveOver are valid
  const itemToMove = data.get('itemToMove') as string;
  const itemToMoveOver = data.get('itemToMoveOver') as string;
  if (!itemToMove || !itemToMoveOver)
    return BadRequestError({ message: "Invalid items" });

  // if both are valid, try to move itemToMove over itemToMoveOver
  try {
    await faqModel.move(itemToMove, itemToMoveOver);
    return {
      success: true,
    }
  }
  catch (error) {
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = Faq[];

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminFaqsRead, "/no-permission");

  // if found, just return the data
  return await faqModel.getAll();
}

/********* COMPONENT *********/
export default function FaqItem() {
  const { t, lang: currentLang, user } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const faqCreated = searchParams.get("faqCreated");
  const faqUpdated = searchParams.get("faqUpdated");
  const faqRemoved = searchParams.get("faqRemoved");

  const faqs = useLoaderData<LoaderData>();
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
      <AdminPageHeader returnLink="/dashboard/admin">
        {t("faqs.allFaqs")}
      </AdminPageHeader>
      { faqCreated && (
        <Notification variant="success" autoClose={true}>
          {t("faqs.faqCreated")}
        </Notification>
      )}
      { faqUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("faqs.faqUpdated")}
        </Notification>
      )}
      { faqRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("faqs.faqRemoved")}
        </Notification>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SuspenseBlock
          status={fetcher.state}
        >
          <SortableContext
            items={faqs}
            strategy={verticalListSortingStrategy}
          >
            {faqs.map(item => (
              <FaqView
                key={item.id}
                id={item.id}
                question={item.question[currentLang]}
              />
            ))}
          </SortableContext>
        </SuspenseBlock>
      </DndContext>
      <div className="flex flex-col items-center mt-2">
        { user?.permissions[PermissionName.adminFaqsCreate] && (
          <Button
            size="sm"
            icon={AiOutlineFileAdd}
            to={`/dashboard/admin/faqs/create`}
          >
            {t("faqs.createAction")}
          </Button>
        )}
      </div>
    </section>
  );
}
