import { PermissionName, ProductCategory, } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import ValidationForm from "~/components/features/ValidationForm";
import { productCategoryModel } from "~/models/productCategory.server";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import compareContentAndRemoveUnusedImages from "~/utils/compareContentAndRemoveUnusedImages.server";
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
  },
  imageBig: {
    type: "image",
    label: "productCategory.fields.imageBig",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
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
  await sessionService.requirePermission(request, PermissionName.adminProductsCategoryEdit, "/no-permission");

  // check if productCategory exists
  const productCategory = await productCategoryModel.getById(params.id as string);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  // get data from form
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request, productCategory);
  
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
    await productCategoryModel.update(
      params.id as string,
      {
        name: data.name,
        descriptionBefore: data.descriptionBefore,
        descriptionAfter: data.descriptionAfter,
        image: data.image ? data.image.name : undefined,
        imageBig: data.imageBig ? data.imageBig.name : undefined,
      }
    );

    if(productCategory.descriptionBefore) {
      for(const lang of Object.keys(productCategory.descriptionBefore)) {
        await compareContentAndRemoveUnusedImages(productCategory.descriptionBefore[lang], data.descriptionBefore[lang]);
      }
    }

    if(productCategory.descriptionAfter) {
      for(const lang of Object.keys(productCategory.descriptionAfter)) {
        await compareContentAndRemoveUnusedImages(productCategory.descriptionAfter[lang], data.descriptionAfter[lang]);
      }
    }

    if(productCategory.image && data.image) {
      await removeUploadedFile(productCategory.image);
    }

    if(productCategory.imageBig && data.imageBig) {
      await removeUploadedFile(productCategory.imageBig);
    }

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
  await sessionService.requirePermission(request, PermissionName.adminProductsCategoryEdit, "/no-permission");

  return await productCategoryModel.getById(params.id as string);
}


/********* COMPONENT *********/

export default function ProductCategoryEdit() {
  const actionData = useActionData<CreateProductCategoryActionData>();
  const productCategory = useLoaderData<ProductCategory>();

  return (
    <section>
      <ValidationForm
        collection="productCategory"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={productCategory}
      />
    </section>
  );
}

