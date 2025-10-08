import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { postModel } from "~/models/post.server";
import { productModel } from "~/models/product.server";
import { productCategoryModel } from "~/models/productCategory.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsCategoryRemove, "/no-permission");

  // try to find productCategory, if not found, redirect to 404
  const productCategory = await productCategoryModel.getById(params.productCategoryId as string);
  if (!productCategory)
    return redirect("/404");

  // load all posts and products from this category
  const relatedProducts = await productModel.getMany({ categoryId: productCategory.id });
  const relatedPosts = await postModel.getMany({ productCategoryId: productCategory.id });

  // remove productCategory
  await productCategoryModel.deleteById(productCategory.id);

  // remove it's image as well
  if (productCategory.image)
    await removeUploadedFile(productCategory.image);

  if (productCategory.imageBig)
    await removeUploadedFile(productCategory.imageBig);

  // remove wysiwyg images
  for (const lang of Object.keys(productCategory.descriptionBefore)) {
    await cleanupWysiwygImages(productCategory.descriptionBefore[lang]);
  }
  for (const lang of Object.keys(productCategory.descriptionAfter)) {
    await cleanupWysiwygImages(productCategory.descriptionAfter[lang]);
  }

  // we have to also remove all related products and posts images and wysiwyg images
  for (const product of relatedProducts) {
    await removeUploadedFile(product.image);
    for (const lang of Object.keys(product.description)) {
      await cleanupWysiwygImages(product.description[lang]);
    }
  }
  for (const post of relatedPosts) {
    await removeUploadedFile(post.image);
    for (const lang of Object.keys(post.content)) {
      await cleanupWysiwygImages(post.content[lang]);
    }
  }

  // redirect to productCategorys list
  return redirect("/dashboard/admin/product-categories?productCategoryRemoved=true");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsCategoryRemove, "/no-permission");

  // try to find productCategory, if not found, redirect to productCategorys list
  const productCategory = await productCategoryModel.getById(params.productCategoryId as string);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  return null;

}

export default function RemoveProductCategory() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/product-categories");
  }

  return (
    <>
      <Confirm
        title={t("productCategory.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("productCategory.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
