import { PermissionName, } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useParams } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { candidateQuizAnswerModel } from "~/models/candidateQuizAnswer.server";
import { candidateQuizQuestionModel } from "~/models/candidateQuizQuestion.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

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
interface CreateCandidateQuizAnswerActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // check if quiz question exists
  if (!await candidateQuizQuestionModel.exists({ id: params.questionId as string }))
    return redirect("/404");

  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await candidateQuizAnswerModel.create({
      answer: data.answer,
      isCorrect: data.isCorrect,
    }, params.questionId as string);
    return redirect(`/dashboard/admin/candidate-quizes/questions/${params.quizId}/answers/${params.questionId}?answerCreated=true`);

  } catch (error: any) {
    console.log(error);

    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // check if quiz question exists
  if (!await candidateQuizQuestionModel.exists({ id: params.questionId as string }))
    return redirect("/404");

  return null;
}


/********* COMPONENT *********/

export default function CandidateQuizAnswersQuestionCreate() {
  const actionData = useActionData<CreateCandidateQuizAnswerActionData>();
  const { quizId, questionId } = useParams();
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/admin/candidate-quizes/questions/${quizId}/answers/${questionId}`}>
        {t("candidateQuizAnswers.createAction")}
      </AdminPageHeader>
      <ValidationForm
        collection="candidateQuizAnswers"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}

