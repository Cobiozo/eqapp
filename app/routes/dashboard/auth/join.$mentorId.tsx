import type { SupportedLanguage } from "@prisma/client";
import { ActivityType, NotificationContentType, RoleName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect, unstable_parseMultipartFormData } from "@remix-run/node";
import { useContext } from "react";
import { roleModel } from "~/models/role.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { useActionData, useSearchParams } from "@remix-run/react";
import PageHeader from "~/components/ui/PageHeader";
import ValidationForm from "~/components/features/ValidationForm";
import { PushNotification } from "~/utils/server/pwa-utils.server";
import { PrismaError } from "~/utils/errors/PrismaErrors.server";
import { ConflictError } from "~/utils/errors/Conflict.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import cropImageAccordingToSchema from "~/utils/cropImageAccordingToSchema.server";
import type FormImageItem from "~/utils/validation/types/FormImageItem";
import translateService from "~/utils/services/translate.server";
import { languageModel } from "~/models/language.server";
import mailService from "~/utils/services/mail.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";
import { db } from "~/utils/db.server";
import { v4 as uuidv4 } from "uuid";
import Alert from "~/components/ui/Alert";
import config from "~/config";

const schema = createFormSchema({
  firstName: {
    type: "text",
    label: "register.fields.firstName",
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: "text",
    label: "register.fields.lastName",
    required: true,
    min: 2,
    max: 100,
  },
  eqId: {
    label: "register.fields.eqId",
    type: "text",
    required: true,
    minLength: 1,
    maxLength: 100
  },
  phone: {
    label: "register.fields.phone",
    type: "text",
    required: true,
    minLength: 9,
  },
  email: {
    label: "register.fields.email",
    type: "email",
    required: true,
    minLength: 3,
    maxLength: 100
  },
  emailRepeat: {
    label: "register.fields.emailRepeat",
    type: "email",
    required: true,
    minLength: 3,
    maxLength: 100
  },
  password: {
    label: "register.fields.password",
    type: "password",
    required: true,
    minLength: 9,
    maxLength: 100
  },
  passwordRepeat: {
    label: "register.fields.passwordRepeat",
    type: "password",
    required: true,
    minLength: 9,
    maxLength: 100
  },
  avatar: {
    label: "register.fields.avatar",
    type: "image",
    size: {
      width: 180,
      height: 180
    },
    thumb: {
      width: 50,
      height: 50
    },
    accept: ['image/png', 'image/jpeg'],
    maxSize: 5 * 1024 * 1024,
  },
  termsOfUse: {
    description: "register.fields.termsOfUse|/dashboard/terms",
    type: 'boolean',
    required: true,
  },
  emailConfirmation: {
    description: "register.fields.emailConfirmation",
    type: 'boolean',
    required: true,
  }
});

/********* ACTION *********/

interface CreatePostActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {

  // check if mentorId param is valid
  const mentorId = params.mentorId as string;

