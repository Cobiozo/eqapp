import AdminPageHeader   from "~/components/ui/AdminPageHeader";
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
import type { Certificate} from "~/models/certificate.server";
import { certificateModel } from "~/models/certificate.server";
import { PermissionName } from "@prisma/client";
import type { DbData } from "~/utils/PageFormBase.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";


const schema =  createFormSchema({
  title: {
    type: "textMultiLang",
    label: "certificates.fields.title",
    required: true,
    min: 2,
    max: 150,
  },
  description: {
    type: "wysiwygMultiLang",
    label: "certificates.fields.description",
    minLength: 2,
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline','strike', 'blockquote'],
      ],
    },
    formats: [
      'bold', 'italic', 'underline', 'strike', 'blockquote',
    ],
  },
  image: {
    type: "image",
    label: "certificates.fields.image",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
  },
  url: {
    type: "text",
    label: "certificates.fields.url",
    min: 2,
    max: 150,
  },
});

/********* ACTION *********/
interface UpdateCertificateActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCertificatesEdit, "/no-permission");

  // get certificate from DB
  // if it doesn't exist, redirect to 404
  const certificate = await certificateModel.getById(params.id as string);
  if(!certificate)
    return redirect("/404");

  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request, certificate);

  // CLEANUP FUNC
  const cleanup = async () => {
    if(data?.image)
      removeUploadedFile(data.image.name);
  }
 
  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    await certificateModel.update(
      params.id as string,
      {
        title: data.title,
        description: data.description,
        image: data.image ? data.image.name : certificate.image,
        url: data.url,
      });

    // if image was changed, remove old one
    if (data.image)
      await removeUploadedFile(certificate.image);

    return redirect("/dashboard/admin/certificates?certificateUpdated=true")
  
  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = Certificate & {
  dbData: DbData
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCertificatesEdit, "/no-permission");

  // get certificate from DB
  // if it doesn't exist, redirect to 404
  const certificate = await certificateModel.getById(params.id as string);
  if(!certificate)
    return redirect("/404");

  return certificate;
}

/********* COMPONENT *********/

export default function CertificateEdit() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<UpdateCertificateActionData>();
  const certificate = useLoaderData<LoaderData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/certificates">
        {t("certificates.edit.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="certificates"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={certificate}
      />
    </section>
  );
}

