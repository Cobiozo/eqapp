import type { CandidateQuizAnswer } from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import Button from "~/components/ui/Button";
import { candidateQuizAnswerModel } from "~/models/candidateQuizAnswer.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import CandidateQuizAnswerView from "~/components/layout/CandidateQuizAnswerView";
import Notification from "~/components/ui/Notification";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { candidateQuizQuestionModel } from "~/models/candidateQuizQuestion.server";

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // check if quiz question exists
  if (!await candidateQuizQuestionModel.exists({ id: params.questionId as string }))
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
    await candidateQuizAnswerModel.move(itemToMove, itemToMoveOver);
    return {
      success: true,
    }
  }
  catch (error) {
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = CandidateQuizAnswer[];

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

   // check if quiz question exists
   if (!await candidateQuizQuestionModel.exists({ id: params.questionId as string }))
    return redirect("/404");

  return await candidateQuizAnswerModel.getAllByQuestionId(params.questionId as string);
}

/********* COMPONENT *********/
export default function CandidateQuizAnswers() {
  const { t, lang: currentLang, user } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const { quizId, questionId } = useParams();
  const CandidateQuizAnswerCreated = searchParams.get("answerCreated");
  const CandidateQuizAnswerUpdated = searchParams.get("answerUpdated");
  const CandidateQuizAnswerRemoved = searchParams.get("answerRemoved");

  const candidateQuizAnswers = useLoaderData<LoaderData>();
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
      <AdminPageHeader returnLink={`/dashboard/admin/candidate-quizes/questions/${quizId}`}>
        {t("candidateQuizAnswers.title")}
      </AdminPageHeader>
      { CandidateQuizAnswerCreated && (
        <Notification variant="success" autoClose={true}>
          {t("candidateQuizAnswers.answerCreated")}
        </Notification>
      )}
      { CandidateQuizAnswerUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("candidateQuizAnswers.answerUpdated")}
        </Notification>
      )}
      { CandidateQuizAnswerRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("candidateQuizAnswers.answerRemoved")}
        </Notification>
      )}
       <div className="flex flex-col items-center mt-2">
        { user?.permissions[PermissionName.adminCandidateQuizEdit] && (
          <Button
            size="sm"
            icon={AiOutlineFileAdd}
            to={`/dashboard/admin/candidate-quizes/questions/${quizId}/answers/${questionId}/create`}
          >
            {t("candidateQuizAnswers.createAction")}
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
            items={candidateQuizAnswers}
            strategy={verticalListSortingStrategy}
          >
            {candidateQuizAnswers.map(item => (
              <CandidateQuizAnswerView
                key={item.id}
                id={item.id}
                answer={item.answer[currentLang]}
                isCorrect={item.isCorrect}
                quizId={quizId as string}
                questionId={questionId as string}
              />
            ))}
          </SortableContext>
        </SuspenseBlock>
      </DndContext>
    </section>
  );
}
