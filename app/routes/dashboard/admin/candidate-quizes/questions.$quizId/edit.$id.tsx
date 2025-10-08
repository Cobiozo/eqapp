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
import type { CandidateQuizQuestion} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import { candidateQuizQuestionModel } from "~/models/candidateQuizQuestion.server";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { GlobalContext } from "~/root";
import { useContext } from "react";

const schema = createFormSchema({
  question: {
    type: "textMultiLang",
    label: "candidateQuizQuestions.fields.question",
    required: true,
    min: 2,
    max: 150,
  },
});

/********* ACTION *********/
interface UpdateCandidateQuizQuestionActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // get candidateQuiz from DB
  // if it doesn't exist, redirect to 404
  const candidateQuizQuestion = await candidateQuizQuestionModel.getById(params.id as string);
  if(!candidateQuizQuestion)
    return redirect("/404");

  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request, candidateQuizQuestion);
 
  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await candidateQuizQuestionModel.update(
      params.id as string,
      {
        question: data.question,
      });
  
    return redirect(`/dashboard/admin/candidate-quizes/questions/${params.quizId}?questionUpdated=true`);
  
  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = (
  CandidateQuizQuestion & {
  questions: CandidateQuizQuestion[]
});

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // get candidateQuiz from DB
  // if it doesn't exist, redirect to 404
  const candidateQuizQuestion = await candidateQuizQuestionModel.getById(params.id as string);
  if(!candidateQuizQuestion)
    return redirect("/404");

  return candidateQuizQuestion;
}

/********* COMPONENT *********/

export default function CandidateQuizQuestionEdit() {
  const actionData = useActionData<UpdateCandidateQuizQuestionActionData>();
  const candidateQuizQuestion = useLoaderData<LoaderData>();
  const { quizId } = useParams();
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/admin/candidate-quizes/questions/${quizId}`}>
        {t("candidateQuizQuestions.editAction")}
      </AdminPageHeader>
      <ValidationForm
        collection="candidateQuizQuestions"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={candidateQuizQuestion}
      />
    </section>
  );
}

