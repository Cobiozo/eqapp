import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { candidateQuizModel } from "~/models/candidateQuiz.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizRemove, "/no-permission");

  // try to find candidateQuiz, if not found, redirect to 404
  const candidateQuiz = await candidateQuizModel.getById(params.id as string);
  if (!candidateQuiz)
    return redirect("/404");

  // remove candidateQuiz
  await candidateQuizModel.deleteById(candidateQuiz.id);

  // redirect to candidateQuizes list
  return redirect("/dashboard/admin/candidate-quizes?candidateQuizRemoved=true");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizRemove, "/no-permission");

  // try to find candidateQuiz, if not found, redirect to candidateQuizs list
  const candidateQuiz = await candidateQuizModel.getById(params.id as string);
  if (!candidateQuiz)
    return redirect("/dashboard/admin/candidate-quizes");

  return null;

}

export default function RemoveCandidateQuiz() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/candidate-quizes");
  }

  return (
    <>
      <Confirm
        title={t("candidateQuizes.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("candidateQuizes.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
