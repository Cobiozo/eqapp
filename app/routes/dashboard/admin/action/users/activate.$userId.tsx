import { ActivityType } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import type { User} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { NotFoundError } from "~/utils/errors/NotFound.server";
import mailService from "~/utils/services/mail.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";

export const action: ActionFunction = async ({ request, params }) => {
   // require permission
   await sessionService.requirePermission(request, "adminUsersActivate", "/dashboard/admin/users");

   // try to find user with given id
   // if not found, redirect to proteges list
   const userId = params.userId as string;
   const user = await userModel.getById(userId, ["language"]) as User & { language: Language };
   if (!user)
      return NotFoundError("common.notFound");
 
   // if user is found, check if its not already active
   // if it is, redirect to proteges list
   if (user.verified)
    return NotFoundError("common.notFound");
 
  // now we can activate the protege
  await userModel.activate(userId);

  // ...and send mail to him with happy news :)
  const url = new URL(request.url);
  const loginLink = url.origin + "/dashboard/auth/login";
  const t = translateService.translate;
  await mailService.sendMail(
    user.email,
    t(user.language.name, "mails.userActivated.subject"),
    t(user.language.name, "mails.userActivated.text", loginLink)
  );

  // ...and save new user activity
  await userModel.saveActivity(userId as string, {
    type: ActivityType.ACTIVATION
  });

  return {
    success: true
  }
};
