import { PermissionName, } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { postModel } from "~/models/post.server";
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

const schema =  createFormSchema({
  title: {
    type: "textMultiLang",
    label: "posts.fields.title",
    required: true,
    min: 2,
    max: 150,
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
  image: {
    type: "image",
    label: "posts.fields.image",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
    required: true,
  },
});

/********* ACTION *********/
interface CreatePostActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPostsCreate, "/no-permission");

  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request);

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
    await postModel.create({
      title: data.title,
      content: data.content,
      image: data.image.name,
    });
    return redirect("/dashboard/admin/posts")

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it
    await cleanup();
    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPostsCreate, "/no-permission");

  return null;
}


/********* COMPONENT *********/

export default function PostsCreate() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreatePostActionData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/posts">
        {t("posts.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="posts"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}