import { PermissionName, } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import ValidationForm from "~/components/features/ValidationForm";
import { faqModel } from "~/models/faq.server";
import { productCategoryModel } from "~/models/productCategory.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
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

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminFaqsCreate, "/no-permission");

  // try to find product category
  const id = params.id as string;
  const productCategory = await productCategoryModel.getById(id);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await faqModel.create({
      productCategoryId: id,
      question: data.question,
      answer: data.answer,
    });
    return redirect(`/dashboard/admin/product-categories/edit/${id}/faqs`);

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it

    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminFaqsCreate, "/no-permission");

  // try to find product category
  const id = params.id as string;
  const productCategory = await productCategoryModel.getById(id);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  return null;
}


/********* COMPONENT *********/

export default function FaqsCreate() {
  const actionData = useActionData<CreateFaqActionData>();

  return (
    <section>
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

