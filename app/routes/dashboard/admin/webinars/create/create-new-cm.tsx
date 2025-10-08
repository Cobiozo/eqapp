import type { Language, Role} from "@prisma/client";
import { WebinarVariant } from "@prisma/client";
import { PermissionName, RoleName, SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import type { DbData} from "~/utils/PageFormBase.server";
import { createPageBaseLoader } from "~/utils/PageFormBase.server";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { CMWebinarAccessType, cm } from "~/utils/cm.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  variant: {
    type: "select",
    label: "webinars.fields.variant",
    required: true,
    options: Object.keys(WebinarVariant).map((key) => ({
      value: key,
      label: "webinars.variants." + key,
    })),
    optionsConfig: {
      translate: true,
    }
  },
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

export const action: ActionFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsCreate, "/no-permission");

  // get data from request and validate it
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
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

    // create clickMeeting webinar
    const web = await cm.createWebinar({
      name: data.title[SupportedLanguage.pl],
      startsAt: data.startAt,
      accessType: CMWebinarAccessType.PUBLIC,
    });

    // create webinar record in the database
    await webinarModel.create({
      title: data.title,
      description: data.description,
      startAt: data.startAt,
      presenter: data.presenter,
      variant: data.variant,
      cmId: web.room.id,
      embedUrl: web.room.embed_room_url,
      isExternal: false,
      isWorkshop: data.isWorkshop,
      poster: data.poster?.name
    },
    data.supportedLanguages
    );

    // redirect to the this webinars
    return redirect("/dashboard/admin/webinars?webinarCreated=true");

  } catch (error: any) {
    await cleanUp();
    console.log("error", error);
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type Loader = DbData;
export const loader: LoaderFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsCreate, "/no-permission");
  
  // if found, just dbData
  return await createPageBaseLoader(schema);
}

/********* COMPONENT *********/
export default function PageWebinarCreate() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<ActionData>();
  const dbData = useLoaderData<Loader>();

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/admin/webinars`}>
        {t("webinars.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="webinars"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        dbData={dbData}
      />
    </section>
  );
}
