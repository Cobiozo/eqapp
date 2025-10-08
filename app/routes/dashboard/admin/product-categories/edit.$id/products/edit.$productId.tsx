import createFormSchema from "~/utils/validation/createFormSchema";
import ValidationForm from "~/components/features/ValidationForm";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { sessionService } from "~/utils/services/session.server";
import type { Product} from "~/models/product.server";
import { productModel } from "~/models/product.server";
import { PermissionName } from "@prisma/client";
import type { DbData } from "~/utils/PageFormBase.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import compareContentAndRemoveUnusedImages from "~/utils/compareContentAndRemoveUnusedImages.server";
import { productCategoryModel } from "~/models/productCategory.server";

const schema =  createFormSchema({
  name: {
    type: "textMultiLang",
    label: "products.fields.name",
    required: true,
    min: 2,
    max: 150,
  },
  image: {
    type: "image",
    label: "products.fields.image",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
  },
  description: {
    type: "wysiwygMultiLang",
    label: "products.fields.description",
    required: true,
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
  price: {
    type: "textMultiLang",
    label: "products.fields.price",
    required: true,
    min: 1
  },
  priceOld: {
    type: "textMultiLang",
    label: "products.fields.priceOld",
  },
});


/********* ACTION *********/
interface UpdateProductActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsEdit, "/no-permission");

  // try to find product category
  const id = params.id as string;
  const productCategory = await productCategoryModel.getById(id);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  // get product from DB
  // if it doesn't exist, redirect to 404
  const product = await productModel.getById(params.productId as string);
  if(!product)
    return redirect("/404");

  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request, product);

  // CLEANUP FUNC
  const cleanup = async () => {
    cleanupWysiwygImages(data.description);
    if(data?.image) {
      removeUploadedFile(data.image.name);
    }
  }
 
  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    await productModel.update(
      params.productId as string,
      {
        name: data.name,
        description: data.description,
        image: data.image ? data.image.name : product.image,
        price: data.price,
        priceOld: data.priceOld,
      });

    // if image was changed, remove old one
    if (data.image)
      await removeUploadedFile(product.image);

    for(const lang of Object.keys(product.description)) {
      await compareContentAndRemoveUnusedImages(product.description[lang], product.description[lang]);
    }

    return redirect("/dashboard/admin/product-categories/edit/" + id + "/products?productUpdated=true")
  
  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = Product & {
  dbData: DbData
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsEdit, "/no-permission");

  // try to find product category
  const id = params.id as string;
  const productCategory = await productCategoryModel.getById(id);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  // get product from DB
  // if it doesn't exist, redirect to 404
  const product = await productModel.getById(params.productId as string);
  if(!product)
    return redirect("/404");

  return product;
}

/********* COMPONENT *********/

export default function ProductEdit() {
  const actionData = useActionData<UpdateProductActionData>();
  const product = useLoaderData<LoaderData>();

  return (
    <section>
      <ValidationForm
        collection="products"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={product}
      />
    </section>
  );
}

