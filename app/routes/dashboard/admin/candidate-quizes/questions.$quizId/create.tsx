import { PermissionName, } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useParams } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { candidateQuizModel } from "~/models/candidateQuiz.server";
import { candidateQuizQuestionModel } from "~/models/candidateQuizQuestion.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

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
interface CreateCandidateQuizQuestionActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // check if quiz exists
  if (!await candidateQuizModel.exists({ id: params.quizId as string }))
    return redirect("/404");

  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await candidateQuizQuestionModel.create({
      question: data.question,
    }, params.quizId as string);
    return redirect(`/dashboard/admin/candidate-quizes/questions/${params.quizId}?questionCreated=true`);

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it

    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // check if quiz exists
  if (!await candidateQuizModel.exists({ id: params.quizId as string }))
    return redirect("/404");

  return null;
}


/********* COMPONENT *********/

export default function CandidateQuizQuestionesQuestionCreate() {
  const actionData = useActionData<CreateCandidateQuizQuestionActionData>();
  const { quizId } = useParams();
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/admin/candidate-quizes/questions/${quizId}`}>
        {t("candidateQuizQuestions.createAction")}
      </AdminPageHeader>
      <ValidationForm
        collection="candidateQuizQuestions"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}

