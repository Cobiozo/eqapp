import createFormSchema from "~/utils/validation/createFormSchema";
import ValidationForm from "~/components/features/ValidationForm";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { sessionService } from "~/utils/services/session.server";
import type { CandidateQuiz} from "~/models/candidateQuiz.server";
import { candidateQuizModel } from "~/models/candidateQuiz.server";
import type { CandidateQuizQuestion} from "@prisma/client";
import { PermissionName } from "@prisma/client";

const schema = createFormSchema({
  name: {
    type: "textMultiLang",
    label: "candidateQuizes.fields.name",
    required: true,
    min: 2,
    max: 150,
  },
  movieUrl: {
    type: "text",
    label: "candidateQuizes.fields.movieUrl",
    required: true,
    min: 2,
    max: 350,
  },
  graduateMinScore: {
    type: "number",
    label: "candidateQuizes.fields.graduateMinScore",
    required: true,
    min: 0,
    max: 100,
  },
});

/********* ACTION *********/
interface UpdateCandidateQuizActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // get candidateQuiz from DB
  // if it doesn't exist, redirect to 404
  const candidateQuiz = await candidateQuizModel.getById(params.id as string);
  if(!candidateQuiz)
    return redirect("/404");

  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request, candidateQuiz);
 
  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await candidateQuizModel.update(
      params.id as string,
      {
        name: data.name,
        movieUrl: data.movieUrl,
        graduateMinScore: data.graduateMinScore,
      });
  
    return redirect(`/dashboard/admin/candidate-quizes?candidateQuizUpdated=true`);
  
  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = (
  CandidateQuiz & {
  questions: CandidateQuizQuestion[]
});

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizEdit, "/no-permission");

  // get candidateQuiz from DB
  // if it doesn't exist, redirect to 404
  const candidateQuiz = await candidateQuizModel.getById(params.id as string);
  if(!candidateQuiz)
    return redirect("/404");

  return candidateQuiz;
}

/********* COMPONENT *********/

export default function CandidateQuizEdit() {
  const actionData = useActionData<UpdateCandidateQuizActionData>();
  const candidateQuiz = useLoaderData<LoaderData>();

  return (
    <section>
      <ValidationForm
        collection="candidateQuizes"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={candidateQuiz}
      />
    </section>
  );
}

