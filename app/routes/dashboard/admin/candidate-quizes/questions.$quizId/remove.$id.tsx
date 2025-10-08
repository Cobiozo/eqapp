import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { candidateQuizQuestionModel } from "~/models/candidateQuizQuestion.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // try to find candidateQuizQuestion, if not found, redirect to 404
  const candidateQuizQuestion = await candidateQuizQuestionModel.getById(params.id as string);
  if (!candidateQuizQuestion)
    return redirect("/404");

  // remove candidateQuizQuestion
  await candidateQuizQuestionModel.deleteById(candidateQuizQuestion.id);

  // redirect to candidateQuizQuestiones list
  return redirect("/dashboard/admin/candidate-quizes/questions/" + candidateQuizQuestion.quizId + "?questionRemoved=true");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizRemove, "/no-permission");

  // try to find candidateQuizQuestion, if not found, redirect to candidateQuizQuestions list
  const candidateQuizQuestion = await candidateQuizQuestionModel.getById(params.id as string);
  if (!candidateQuizQuestion)
    return redirect("/dashboard/admin/candidate-quizes");

  return null;

}

export default function RemoveCandidateQuizQuestion() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { quizId } = useParams();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/candidate-quizes/questions/" + quizId);
  }

  return (
    <>
      <Confirm
        title={t("candidateQuizQuestions.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("candidateQuizQuestions.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
