import type { SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FiSend } from "react-icons/fi";
import Button from "~/components/client/Button";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Alert from "~/components/ui/Alert";
import Animated from "~/components/ui/Animated";
import DecoratedImageGold from "~/components/ui/DecoratedImageGold";
import InputField from "~/components/ui/InputField";
import SectionTitle from "~/components/ui/SectionTitle";
import WysiwygField from "~/components/ui/Wysiwyg";
import config from "~/config";
import { globalMiddleware } from "~/middlewares/global.server";
import { boardItemModel } from "~/models/boardItem.server";
import { languageModel } from "~/models/language.server";
import type { User} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import mailService from "~/utils/services/mail.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  name: {
    label: "joinUs.fields.name",
    type: "text",
    required: true,
  },
  email: {
    label: "joinUs.fields.email",
    type: "email",
    required: true,
  },
  phone: {
    label: "joinUs.fields.phone",
    type: "text",
    required: true,
  },
  content: {
    type: "wysiwyg",
    label: "joinUs.fields.content",
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

  // if user is logged, he is already cooperating with us
  // so -> get out
  if (await sessionService.isLogged(request))
    return redirect("/dashboard");

  // otherwise load user's mentor info
  const user = await unloggedUserService.getUnloggedUserData(request);
  const mentor = await userModel.getById(user!.mentorId || config.defaultMentorId);
  if (!mentor)
    return BadRequestError({ message: "common.unexpectedErrorDescription" });

  // send message to partner
  const t = translateService.translate;
  const mentorLang = await languageModel.getById(mentor.languageId);
  await mailService.sendMail(
    mentor.email,
    t(mentorLang!.name, "mails.contactMail.subject"),
    t(mentorLang!.name, "mails.contactMail.text", `${data.name} (${data.email} | ${data.phone})`, data.content)
  );

  return { success: true };
};

type LoaderData = {
  mentor: User;
  description: Record<SupportedLanguage, string> | null;
  title: Record<SupportedLanguage, string> | null;
}
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // if user is logged, he is already cooperating with us
  // so -> get out
  if (await sessionService.isLogged(request))
    return redirect("/dashboard");

  // otherwise load user's mentor info
  const user = await unloggedUserService.getUnloggedUserData(request);
  const mentor = await userModel.getById(user!.mentorId || config.defaultMentorId);

  // also load page details (description)
  const pageId = "6a67e5cb-ea05-45d9-b80d-43dc61b86647";
  const board = await boardItemModel.getById(pageId);
  const description = board?.text || null;
  const title = board?.name || null;

  return {
    mentor,
    description,
    title
  }
}

export default function JoinUsPage() {
  const { mentor, description, title } = useLoaderData<LoaderData>();
  const { lang: currentLang, t } = useContext(GlobalContext);
  const actionData = useActionData<CreatePostActionData>();

  return (
    <section>
      <AdminPageHeader>
        {title?.[currentLang] || ""}
      </AdminPageHeader>
      <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
        <WysiwygGeneratedContent content={description?.[currentLang] || ""} />
      </div>
      <section className="text-center">
        <SectionTitle>
          {t("joinUs.title")}
        </SectionTitle>
        <DecoratedImageGold
          src={ mentor.avatar ? "/uploads/" + mentor.avatar : '/images/no-avatar.webp'}
          className="mx-auto"
        />
        <strong className="mt-6 block">
          {mentor.firstName + " " + mentor.lastName}
        </strong>
        <Form method="post" encType="multipart/form-data">
          {actionData?.error && (
            <Animated
              animation="fadeInUp"
            >
              <Alert
                className="rounded-lg mx-auto"
                variant="danger"
                title={t("joinUs.error")}
              >
                {t("joinUs.errorDescription")}
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
                title={t("joinUs.messageSent")}
              >
                {t("joinUs.messageSentDescription")}
              </Alert>
            </Animated>
          )}
          { !actionData?.success && (
            <>
              <InputField
                className="mx-auto w-fit"
                name="name"
                label="joinUs.fields.name"
                type="text"
                required
              />
              <InputField
                className="mx-auto w-fit"
                name="email"
                label="joinUs.fields.email"
                type="email"
                required
              />
              <InputField
                className="mx-auto w-fit"
                name="phone"
                label="joinUs.fields.phone"
                type="tel"
                required
              />
              <WysiwygField
                className="mx-auto w-full max-w-2xl h-62"
                name="content"
                label="joinUs.fields.content"
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
          </div>
        </Form>
      </section>
    </section>
  );

}

