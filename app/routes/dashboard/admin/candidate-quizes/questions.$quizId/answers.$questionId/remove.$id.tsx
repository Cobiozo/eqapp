import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { candidateQuizAnswerModel } from "~/models/candidateQuizAnswer.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // try to find candidateQuizAnswer, if not found, redirect to 404
  const candidateQuizAnswer = await candidateQuizAnswerModel.getById(params.id as string);
  if (!candidateQuizAnswer)
    return redirect("/404");

  // remove candidateQuizAnswer
  await candidateQuizAnswerModel.deleteById(candidateQuizAnswer.id);

  // redirect to candidateQuizAnsweres list
  return redirect("/dashboard/admin/candidate-quizes/questions/" + params.quizId + "/answers/" + params.questionId + "?answerRemoved=true");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizRemove, "/no-permission");

  // try to find candidateQuizAnswer, if not found, redirect to candidateQuizAnswers list
  const candidateQuizAnswer = await candidateQuizAnswerModel.getById(params.id as string);
  if (!candidateQuizAnswer)
    return redirect("/dashboard/admin/candidate-quizes");

  return null;

}

export default function RemoveCandidateQuizAnswer() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { quizId, questionId } = useParams();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/candidate-quizes/questions/" + quizId + "/answers/" + questionId);
  }

  return (
    <>
      <Confirm
        title={t("candidateQuizAnswers.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("candidateQuizAnswers.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
