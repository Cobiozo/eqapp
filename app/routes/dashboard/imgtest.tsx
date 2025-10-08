import type { SupportedLanguage } from "@prisma/client";
import { ActivityType, NotificationContentType, RoleName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useContext } from "react";
import { roleModel } from "~/models/role.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { useActionData } from "@remix-run/react";
import PageHeader from "~/components/ui/PageHeader";
import ValidationForm from "~/components/features/ValidationForm";
import { PushNotification } from "~/utils/server/pwa-utils.server";
import { PrismaError } from "~/utils/errors/PrismaErrors.server";
import { ConflictError } from "~/utils/errors/Conflict.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import cropImageAccordingToSchema from "~/utils/cropImageAccordingToSchema.server";
import type FormImageItem from "~/utils/validation/types/FormImageItem";
import translateService from "~/utils/services/translate.server";
import { languageModel } from "~/models/language.server";
import mailService from "~/utils/services/mail.server";
import { globalMiddleware } from "~/middlewares/global.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";

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

interface CreatePostActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // get data from request and validate it
  // try to handle request with file upload
  const uploadHandler = fileUploadHandler();

  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  return { success: true }

  
  const data = await parseFormData(formData, schema);

  try {

    // validate data and throw error if not valid
    // also remove uploaded file if there is an error
    const validationResult = await validateFormInAction(data, schema);
    if(validationResult !== true) {
      if(data.avatar)
        await removeUploadedFile(data.avatar.name);
      if (data.avatarTwo)
        await removeUploadedFile(data.avatarTwo.name);
      return BadRequestError({ data: validationResult });
    }

    /*if(data.avatar)
      await removeUploadedFile(data.avatar.name);
    if (data.avatarTwo)
      await removeUploadedFile(data.avatarTwo.name);*/

    return null;
  } catch (error: any) {
   
    if(data.avatar)
      await removeUploadedFile(data.avatar.name);
    if (data.avatarTwo)
      await removeUploadedFile(data.avatarTwo.name);

    // let errorBoundary handle it
    throw error;
    }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  return redirect("/dashboard");
}

/********* COMPONENT *********/
export default function RegisterClient() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreatePostActionData>();

  return (
    <section className="w-fit mx-auto">
      <PageHeader>
        {t("join.title")}
      </PageHeader>
      <ValidationForm
        collection="register"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}
