import { PersonalizedContentType, SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import Alert from "~/components/ui/Alert";
import Animated from "~/components/ui/Animated";
import Button from "~/components/ui/Button";
import InputField from "~/components/ui/InputField";
import PageHeader from "~/components/ui/PageHeader";
import WysiwygField from "~/components/ui/Wysiwyg";
import { globalMiddleware } from "~/middlewares/global.server";
import { personalizedContentModel } from "~/models/personalizedContent.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import mailService from "~/utils/services/mail.server";
import translateService from "~/utils/services/translate.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  name: {
    label: "whatAmIDoingHere.fields.name",
    type: "text",
    required: true,
  },
  email: {
    label: "whatAmIDoingHere.fields.email",
    type: "email",
  },
  content: {
    type: "wysiwyg",
    label: "whatAmIDoingHere.fields.content",
    required: true,
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline','strike', 'blockquote'],
      ],
    },
    formats: [
      'bold', 'italic', 'underline', 'strike', 'blockquote',
    ],
  },
});

interface CreatePostActionData {
  error?: {
    message: string;
  },
  success?: true
}

export const action: ActionFunction = async ({ request }) => {

  // get data from request and validate it
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request);

  // validate data
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ message: "common.unexpectedErrorDescription" });

  // send info about unexpected visit to Kamil
  const t = translateService.translate;
  await mailService.sendMail(
    process.env.ADMIN_MAIL as string,
    t(SupportedLanguage.pl, "mails.unexpectedVisitMail.subject"),
    t(SupportedLanguage.pl, "mails.unexpectedVisitMail.text", data.content, data.name + (data.email ? ` (${data.email})` : ""))
  );

  return { success: true };
};

type LoaderData = {
  title: Record<SupportedLanguage, string>;
  content: Record<SupportedLanguage, string>;
}
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  const pageData = await personalizedContentModel.getByType(PersonalizedContentType.WHAT_ARE_YOU_DOING_HERE);
  return {
    title: pageData?.title,
    content: pageData?.content,
  }
}


export default function WhatAmIDoingHere() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const actionData = useActionData<CreatePostActionData>();
  const { title, content } = useLoaderData<LoaderData>();

  return (
    <section>
      <PageHeader>
        {title[currentLang] || ""}
      </PageHeader>
      <Form method="post" encType="multipart/form-data">
        <WysiwygGeneratedContent content={content[currentLang] || ""} />
          {actionData?.error && (
            <Animated
              animation="fadeInUp"
            >
              <Alert
                className="rounded-lg mx-auto"
                variant="danger"
                title={t("whatAmIDoingHere.error")}
              >
                {t("whatAmIDoingHere.errorDescription")}
              </Alert>
            </Animated>
          )}
          {actionData?.success && (
            <Animated
              animation="fadeInUp"
            >
              <Alert
                className="rounded-lg mx-auto"
                variant="success"
                title={t("whatAmIDoingHere.messageSent")}
              >
                {t("whatAmIDoingHere.messageSentDescription")}
              </Alert>
            </Animated>
          )}
          { !actionData?.success && (
            <>
              <InputField
                className="mx-auto w-fit"
                name="name"
                label="whatAmIDoingHere.fields.name"
                type="text"
                required
              />
              <InputField
                className="mx-auto w-fit"
                name="email"
                label="whatAmIDoingHere.fields.email"
                type="email"
              />
              <WysiwygField
                className="mx-auto w-full max-w-2xl h-62"
                name="content"
                label="whatAmIDoingHere.fields.content"
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                  ],
                }}
                formats={[
                  'bold', 'italic', 'underline', 'strike', 'blockquote',
                ]}
                required
              />
            </>
          )}
          <div className="flex justify-center items-center gap-2 w-fit mx-auto flex-col">
            { !actionData?.success && (
              <Button
                className="mx-auto my-0"
                icon={FiSend}
                type="submit"
              >
                {t("common.submit")}
              </Button>
            )}
            { !actionData?.success && (
              <Button
                variant="secondary"
                to="/dashboard"
                className="my-0 mx-auto"
                icon={FaArrowRight}
                type="button"
              >
                {t("whatAmIDoingHere.skip")}
              </Button>
            )}
            { actionData?.success && (
              <Button
                to="/dashboard"
                className="my-0 mx-auto"
                icon={FaArrowRight}
                type="button"
              >
                {t("whatAmIDoingHere.goToApp")}
              </Button>
            )}
          </div>
      </Form>
    </section>
  )
}
