import { PermissionName, } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import ValidationForm from "~/components/features/ValidationForm";
import { candidateQuizModel } from "~/models/candidateQuiz.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

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
interface CreateCandidateQuizActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizCreate, "/no-permission");

  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await candidateQuizModel.create({
      name: data.name,
      movieUrl: data.movieUrl,
      graduateMinScore: data.graduateMinScore,
    });
    return redirect(`/dashboard/admin/candidate-quizes?candidateQuizCreated=true`);

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it

    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCandidateQuizCreate, "/no-permission");

  return null;
}


/********* COMPONENT *********/

export default function CandidateQuizesCreate() {
  const actionData = useActionData<CreateCandidateQuizActionData>();

  return (
    <section>
      <ValidationForm
        collection="candidateQuizes"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}

