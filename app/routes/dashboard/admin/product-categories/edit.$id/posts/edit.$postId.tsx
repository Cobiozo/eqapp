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
import type { Post} from "~/models/post.server";
import { postModel } from "~/models/post.server";
import { PermissionName } from "@prisma/client";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import compareContentAndRemoveUnusedImages from "~/utils/compareContentAndRemoveUnusedImages.server";
import { productCategoryModel } from "~/models/productCategory.server";

const schema =  createFormSchema({
  title: {
    type: "textMultiLang",
    label: "posts.fields.title",
    required: true,
    min: 2,
    max: 150,
  },
  image: {
    type: "image",
    label: "posts.fields.image",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
  },
  content: {
    type: "wysiwygMultiLang",
    label: "posts.fields.content",
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
});

/********* ACTION *********/
interface UpdatePostActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPostsEdit, "/no-permission");

  // try to find product category
  const id = params.id as string;
  const productCategory = await productCategoryModel.getById(id);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  // get post from DB
  // if it doesn't exist, redirect to 404
  const post = await postModel.getById(params.postId as string);
  if(!post)
    return redirect("/404");

  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request, post);

  // CLEANUP FUNC
  const cleanup = async () => {
    cleanupWysiwygImages(data.content);
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
    await postModel.update(
      params.postId as string,
      {
        title: data.title,
        content: data.content,
        image: data.image ? data.image.name : post.image,
      });

    // if image was changed, remove old one
    if (data.image)
      await removeUploadedFile(post.image);

    for(const lang of Object.keys(post.content)) {
      await compareContentAndRemoveUnusedImages(post.content[lang], data.content[lang]);
    }

    return redirect(`/dashboard/admin/product-categories/edit/${id}/posts?postUpdated=true`)
  
  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = Post;

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPostsEdit, "/no-permission");

  // try to find product category
  const id = params.id as string;
  const productCategory = await productCategoryModel.getById(id);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  // get post from DB
  // if it doesn't exist, redirect to 404
  const post = await postModel.getById(params.postId as string);
  if(!post)
    return redirect("/404");

  return post;
}

/********* COMPONENT *********/

export default function PostEdit() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<UpdatePostActionData>();
  const post = useLoaderData<LoaderData>();

  return (
    <section>
      <ValidationForm
        collection="posts"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={post}
      />
    </section>
  );
}

