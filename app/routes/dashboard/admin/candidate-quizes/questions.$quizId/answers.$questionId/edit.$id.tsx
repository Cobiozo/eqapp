import createFormSchema from "~/utils/validation/createFormSchema";
import ValidationForm from "~/components/features/ValidationForm";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { useActionData, useLoaderData, useParams } from "@remix-run/react";
import { sessionService } from "~/utils/services/session.server";
import type { CandidateQuizAnswer} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import { candidateQuizAnswerModel } from "~/models/candidateQuizAnswer.server";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { useContext } from "react";
import { GlobalContext } from "~/root";

const schema = createFormSchema({
  answer: {
    type: "textMultiLang",
    label: "candidateQuizAnswers.fields.answer",
    required: true,
    min: 2,
    max: 150,
  },
  isCorrect: {
    type: "boolean",
    label: "candidateQuizAnswers.fields.isCorrect",
    description: "candidateQuizAnswers.fields.questionDescription",
  },
});

/********* ACTION *********/
interface UpdateCandidateQuizAnswerActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // get candidateQuiz from DB
  // if it doesn't exist, redirect to 404
  const candidateQuizAnswer = await candidateQuizAnswerModel.getById(params.id as string);
  if(!candidateQuizAnswer)
    return redirect("/404");

  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request, candidateQuizAnswer);
 
  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await candidateQuizAnswerModel.update(
      params.id as string,
      {
        answer: data.answer,
        isCorrect: data.isCorrect,
      });
  
    return redirect(`/dashboard/admin/candidate-quizes/questions/${params.quizId as string}/answers/${params.questionId as string}?answerUpdated=true`);
  
  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = (
  CandidateQuizAnswer & {
  questions: CandidateQuizAnswer[]
});

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // get candidateQuiz from DB
  // if it doesn't exist, redirect to 404
  const candidateQuizAnswer = await candidateQuizAnswerModel.getById(params.id as string);
  if(!candidateQuizAnswer)
    return redirect("/404");

  return candidateQuizAnswer;
}

/********* COMPONENT *********/

export default function CandidateQuizAnswerEdit() {
  const actionData = useActionData<UpdateCandidateQuizAnswerActionData>();
  const candidateQuizAnswer = useLoaderData<LoaderData>();
  const { quizId, questionId } = useParams();
  const { t } = useContext(GlobalContext);

  return (
    <section>
       <AdminPageHeader returnLink={`/dashboard/admin/candidate-quizes/questions/${quizId}/answers/${questionId}`}>
        {t("candidateQuizAnswers.createAction")}
      </AdminPageHeader>
      <ValidationForm
        collection="candidateQuizAnswers"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={candidateQuizAnswer}
      />
    </section>
  );
}

