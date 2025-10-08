import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node"
import { useActionData } from "@remix-run/react";
import { useContext } from "react";
import { userModel } from "~/models/user.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { PrismaError } from "~/utils/errors/PrismaErrors.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { roleModel } from "~/models/role.server";
import { RoleName, WebinarVariant } from "@prisma/client";
import translateService from "~/utils/services/translate.server";
import { languageModel } from "~/models/language.server";
import type { UnloggedUserData } from "~/utils/services/unloggedUser.server";
import { sessionService } from "~/utils/services/session.server";
import { GlobalContext } from "~/root";
import mailService from "~/utils/services/mail.server";
import PageHeader from "~/components/ui/PageHeader";
import { ConflictError } from "~/utils/errors/Conflict.server";
import { globalMiddleware } from "~/middlewares/global.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";
import { webinarModel } from "~/models/webinar.server";
import config from "~/config";
import ValidationForm from "~/components/features/ValidationForm";
import { workshopItemModel } from "~/models/workshopItem.server";

const schema = createFormSchema({
  email: {
    label: "register.fields.email",
    type: "email",
    required: true,
  },
  emailRepeat: {
    label: "register.fields.emailRepeat",
    type: "email",
    required: true,
    minLength: 3,
    maxLength: 100
  },
  firstName: {
    label: "register.fields.firstName",
    type: "text",
    required: true,
  },
  lastName: {
    label: "register.fields.lastName",
    type: "text",
    required: true,
  },
  emailConfirmation: {
    description: "register.fields.emailConfirmation",
    type: 'boolean',
    required: true,
  },
  newsletter: {
    description: "register.fields.saveToNewsletterDescription",
    type: "boolean",
  },
});

interface CreatePostActionData {
  error?: {
    message: string;
  },
  success?: true
}

