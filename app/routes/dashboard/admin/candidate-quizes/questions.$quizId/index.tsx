import type { CandidateQuizQuestion } from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import Button from "~/components/ui/Button";
import { candidateQuizQuestionModel } from "~/models/candidateQuizQuestion.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import CandidateQuizQuestionView from "~/components/layout/CandidateQuizQuestionView";
import Notification from "~/components/ui/Notification";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { candidateQuizModel } from "~/models/candidateQuiz.server";

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // check if quiz exists
  if (!await candidateQuizModel.exists({ id: params.quizId as string }))
    return redirect("/404");

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
    await candidateQuizQuestionModel.move(itemToMove, itemToMoveOver);
    return {
      success: true,
    }
  }
  catch (error) {
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = CandidateQuizQuestion[];

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // check if quiz exists
  if (!await candidateQuizModel.exists({ id: params.quizId as string }))
    return redirect("/404");

  return await candidateQuizQuestionModel.getAllByQuizId(params.quizId as string);
}

/********* COMPONENT *********/
export default function CandidateQuizQuestions() {
  const { t, lang: currentLang, user } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const { quizId } = useParams();
  const CandidateQuizQuestionCreated = searchParams.get("questionCreated");
  const CandidateQuizQuestionUpdated = searchParams.get("questionUpdated");
  const CandidateQuizQuestionRemoved = searchParams.get("questionRemoved");

  const candidateQuizQuestions = useLoaderData<LoaderData>();
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
      <AdminPageHeader returnLink="/dashboard/admin/candidate-quizes">
        {t("candidateQuizQuestions.title")}
      </AdminPageHeader>
      { CandidateQuizQuestionCreated && (
        <Notification variant="success" autoClose={true}>
          {t("candidateQuizQuestions.questionCreated")}
        </Notification>
      )}
      { CandidateQuizQuestionUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("candidateQuizQuestions.questionUpdated")}
        </Notification>
      )}
      { CandidateQuizQuestionRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("candidateQuizQuestions.questionRemoved")}
        </Notification>
      )}
       <div className="flex flex-col items-center mt-2">
        { user?.permissions[PermissionName.adminCandidateQuizEdit] && (
          <Button
            size="sm"
            icon={AiOutlineFileAdd}
            to={`/dashboard/admin/candidate-quizes/questions/${quizId}/create`}
          >
            {t("candidateQuizQuestions.createAction")}
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
            items={candidateQuizQuestions}
            strategy={verticalListSortingStrategy}
          >
            {candidateQuizQuestions.map(item => (
              <CandidateQuizQuestionView
                key={item.id}
                id={item.id}
                question={item.question[currentLang]}
                quizId={item.quizId}
              />
            ))}
          </SortableContext>
        </SuspenseBlock>
      </DndContext>
    </section>
  );
}
