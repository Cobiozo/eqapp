import type { Webinar, WebinarGuestInvitation} from "@prisma/client";
import { PermissionName, WebinarVariant } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import mailService from "~/utils/services/mail.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsEdit, "/no-permission");
  
  // get data from fd
  const data = await request.formData();
  const email = data.get("email") as string;
  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;
  if (!email || !firstName || !lastName)
    return { error: true };

  // try to find the webinar
  // check if it's invited and not expired
  // if not found, return error
  const webinar = await webinarModel.getById(params.webinarId as string, ["invitedGuests"], {
    variant: WebinarVariant.INVITED,
    expired: false,
    startAt: {
      gte: new Date()
    }
  }) as Webinar & { invitedGuests: WebinarGuestInvitation[] };
  if (!webinar)
    return { error: true };

  // if email is already invited, return error
  if (webinar.invitedGuests.some(guest => guest.email === email))
    return { emailExists: true };

  // check if email is not already registered from user
  if (await userModel.exists({
    email,
    subscribedWebinars: {
      some: {
        webinarId: webinar.id
      }
    }
  }))
    return { emailExists: true };

  // if email is free
  // generate invitation
  const invitation = await webinarModel.createGuestInvitation(webinar.id, {
    email,
    firstName,
    lastName
  });

  // and send an email!
  // send email with mail verification link
  const t = translateService.translate;
  const language = await translateService.getCurrentLang(request);
  const url = new URL(request.url);
  const confirmUrl = url.origin + "/client/webinars/accept-invitation/" + invitation.id;
  
  await mailService.sendMail(
    email,
    t(language, "mails.webinarInvitation.subject", webinar.title[language] || ""),
    t(language, "mails.webinarInvitation.text", confirmUrl)
  );

  return { success: true };
}
