import PageHeader from "~/components/ui/PageHeader";
import { GlobalContext } from "~/root";
import createFormSchema from "~/utils/validation/createFormSchema";
import { useContext } from "react";
import type { ActionFunction } from "@remix-run/node";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { userModel } from "~/models/user.server";
import { Form, Link, useActionData } from "@remix-run/react";
import InputField from "~/components/ui/InputField";
import Button from "~/components/ui/Button";
import { UnauthorizedError } from "~/utils/errors/Unauthorized.server";
import { sessionService } from "~/utils/services/session.server";
import Alert from "~/components/ui/Alert";
import Animated from "~/components/ui/Animated";
import { IoKeyOutline } from "react-icons/io5";
import { RoleName } from "@prisma/client";
import { CandidateQuizFull } from "~/models/candidateQuiz.server";

const schema = createFormSchema({
  email: {
    label: "register.fields.email",
    type: "email",
    required: true,
  },
  password: {
    label: "register.fields.password",
    type: "password",
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

  // get data from request
  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ message: "common.unexpectedErrorDescription" });

  // if data is okay, try to login
  // if login fails, return error
  // if login succeeds, redirect to /admin/dashboard
  const user = await userModel.verifyLogin(
    data.email as string,
    data.password as string
  );

  if (!user)
    return UnauthorizedError("login.errors.invalidCredentials");

  // check if user is active
  if (!user.verified)
    return UnauthorizedError("login.errors.inactiveUser");

  let redirectTo = "/resources/refresh-subscription";

  // check if user is eligible to do a quiz
  const userFull = await userModel.getByIdWithRole(user.id);
  if (userFull!.role!.name === RoleName.CANDIDATE_PARTNER) {

    // if is eligible, check if there is any quiz left
    // get quiz by priority
    // of there is set refresh func with return url
    const currentQuiz = await userModel.getCurrentQuiz(user.id) as CandidateQuizFull;
    if (!currentQuiz)
      redirectTo = "/resources/refresh-subscription?returnUrl=/dashboard?afterQuiz=true";
  }

  return sessionService.createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo
  });

};

/********* COMPONENT *********/

export default function Login() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreatePostActionData>();

  return (
    <section className="w-fit mx-auto">
      <Form method="post">
        <PageHeader>
          {t("login.title")}
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
        <InputField
          className="mx-auto w-fit"
          name="email"
          label="login.fields.email"
          type="email"
        />
        <InputField
          className="mx-auto w-fit"
          name="password"
          label="login.fields.password"
          type="password"
        />
        <Button
          className="mx-auto mt-10"
          icon={IoKeyOutline}
          type="submit"
        >
          {t("login.actionLogin")}
        </Button>
        <div className="py-4 mt-8 text-sm text-center border-t border-light-border dark:border-medium-darker">
          <div>
            {t("login.forgotPassword")}
            <Link className="link mx-2" to="/dashboard/auth/forgot-password">
              {t("login.actionReset")}
            </Link>
          </div>
        </div>
      </Form>
    </section>
  );
}

