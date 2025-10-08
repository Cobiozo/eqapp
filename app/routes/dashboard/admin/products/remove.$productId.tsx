import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { productModel } from "~/models/product.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsRemove, "/no-permission");

  // try to find product, if not found, redirect to 404
  const product = await productModel.getById(params.productId as string);
  if (!product)
    return redirect("/404");

  // remove product
  await productModel.deleteById(product.id);

  // remove it's image as well
  if (product.image)
    await removeUploadedFile(product.image);

  // remove wysiwyg images
  for (const lang of Object.keys(product.description)) {
    await cleanupWysiwygImages(product.description[lang]);
  }
  

  // redirect to products list
  return redirect("/dashboard/admin/products?productRemoved=true");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsRemove, "/no-permission");

  // try to find product, if not found, redirect to products list
  const product = await productModel.getById(params.productId as string);
  if (!product)
    return redirect("/dashboard/admin/products");

  return null;

}

export default function RemoveProduct() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/products");
  }

  return (
    <>
      <Confirm
        title={t("products.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("products.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