export const action: ActionFunction = async ({ request }) => {

  // get forWebinar and forWorkshop from search params
  const url = new URL(request.url);
  const forWebinar = url.searchParams.get("forWebinar");
  const forWorkshop = url.searchParams.get("forWorkshop");

  // if forWebinar or forWorkshop is undefined
  // just go to home
  // currently we allow registering for clients only for these two reasons
  if (!forWebinar && !forWorkshop)
    return redirect("/dashboard/client/webinars");

  // check if we aren't logged in
  // if we are, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/dashboard");

  // try to find webinar or workshop
  // we should find at least one of them
  const webinar = forWebinar ? await webinarModel.getById(forWebinar) : null;
  const workshop = forWorkshop ? await workshopItemModel.getById(forWorkshop) : null;
  if (!webinar && !workshop)
    return redirect("/dashboard");

  // check if our user doesn't have an account yet
  // if he is registered, go away
  const unloggedUserData = await unloggedUserService.getUnloggedUserData(request) as UnloggedUserData;
  if (unloggedUserData.isRegistered)
    return redirect("/dashboard");

  // get data from request
  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ data: validationResult });

  try {

    // retrieve roleId, language id and mentor id
    // if forWebinar -> get role based on webinar variant
    // if forWorkshop -> get CLIENT role
    // if it's CLIENT, get CLIENT role
    // if it's PARTNER, get CANDIDATE_PARTNER role
    const roleRecord = forWebinar
      ? (
        await roleModel.getByName(webinar!.variant === WebinarVariant.CLIENT 
          ? RoleName.CLIENT
          : RoleName.CANDIDATE_PARTNER
        )
      )
      : await roleModel.getByName(RoleName.CLIENT)
    const currentLang = await translateService.getCurrentLang(request);
    const langRecord = await languageModel.getByName(currentLang);
    const url = new URL(request.url);
    const refFromUrl = url.searchParams.get("ref");
    const ref = refFromUrl && refFromUrl !== "null" ? refFromUrl : config.defaultMentorId;
    const mentor = await userModel.getById(ref as string);
    if (!roleRecord || !langRecord || !mentor)
      return await unloggedUserService.removeUnloggedUser();

    // try to create an user
    await userModel.create({
      id: unloggedUserData.userId,
      firstName: data.firstName,
      lastName: data.lastName,
      eqId: unloggedUserData.userId,
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
    // use different link and content depending if it's for webinar or workshop
    // and update cookie
    const t = translateService.translate;

    if (forWebinar) {
      const confirmUrl = url.origin + "/dashboard/verify-email/client/" + unloggedUserData.userId + "?forWebinar=" + forWebinar + "&newsletter=" + data.newsletter + "&ref=" + ref;
      await mailService.sendMail(
        data.email,
        t(langRecord.name, "mails.confirmWebinarEmail.subject"),
        t(langRecord.name, "mails.confirmWebinarEmail.text", confirmUrl)
      );

      // also update cookie
      return unloggedUserService.markAsRegistered(request, "/dashboard/webinars/client?activationMailSent=true", mentor.id);
    } else {
      const confirmUrl = url.origin + "/dashboard/verify-email/client/" + unloggedUserData.userId + "?forWorkshop=" + forWorkshop + "&newsletter=" + data.newsletter + "&ref=" + ref;
      await mailService.sendMail(
        data.email,
        t(langRecord.name, "mails.confirmWorkshopEmail.subject"),
        t(langRecord.name, "mails.confirmWorkshopEmail.text", confirmUrl)
      );

      // also update cookie
      return unloggedUserService.markAsRegistered(request, "/dashboard/webinars/client?activationMailSent=true", mentor.id);
    }


  } catch (error: any) {
    if(error?.code === PrismaError.UniqueConstraintViolation) {

      // if there is email taken, it means we have already created client account
      // probably on the other device
      // so just send activation mail
      // when user will try to active it with link, his client account will be synchronized properly
      // we don't have to be afraid of that idea
      // as it requires using client email to click on verify link, so... we are safe ;)
      if (error?.message.includes('email')) {

        const currentLang = await translateService.getCurrentLang(request);
        const langRecord = await languageModel.getByName(currentLang);
        if (!langRecord)
          throw error;

        const t = translateService.translate;
        const url = new URL(request.url);
        const user = await userModel.getByEmail(data.email);
        
        // if user is verified user or candidate partner, not the client
        // do not let use this mail
        const candidatePartner = await roleModel.getByName(RoleName.CANDIDATE_PARTNER);
        if (user?.verified || user?.roleId === candidatePartner?.id)
          return ConflictError({ data: {
            email: "register.errors.client.emailExists"
          }})
        
        // if it isn't, send activation email
        // use different link and content depending if it's for webinar or workshop
        if (forWebinar) {
          const confirmUrl = url.origin + "/dashboard/verify-email/client/" + user!.id + "?forWebinar=" + forWebinar + "&newsletter=" + data.newsletter;
          await mailService.sendMail(
            data.email,
            t(langRecord.name, "mails.confirmWebinarEmail.subject"),
            t(langRecord.name, "mails.confirmWebinarEmail.text", confirmUrl)
          );
        } else {
          const confirmUrl = url.origin + "/dashboard/verify-email/client/" + user!.id + "?forWorkshop=" + forWorkshop + "&newsletter=" + data.newsletter;
          await mailService.sendMail(
            data.email,
            t(langRecord.name, "mails.confirmWorkshopEmail.subject"),
            t(langRecord.name, "mails.confirmWorkshopEmail.text", confirmUrl)
          );
        }

        return redirect("/dashboard/webinars/client?activationMailSent=true");
      }
    }

    // let errorBoundary handle it
    throw error;
  }

};

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check if we aren't logged in
  // if we are, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/dashboard");

  // get forWebinar and forWorkshop from search params
  const url = new URL(request.url);
  const forWebinar = url.searchParams.get("forWebinar");
  const forWorkshop = url.searchParams.get("forWorkshop");

  // if forWebinar or forWorkshop is undefined
  // just go to home
  // currently we allow registering for clients only for these two reasons
  if (!forWebinar && !forWorkshop)
    return redirect("/dashboard/client/webinars");

  // try to find webinar or workshop
  // we should find at least one of them
  const webinar = forWebinar ? await webinarModel.getById(forWebinar) : null;
  const workshop = forWorkshop ? await workshopItemModel.getById(forWorkshop) : null;
  if (!webinar && !workshop)
    return redirect("/dashboard");

  // check if our user doesn't have an account yet
  // if he is registered, go away
  const unloggedUserData = await unloggedUserService.getUnloggedUserData(request) as UnloggedUserData;
  if (unloggedUserData.isRegistered)
    return redirect("/dashboard");

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
      <ValidationForm
        collection="register"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}