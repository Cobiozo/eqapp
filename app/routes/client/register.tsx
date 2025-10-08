import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react";
import { useContext } from "react";
import { FaPencilAlt } from "react-icons/fa";
import Alert from "~/components/ui/Alert";
import Animated from "~/components/ui/Animated";
import InputField from "~/components/ui/InputField";
import { userModel } from "~/models/user.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { ConflictError } from "~/utils/errors/Conflict.server";
import { PrismaError } from "~/utils/errors/PrismaErrors.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { roleModel } from "~/models/role.server";
import { RoleName } from "@prisma/client";
import translateService from "~/utils/services/translate.server";
import { languageModel } from "~/models/language.server";
import clientService from "~/utils/services/client.server";
import { sessionService } from "~/utils/services/session.server";
import { GlobalContext } from "~/root";
import mailService from "~/utils/services/mail.server";
import Button from "~/components/client/Button";
import PageHeader from "~/components/client/PageHeader";

const schema = createFormSchema({
  email: {
    label: "register.fields.email",
    type: "email",
    required: true,
  },
  firstName: {
    label: "register.fields.firstName",
    type: "password",
    required: true,
  },
  lastName: {
    label: "register.fields.lastName",
    type: "password",
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

  // get forWebinar from search params
  const url = new URL(request.url);
  const forWebinar = url.searchParams.get("forWebinar");

  // if forWebinar is undefined
  // just go to home
  if (!forWebinar)
    return redirect("/client");

  // check if we aren't logged in
  // if we are, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/client");

  // check if our client doesn't have an account yet
  // if he is registered, go away
  const clientData = await clientService.getClientData(request);
  if (!clientData || clientData.isRegistered)
    return redirect("/client");

  // get data from request
  const formData = await request.formData();
  const data = parseFormData(formData, schema);

  // validate data
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ message: "common.unexpectedErrorDescription" });

  try {

    // retrieve client role id, language id and mentor id
    const roleRecord = await roleModel.getByName(RoleName.CLIENT);
    const currentLang = await translateService.getCurrentLang(request);
    const langRecord = await languageModel.getByName(currentLang);
    const mentor = await userModel.getById(clientData.mentorId);
    if (!roleRecord || !langRecord || !mentor)
      return await clientService.removeClient();

    // try to create an user
    await userModel.create({
      id: clientData.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      eqId: clientData.userId,
      email: data.email,
      avatar: '',
      phone: ''
      },
      '',
      roleRecord.id,
      mentor.id,
      langRecord.id,
    );

    // send activation mail to the user
    // and return null
    const t = translateService.translate;
    const url = new URL(request.url);
    const confirmUrl = url.origin + "/client/verify-email/" + clientData.userId + "?forWebinar=" + forWebinar
     
     await mailService.sendMail(
       data.email,
       t(langRecord.name, "mails.confirmWebinarEmail.subject"),
       t(langRecord.name, "mails.confirmWebinarEmail.text", confirmUrl)
     );

    // also update cookie
    return clientService.markAsRegistered(request, "/client/webinars?activationMailSent=true");

  } catch (error: any) {
    if(error?.code === PrismaError.UniqueConstraintViolation) {
      if (error?.message.includes('email'))
        return ConflictError({ data: {
          email: "register.errors.client.emailExists"
        }})
    }

    // let errorBoundary handle it
    throw error;
    }

};

export const loader: LoaderFunction = async ({ request}) => {

  // check if we aren't logged in
  // if we are, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/client");

  // get forWebinar from search params
  const url = new URL(request.url);
  const forWebinar = url.searchParams.get("forWebinar");

  // if forWebinar is undefined
  // just go to home
  if (!forWebinar)
    return redirect("/client");

  // check if our client doesn't have an account yet
  // if he is registered, go away
  const clientData = await clientService.getClientData(request);
  if (!clientData && clientData.isRegistered)
    return redirect("/client");

  return null;
}

export default function RegisterForm() {
  const actionData = useActionData<CreatePostActionData>();
  const { t } = useContext(GlobalContext);

  return (
    <section className="w-fit mx-auto">
      <PageHeader>
        {t("clients.webinars.register")}
      </PageHeader>
      <Form method="post">
        {actionData?.error && (
          <Animated
            animation="fadeInUp"
          >
            <Alert
              className="rounded-2xl"
              variant="danger"
              title={t("common.unexpectedError")}
            >
              {actionData?.error?.data.email 
                ? t(actionData.error?.data.email)
                : t("common.unexpectedErrorDescription")
              }
            </Alert>
          </Animated>
        )}
        <InputField
          className="mx-auto w-fit"
          name="email"
          label="register.fields.email"
          type="email"
          required
        />
        <InputField
          className="mx-auto w-fit"
          name="firstName"
          label="register.fields.firstName"
          type="text"
          required
        />
        <InputField
          className="mx-auto w-fit"
          name="lastName"
          label="register.fields.lastName"
          type="text"
          required
        />
        <Button
          className="mx-auto mt-10"
          icon={FaPencilAlt}
          type="submit"
          variant="primary"
        >
          {t("register.createAction")}
        </Button>
      </Form>
    </section>
  );
}