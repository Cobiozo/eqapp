import PageHeader from "~/components/ui/PageHeader";
import { GlobalContext } from "~/root";
import createFormSchema from "~/utils/validation/createFormSchema";
import { useContext } from "react";
import type { ActionFunction } from "@remix-run/node";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { userModel } from "~/models/user.server";
import { Form, useActionData } from "@remix-run/react";
import InputField from "~/components/ui/InputField";
import Button from "~/components/ui/Button";
import { BiRefresh } from "react-icons/bi";
import { UnauthorizedError } from "~/utils/errors/Unauthorized.server";
import Alert from "~/components/ui/Alert";
import Animated from "~/components/ui/Animated";
import randomString from "~/utils/randomString";
import mailService from "~/utils/services/mail.server";
import translateService from "~/utils/services/translate.server";

const schema = createFormSchema({
  eqId: {
    label: "forgotPassword.fields.eqId",
    type: "text",
    required: true,
    minLength: 1,
    maxLength: 100
  },
  email: {
    label: "forgotPassword.fields.email",
    type: "email",
    required: true,
  },
});

/********* ACTION *********/

interface CreatePostActionData {
  error?: {
    message: string;
  },
  success?: true
}

export const action: ActionFunction = async ({ request }) => {
  const currentLang = await translateService.getCurrentLang(request);
  const t = translateService.translate;

  // get data from request
  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ message: "common.unexpectedErrorDescription" });

  // if email is okay, try to find user with this email
  const user = await userModel.getByEmail(data.email as string);

  // if user not found or eqId is not the same, return error
  if (!user || user.eqId !== data.eqId)
     return UnauthorizedError("forgotPassword.errors.invalidData");

  // if user found, generate new password and update the user
  const newPassword = randomString(8);
  try {
    userModel.updatePassword(user.id, newPassword);
  } catch (error) {
    return BadRequestError({ message: "common.unexpectedErrorDescription" });
  }

  // send email with new password
  await mailService.sendMail(user.email, t(currentLang, "mails.passwordReset.subject"), t(currentLang, "mails.passwordReset.text", newPassword));

  // return success
  return {
    success: true
  };
};

/********* COMPONENT *********/

export default function ForgotPassword() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreatePostActionData>();

  return (
    <section className="w-fit mx-auto">
      <Form method="post">
        <PageHeader>
          {t("forgotPassword.title")}
        </PageHeader>
        {actionData?.error && (
          <Animated
            animation="fadeInUp"
          >
            <Alert
              variant="danger"
              title={t("common.unexpectedError")}
            >
            {t(actionData.error.message)}
            </Alert>
          </Animated>
        )}
        {actionData?.success && (
          <Animated
            animation="fadeInUp"
          >
            <Alert
              variant="success"
              title={t("forgotPassword.success.title")}
            >
            {t("forgotPassword.success.description")}
            </Alert>
          </Animated>
        )}
        <InputField
          name="eqId"
          label="forgotPassword.fields.eqId"
          type="text"
          className="w-fit mx-auto"
        />
        <InputField
          name="email"
          label="forgotPassword.fields.email"
          type="email"
          className="w-fit mx-auto"
        />
        <Button
          className="mx-auto mt-10"
          icon={BiRefresh}
          type="submit"
        >
          {t("forgotPassword.action")}
        </Button>
      </Form>
    </section>
  );
}

