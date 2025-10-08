import { PermissionName, } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { faqModel } from "~/models/faq.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema =  createFormSchema({
  question: {
    type: "textMultiLang",
    label: "faqs.fields.question",
    required: true,
    min: 2,
    max: 150,
  },
  answer: {
    type: "wysiwygMultiLang",
    label: "faqs.fields.answer",
    required: true,
    minLength: 2,
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline','strike', 'blockquote'],
      ],
    },
    formats: [
      'bold', 'italic', 'underline', 'strike', 'blockquote',
    ],
  },
});

/********* ACTION *********/
interface CreateFaqActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminFaqsCreate, "/no-permission");

  const formData = await request.formData();
  const data = parseFormData(formData, schema);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await faqModel.create({
      question: data.question,
      answer: data.answer,
    });
    return redirect("/dashboard/admin/faqs")

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it

    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminFaqsCreate, "/no-permission");

  return null;
}


/********* COMPONENT *********/

export default function FaqsCreate() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreateFaqActionData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/faqs">
        {t("faqs.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="faqs"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}

