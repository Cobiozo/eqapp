import PageHeader from "~/components/ui/PageHeader";
import { GlobalContext } from "~/root";
import createFormSchema from "~/utils/validation/createFormSchema";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { ActionFunction, LoaderFunction, unstable_parseMultipartFormData } from "@remix-run/node";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { User, userModel } from "~/models/user.server";
import path from "path";
import fs from "fs";
import { useActionData, useLoaderData } from "@remix-run/react";
import { sessionService } from "~/utils/services/session.server";
import PageInfo from "~/components/ui/PageInfo";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import cropImageAccordingToSchema from "~/utils/cropImageAccordingToSchema.server";
import FormImageItem from "~/utils/validation/types/FormImageItem";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { globalMiddleware } from "~/middlewares/global.server";

const schema = createFormSchema({
  firstName: {
    type: "text",
    label: "profile.fields.firstName",
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: "text",
    label: "profile.fields.lastName",
    required: true,
    min: 2,
    max: 100,
  },
  phone: {
    label: "register.fields.phone",
    type: "text",
    required: true,
    minLength: 9,
    maxLength: 9
  },
  password: {
    label: "profile.fields.password",
    type: "password",
    minLength: 9,
    maxLength: 100
  },
  passwordRepeat: {
    label: "profile.fields.passwordRepeat",
    type: "password",
    minLength: 9,
    maxLength: 100
  },
  eqShopUrl: {
    type: "text",
    label: "profile.fields.eqShopUrl",
    required: true,
    min: 2,
    max: 300,
  },
  avatar: {
    label: "profile.fields.avatar",
    type: "image",
    size: {
      width: 180,
      height: 180
    },
    thumb: {
      width: 50,
      height: 50
    },
    accept: ['image/png', 'image/jpeg'],
    maxSize: 5 * 1024 * 1024,
  }
});

/********* ACTION *********/

interface CreatePostActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request }) => {

  // get data from request and validate it
  // try to handle request with file upload
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    if(data.avatar)
      await removeUploadedFile(data.avatar.name);
    return BadRequestError({ data: validationResult });
  }

  // if there are no errors, get the user from session
  const user = await sessionService.getUser(request) as User;

  // if there are no errors, try to update the user
  try {
    // create base data object
    const newData: {
      firstName: string;
      lastName: string;
      phone: string;
      avatar?: string;
      eqShopUrl: string;
    } = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      eqShopUrl: data.eqShopUrl
    }

    // if new avatar is uploaded, save it as well
    if(data.avatar) {
      data.avatar.name = await cropImageAccordingToSchema("avatar", data, schema.avatar as FormImageItem);
      newData.avatar = data.avatar.name;
    }
    await userModel.update(user.id, newData, data.password);

    // delete old image, if there is a new one
    if (data.avatar && user.avatar)
      removeUploadedFile(user.avatar);

    return {
      success: true
    }

  } catch (error: any) {

    // remove new user image, it is not needed anymore
    if (data.avatar)
      removeUploadedFile(data.avatar.name);

    // let errorBoundary handle it
    throw error;
   }
};

/********* LOADER *********/
interface LoaderData {
  user: User
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  const user = await sessionService.getUser(request);

  return {
    user
  }
}

/********* COMPONENT *********/

export default function Profile() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreatePostActionData>();
  const { user } = useLoaderData<LoaderData>();

  return (
    <section className="w-fit mx-auto">
      <AdminPageHeader returnLink="/dashboard">
        {t("profile.title")}
      </AdminPageHeader>
      <PageInfo>
        {t("profile.info")}
      </PageInfo>
      <ValidationForm
        collection="profile"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={user}
      />
    </section>
  );
}

