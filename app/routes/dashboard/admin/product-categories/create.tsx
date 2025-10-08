import { PermissionName, } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { productCategoryModel } from "~/models/productCategory.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  name: {
    type: "textMultiLang",
    label: "productCategory.fields.name",
    required: true,
    min: 2,
    max: 150,
  },
  image: {
    type: "image",
    label: "productCategory.fields.image",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
    required: true,
  },
  imageBig: {
    type: "image",
    label: "productCategory.fields.imageBig",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
    required: true,
  },
  descriptionBefore: {
    type: "wysiwygMultiLang",
    label: "productCategory.fields.descriptionBefore",
    minLength: 2,
    modules: {
      toolbar: [
        [{ 'header': [2, false] }],
        ['bold', 'italic', 'underline','strike', { 'color': [] }, 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, { 'align': [] }],
        ['link', 'image', "video"],
        ['clean']
      ],
    },
    formats: [
      'header',
      'bold', 'italic', 'underline', 'strike', 'color', 'blockquote',
      'list', 'bullet', 'indent', 'align',
      'link', 'image', 'video'
    ]
  },
  descriptionAfter: {
    type: "wysiwygMultiLang",
    label: "productCategory.fields.descriptionAfter",
    minLength: 2,
    modules: {
      toolbar: [
        [{ 'header': [2, false] }],
        ['bold', 'italic', 'underline','strike', { 'color': [] }, 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, { 'align': [] }],
        ['link', 'image', "video"],
        ['clean']
      ],
    },
    formats: [
      'header',
      'bold', 'italic', 'underline', 'strike', 'color', 'blockquote',
      'list', 'bullet', 'indent', 'align',
      'link', 'image', 'video'
    ]
  },
});

/********* ACTION *********/
interface CreateProductCategoryActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsCategoryCreate, "/no-permission");

  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request);

  // CLEANUP FUNC
  const cleanup = async () => {
    cleanupWysiwygImages(data.descriptionBefore);
    cleanupWysiwygImages(data.descriptionAfter);
    if(data?.image)
      removeUploadedFile(data.image.name);
    if(data?.imageBig)
      removeUploadedFile(data.imageBig.name);
  }
 
  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    await productCategoryModel.create({
      name: data.name,
      descriptionBefore: data.descriptionBefore,
      descriptionAfter: data.descriptionAfter,
      image: data.image.name,
      imageBig: data.imageBig.name,
    });
    return redirect("/dashboard/admin/product-categories")

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it
    await cleanup();
    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsCategoryCreate, "/no-permission");

  return null;
}


/********* COMPONENT *********/

export default function ProductCategoryCreate() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreateProductCategoryActionData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/product-categories">
        {t("productCategory.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="productCategory"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}