  // get data from request and validate it
  // try to handle request with file upload
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request);

  // try to find mentor
  // if it doesn't exist -> not found
  const mentor = await userModel.getByIdWithRole(mentorId, ["language"]);
  if (!mentor) {
    if(data.avatar)
      await removeUploadedFile(data.avatar.name);
    return redirect("/404");
  }
  
  // check if mentor role is the one that can have proteges and invite partners
  if(!mentor.permissions.protegesInvite) {
    if(data.avatar)
      await removeUploadedFile(data.avatar.name);
    return redirect("/404");
  }

  // validate data and throw error if not valid
  // also remove uploaded file if there is an error
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    if(data.avatar)
      await removeUploadedFile(data.avatar.name);
    return BadRequestError({ data: validationResult });
  }
  
  // if there are no errors, create the user
  try {

    // find the the role record
    const roleRecord = await roleModel.getByName(RoleName.CANDIDATE_PARTNER as RoleName);
    if (!roleRecord) {
      if(data.avatar)
        await removeUploadedFile(data.avatar.name);
      throw new Error("Role not found");
    }

    // get current language
    const language = await translateService.getCurrentLang(request);
    const langRecord = await languageModel.getByName(language as SupportedLanguage);
    if(!langRecord) {
      if(data.avatar)
        await removeUploadedFile(data.avatar.name);
      throw new Error("Language not found");
    }

    // crop image according to schema
    if (data.avatar)
      data.avatar.name = await cropImageAccordingToSchema("avatar", data, schema.avatar as FormImageItem);
    
    // now there are two possibilities
    // 1. the user hasn't ever been to webinar and has no account in the system yet
    // 2. the user has been to webinar and has an account in the system (more likely)
    // in the first case we can just create new user
    // in the second case we should just update the user with new data (we can set his mailVerified to false to make him confirm it again)

    // try to determine if user with such email exists and is not yet really registered (doesn't have password)
    let userId = "";
    const existingUser = await userModel.getByEmail(data.email);

    // if it doesn't exist, just create new user
    // and create old unlogged user, we don't need it anymore
    if (!existingUser) {

      const newUser = await userModel.create(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          eqId: data.eqId,
          email: data.email,
          avatar: data.avatar ? data.avatar.name : '',
          phone: data.phone,
        },
        data.password,
        roleRecord.id,
        mentorId,
        langRecord.id
      );
      userId = newUser.id;

      try {
        // remove unlogged user (but only if it not REAL user)
        const unloggedUserId = (await unloggedUserService.getUnloggedUserData(request))?.userId;
        if (unloggedUserId && !(await userModel.isReallyRegistered(unloggedUserId)))
          await userModel.deleteById(unloggedUserId);

      } catch (error) {
        // do nothing
      }

    } else {

      // if user exists, check details
      // if he is really registered, it means that email is already taken
      // so return error
      const userIsReallyRegistered = await userModel.isReallyRegistered(existingUser.id);
      if (userIsReallyRegistered) {
        if(data.avatar)
          await removeUploadedFile(data.avatar.name);
        return ConflictError({ data: {
          email: "register.errors.emailExists"
        }})
      }
      else {
        // if user is not really registered, we can use his mail
        // and remove this unlogged user from the system
        // we can also remove our unlogged user, we don't need it anymore
        try {

          // remove unlogged user (but only if it not REAL user)
          const unloggedUserId = (await unloggedUserService.getUnloggedUserData(request))?.userId;
          if (unloggedUserId && !(await userModel.isReallyRegistered(unloggedUserId)))
            await userModel.deleteById(unloggedUserId);

        } catch (error) {
          // do nothing
        }

        await db.user.deleteMany({
          where: {
            email: data.email
          }
        });

        const newUser = await userModel.create(
          {
            firstName: data.firstName,
            lastName: data.lastName,
            eqId: data.eqId,
            email: data.email,
            avatar: data.avatar ? data.avatar.name : '',
            phone: data.phone,
          },
          data.password,
          roleRecord.id,
          mentorId,
          langRecord.id
        );
        userId = newUser.id;
      }
    
    }

    // anyway, we should also save the user activity (registration)
    await userModel.saveActivity(userId, {
      type: ActivityType.REGISTRATION,
    });

    // send notification to mentor
    await PushNotification(
      request,
      mentor,
      NotificationContentType.USER_REGISTRATION,
      data.firstName + " " + data.lastName,
      { relatedUserId: userId }
    );

    // send notification to admin
    const admin = await userModel.getByIdWithRole(config.defaultMentorId, ["language"]);
    await PushNotification(
      request,
      admin,
      NotificationContentType.USER_REGISTRATION,
      data.firstName + " " + data.lastName,
      { relatedUserId: userId }
    );

    // send email with mail verification link
    const t = translateService.translate;
    const url = new URL(request.url);
    const confirmUrl = url.origin + "/dashboard/verify-email/partner/" + userId;
    
    await mailService.sendMail(
      data.email,
      t(language, "mails.confirmEmail.subject"),
      t(language, "mails.confirmEmail.text", confirmUrl)
    );

  } catch (error: any) {
    // remove user image, it is not needed anymore
    if(data.avatar)
      await removeUploadedFile(data.avatar.name);

    if(error?.code === PrismaError.UniqueConstraintViolation) {
      if (error?.message.includes('email'))
        return ConflictError({ data: {
          email: "register.errors.emailExists"
        }})
      if (error?.message.includes('eqId'))
        return ConflictError({ data: {
          eqId: "register.errors.eqIdExists"
        }})
    }

    // let errorBoundary handle it
    throw error;
    }

    return await unloggedUserService.updateUnloggedUserData(request, {
      userId: uuidv4(),
      isRegistered: false,
      mentorId,
    }, "/dashboard/auth/join/" + mentorId + "?success=true");
};

/************* LOADER  ************/
export const loader: LoaderFunction = async function({ request, params }) {

  // check if mentorId param is valid
  const mentorId = params.mentorId as string;
  const mentor = await userModel.getByIdWithRole(mentorId);
  if (!mentor)
    return redirect("/404");

  // check if mentor role is the one that can have proteges
  if(!mentor.permissions.protegesInvite)
    return redirect("/404");

  return null;
}

/********* COMPONENT *********/
export default function RegisterClient() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreatePostActionData>();
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  return (
    <section className="w-fit mx-auto">
      <PageHeader>
        {t("join.title")}
      </PageHeader>
      {success && (
        <Alert
          variant="success"
          title={t("register.success.create")}
        >
          {t("register.success.createDesc")}
        </Alert>
      )}
      {!success && (
        <ValidationForm
          collection="register"
          variant="create"
          schema={schema}
          errors={actionData?.error?.data}
          success={actionData?.success}
        />
      )}
    </section>
  );
}
