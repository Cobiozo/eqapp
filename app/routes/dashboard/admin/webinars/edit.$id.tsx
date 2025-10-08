import type { Language, Role, Webinar} from "@prisma/client";
import { PermissionName, SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import type { DbData} from "~/utils/PageFormBase.server";
import { loadDbDataNeededForForm } from "~/utils/PageFormBase.server";
import { webinarModel } from "~/models/webinar.server";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import compareContentAndRemoveUnusedImages from "~/utils/compareContentAndRemoveUnusedImages.server";
import { cm } from "~/utils/cm.server";

const prepareSchema = (isExternal: boolean) => createFormSchema({
  title: {
    type: "textMultiLang",
    label: "webinars.fields.title",
    required: true,
    min: 2,
    max: 150,
  },
  startAt: {
    type: "date",
    label: "webinars.fields.startAt",
    required: true,
    min: new Date(),
  },
  ...(
    isExternal ? {
      embedUrl: {
      type: "text",
      label: "webinars.fields.embedUrl",
      min: 2,
      max: 250,
      required: true
    },
    embedCode: {
      type: "text",
      label: "webinars.fields.embedCode",
      description: "webinars.fields.embedCodeDescription",
      min: 2,
      required: true,
    },
  } : {}),
  description: {
    type: "wysiwygMultiLang",
    label: "webinars.fields.description",
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
  presenter: {
    type: "text",
    label: "webinars.fields.presenter",
    required: true,
    min: 2,
    max: 150,
  },
  supportedLanguages: {
    type: "DBMultiSelect",
    label: "webinars.fields.supportedLanguages",
    model: "Language",
    required: true,
    optionsConfig: {
      label: (item: Role) => item.name,
      ignore: (item: Language) => item.name === SupportedLanguage.intl,
      chooseAllByDefault: true,
    },
  },
  poster: {
    type: "image",
    label: "webinars.fields.poster",
    accept: ['image/png', 'image/jpeg'],
    maxSize: 3 * 1024 * 1024,
  },
  isWorkshop: {
    type: "boolean",
    label: "webinars.fields.isWorkshop",
    description: "webinars.fields.isWorkshopDescription",
  },
});

/********* ACTION *********/
interface ActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsEdit, "/no-permission");

  // try to find the webinar to edit
  // if not found, redirect to 404
  const webinar = await webinarModel.getById(params.id as string);
  if (!webinar)
    return redirect("/404");

  // get data from request and validate it
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const schema = prepareSchema(webinar.isExternal);
  const data = await parseFormData(formData, schema, request);

  const cleanUp = async () => {
    cleanupWysiwygImages(data.description);
    if (data?.poster) {
      removeUploadedFile(data.poster.name);
    }
  }

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanUp();
    return BadRequestError({ data: validationResult });
  }

   // check if startAt is in the future
   if (new Date(data.startAt).getTime() < Date.now()) {
    await cleanUp();
    return BadRequestError({ data: { startAt: "common.validation.dateInPast" } });
   }

  try {

    // if isExternal is false update clickMeeting webinar
    if (!webinar.isExternal) {
      await cm.updateWebinar({
        id: webinar.cmId,
        name: data.title[SupportedLanguage.pl],
        startsAt: data.startAt,
      });

       // update webinar record in the database
      await webinarModel.update(
        params.id as string,
        {
          title: data.title,
          description: data.description,
          startAt: data.startAt,
          presenter: data.presenter,
          isWorkshop: data.isWorkshop,
          poster: data.poster ? data.poster.name : webinar.poster,
        },
        data.supportedLanguages
      );
    }

    // if isExternal is true update webinar record in the database
    // remember about embedUrl and embedCode that could change here
    if (webinar.isExternal) {
      await webinarModel.update(
        params.id as string,
        {
          title: data.title,
          description: data.description,
          startAt: data.startAt,
          presenter: data.presenter,
          isWorkshop: data.isWorkshop,
          poster: data.poster ? data.poster.name : webinar.poster,
          embedUrl: data.embedUrl,
          embedCode: data.embedCode,
        },
        data.supportedLanguages
      );
    }

    // if poster was changed, remove old one
    if (data.poster && webinar.poster)
      removeUploadedFile(webinar.poster);

    // remove unused images from wysiwyg
    for(const lang of Object.keys(webinar.description)) {
      await compareContentAndRemoveUnusedImages(webinar.description[lang], data.description[lang]);
    }

    // redirect to the this webinars
    return redirect("/dashboard/admin/webinars?webinarUpdated=true");
  } catch (error: any) {
    await cleanUp();
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type Loader = Webinar & { dbData: DbData };
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsEdit, "/no-permission");

  // try to find the webinar
  // if not found, go to 404
  const webinar = await webinarModel.getById(params.id as string, ["supportedLanguages"]);
  if (!webinar)
    return redirect("/404");

  // if found, return it
  return {
    ...webinar,
    dbData: await loadDbDataNeededForForm(prepareSchema(webinar.isExternal)),
  }
}

/********* COMPONENT *********/
export default function WebinarEdit() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<ActionData>();
  const { dbData, ...webinar } = useLoaderData<Loader>();
  
  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/webinars">
        {t("webinars.edit.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="webinars"
        variant="edit"
        schema={prepareSchema(webinar.isExternal)}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={webinar}
        dbData={dbData}
      />
    </section>
  );
}
