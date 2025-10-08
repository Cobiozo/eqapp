import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { postModel } from "~/models/post.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPostsRemove, "/no-permission");

  // try to find post, if not found, redirect to 404
  const post = await postModel.getById(params.postId as string);
  if (!post)
    return redirect("/404");

  // remove post
  await postModel.deleteById(post.id);

  // remove it's image as well
  if (post.image)
    await removeUploadedFile(post.image);

  // remove wysiwyg images
  for (const lang of Object.keys(post.content)) {
    await cleanupWysiwygImages(post.content[lang]);
  }

  // redirect to posts list
  return redirect("/dashboard/admin/product-categories/edit/" + post.productCategoryId + "/posts?postRemoved=true");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPostsRemove, "/no-permission");

  // try to find post, if not found, redirect to posts list
  const post = await postModel.getById(params.postId as string);
  if (!post)
    return redirect("/dashboard/admin/product-categories/edit/" + params.id + "/posts");

  return null;

}

export default function RemovePost() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { id } = useParams();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/product-categories/edit/" + id + "/posts");
  }

  return (
    <>
      <Confirm
        title={t("posts.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("posts.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
