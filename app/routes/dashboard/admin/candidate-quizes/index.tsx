import type { CandidateQuiz} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import Button from "~/components/ui/Button";
import { candidateQuizModel } from "~/models/candidateQuiz.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import CandidateQuizView from "~/components/layout/CandidateQuizView";
import Notification from "~/components/ui/Notification";
import AdminPageHeader from "~/components/ui/AdminPageHeader";

export const action: ActionFunction = async ({ request }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizRead, "/no-permission");

  // get data and action from body
  // validate if action is valid
  const data = await request.formData();
  const action = data.get('action') as string
  if (action !== "MOVE")
    return redirect("/dashboard/admin/candidate-quizes");

  // handle action
  // check if itemToMove and itemToMoveOver are valid
  const itemToMove = data.get('itemToMove') as string;
  const itemToMoveOver = data.get('itemToMoveOver') as string;
  if (!itemToMove || !itemToMoveOver)
    return BadRequestError({ message: "Invalid items" });

  // if both are valid, try to move itemToMove over itemToMoveOver
  try {
    await candidateQuizModel.move(itemToMove, itemToMoveOver);
    return {
      success: true,
    }
  }
  catch (error) {
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = CandidateQuiz[];

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizRead, "/no-permission");

  return await candidateQuizModel.getAll();
}

/********* COMPONENT *********/
export default function CandidateQuizes() {
  const { t, lang: currentLang, user } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const candidateQuizCreated = searchParams.get("candidateQuizCreated");
  const candidateQuizUpdated = searchParams.get("candidateQuizUpdated");
  const candidateQuizRemoved = searchParams.get("candidateQuizRemoved");

  const candidateQuizes = useLoaderData<LoaderData>();
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
        {t("candidateQuizes.title")}
      </AdminPageHeader>
      { candidateQuizCreated && (
        <Notification variant="success" autoClose={true}>
          {t("candidateQuizes.quizCreated")}
        </Notification>
      )}
      { candidateQuizUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("candidateQuizes.quizUpdated")}
        </Notification>
      )}
      { candidateQuizRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("candidateQuizes.quizRemoved")}
        </Notification>
      )}
       <div className="flex flex-col items-center mt-2">
        { user?.permissions[PermissionName.adminCandidateQuizCreate] && (
          <Button
            size="sm"
            icon={AiOutlineFileAdd}
            to={`/dashboard/admin/candidate-quizes/create`}
          >
            {t("candidateQuizes.createAction")}
          </Button>
        )}
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SuspenseBlock
          status={fetcher.state}
        >
          <SortableContext
            items={candidateQuizes}
            strategy={verticalListSortingStrategy}
          >
            {candidateQuizes.map(item => (
              <CandidateQuizView
                key={item.id}
                id={item.id}
                name={item.name[currentLang]}
              />
            ))}
          </SortableContext>
        </SuspenseBlock>
      </DndContext>
    </section>
  );
}
