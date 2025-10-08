import AdminPageHeader   from "~/components/ui/AdminPageHeader";
import { GlobalContext } from "~/root";
import createFormSchema from "~/utils/validation/createFormSchema";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { sessionService } from "~/utils/services/session.server";
import type { Faq} from "~/models/faq.server";
import { faqModel } from "~/models/faq.server";
import { PermissionName } from "@prisma/client";
import type { DbData } from "~/utils/PageFormBase.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";

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
    minLength: 2,
    required: true,
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
interface UpdateFaqActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminFaqsEdit, "/no-permission");

  // get faq from DB
  // if it doesn't exist, redirect to 404
  const faq = await faqModel.getById(params.id as string);
  if(!faq)
    return redirect("/404");

  const formData = await request.formData();
  const data = parseFormData(formData, schema);
 
  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await faqModel.update(
      params.id as string,
      {
        question: data.question,
        answer: data.description,
      });
  
    return redirect("/dashboard/admin/faqs?faqUpdated=true")
  
  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = Faq & {
  dbData: DbData
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminFaqsEdit, "/no-permission");

  // get faq from DB
  // if it doesn't exist, redirect to 404
  const faq = await faqModel.getById(params.id as string);
  if(!faq)
    return redirect("/404");

  return faq;
}

/********* COMPONENT *********/

export default function FaqEdit() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<UpdateFaqActionData>();
  const faq = useLoaderData<LoaderData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/faqs">
        {t("faqs.edit.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="faqs"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={faq}
      />
    </section>
  );
}

