import AdminPageHeader   from "~/components/ui/AdminPageHeader";
import { GlobalContext } from "~/root";
import createFormSchema from "~/utils/validation/createFormSchema";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { sessionService } from "~/utils/services/session.server";
import type { Product} from "~/models/product.server";
import { productModel } from "~/models/product.server";
import { PermissionName } from "@prisma/client";
import type { DbData } from "~/utils/PageFormBase.server";
import { userModel } from "~/models/user.server";
import { globalMiddleware } from "~/middlewares/global.server";

const schema = createFormSchema({
  refUrl: {
    type: "text",
    label: "products.fields.refUrl",
    required: true,
  },
});


/********* ACTION *********/
interface UpdateProductActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.productsAccess, "/no-permission");

  // get product from DB
  // if it doesn't exist, redirect to 404
  const product = await productModel.getById(params.id as string);
  if(!product)
    return redirect("/404");

  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request, product);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await userModel.updateProductRefLink(
      await sessionService.getUserId(request) as string,
      params.id as string,
      data.refUrl
    );

    return redirect("/dashboard/products/" + product.categoryId + "?productUpdated=true")
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
  await globalMiddleware({ request, params });
  
  // check permissions
  await sessionService.requirePermission(request, PermissionName.productsAccess, "/no-permission");

  // get product from DB
  // if it doesn't exist, redirect to 404
  const product = await productModel.getById(params.id as string);
  if(!product)
    return redirect("/404");

  // try to find userProduct for this product
  const userProduct = await userModel.getUserProduct(
    await sessionService.getUserId(request) as string,
    params.id as string
  );

  if (!userProduct)
    return {};
  else
    return { refUrl: userProduct.url }

}

/********* COMPONENT *********/

export default function ProductEdit() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<UpdateProductActionData>();
  const product = useLoaderData<LoaderData>();

  return (
    <section>
      <AdminPageHeader returnLink={"/dashboard/products/" + product.categoryId}>
        {t("products.edit.title")}
      </AdminPageHeader>
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

