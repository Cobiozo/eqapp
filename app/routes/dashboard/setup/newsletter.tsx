import { WebinarVariant } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { FadeInUp } from "~/components/features/AOM";
import Container from "~/components/layout/Container";
import Alert from "~/components/ui/Alert";
import Animated from "~/components/ui/Animated";
import Button from "~/components/ui/Button";
import InputField from "~/components/ui/InputField";
import PageHeader from "~/components/ui/PageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { gr } from "~/utils/gr.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  firstName: {
    type: "text",
    label: "newsletter.fields.firstName",
    required: true,
  },
  lastName: {
    type: "text",
    label: "newsletter.fields.lastName",
    required: true,
  },
  email: {
    type: "email",
    label: "newsletter.fields.email",
    required: true,
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
  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ message: "common.unexpectedErrorDescription" });

  // if everything is all right we can save user to getResponse
  // which one? if in redirect url there is forWebinar part somewhere, we can check what kind of webinar it is 
  // also if in redirect url is "details" part in url, we can do the same (check id after details part)
  // if business, we can save this user to business campaign
  // if not -> just save him to client one
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");
  if (redirectTo) {
    const redirectUrl = new URL(url.origin + redirectTo);

    const getRelatedWebinarId = () => {

      // try to find forWebinar param in url
      // if there is, just use it as webinarID
      const forWebinar = redirectUrl.searchParams.get("forWebinar");
      if (forWebinar)
        return forWebinar;

      // if not, try to check if there is details in url
      // if there is, try to find what is after details and treat it as webinarId
      if(redirectUrl.pathname.includes("details")) {
        const parts = redirectUrl.pathname.split("/");
        const webinarId = parts[parts.length - 1];
        return webinarId;
      }

      return null;
    }

    // try to find webinar with this id
    const webinarId = getRelatedWebinarId();
    if (webinarId) {
      const webinar = await webinarModel.getById(webinarId);
      const variant = webinar?.variant === WebinarVariant.BUSINESS
        ? "partner"
        : "client";
    await gr.saveContactToCampaign({
      variant,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
    });
    }

  }

  return { success: true };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  return null;
}

export default function SetupNewsletter() {
  const { t } = useContext(GlobalContext);
  const [searchParams ]= useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const actionData = useActionData<CreatePostActionData>();

  return (
    <section>
      <Container>
        <PageHeader>
          {t("setup.signUpForNewsletter")}
        </PageHeader>
        <FadeInUp>
          <Form method="post">
            {actionData?.error && (
              <Animated
                animation="fadeInUp"
              >
                <Alert
                  className="rounded-lg mx-auto"
                  variant="danger"
                  title={t("newsletter.error")}
                >
                  {t("newsletter.errorDescription")}
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
                  title={t("newsletter.subscribed")}
                >
                  {t("newsletter.subscribedDescription")}
                </Alert>
              </Animated>
            )}
            { !actionData?.success && (
              <>
                <InputField
                  className="mx-auto w-fit"
                  name="email"
                  label="newsletter.fields.email"
                  type="email"
                  required
                />
                <InputField
                  className="mx-auto w-fit"
                  name="firstName"
                  label="newsletter.fields.firstName"
                  type="text"
                  required
                />
                <InputField
                  className="mx-auto w-fit"
                  name="lastName"
                  label="newsletter.fields.lastName"
                  type="text"
                  required
                />
              </>
            )}
            { !actionData?.success && (
              <Button
                className="mx-auto my-0 mb-6"
                icon={FiSend}
                type="submit"
              >
                {t("common.submit")}
              </Button>
            )}
            { actionData?.success && (
              <Button
                className="mx-auto my-0"
                icon={FaArrowRight}
                type="button"
                to={redirectTo ? redirectTo : "/dashboard"}
              >
                {t("newsletter.goToApp")}
              </Button>
            )}
          </Form>
          { !actionData?.success && (
            <Link to={ redirectTo ? redirectTo : "/dashboard"} className="link mx-auto block w-fit">
              {t("setup.skip")}
            </Link>
          )}
        </FadeInUp>
      </Container>
    </section>
  );
}