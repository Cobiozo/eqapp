import type { Webinar, WebinarGuestInvitation} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import mailService from "~/utils/services/mail.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.protegesInvite, "/no-permission");

  // get data from fd
  const data = await request.formData();
  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;
  const email = data.get("email") as string;
  if (!firstName || !lastName)
    return { error: true };

  // try to find the webinar
  // if not found, return error
  const webinar = await webinarModel.getById(params.webinarId as string, ["invitedGuests"], { 
    expired: false,
    startAt: {
      gte: new Date()
    }
  }) as Webinar & { invitedGuests: WebinarGuestInvitation[] }
  if (!webinar)
    return { error: true };

  // if email is provided, check if is not already invited, if it is -> return error
  if (email && webinar.invitedGuests.some(guest => guest.email === email && guest.webinarId === webinar.id))
    return { emailExists: true };

  // if email provided, check if email is not already registered from user
  if (email && await userModel.exists({
    email,
    subscribedWebinars: {
      some: {
        webinarId: webinar.id
      }
    }
  }))
    return { emailExists: true };

  // if email is free or not provided
  // generate invitation
  const invitation = await webinarModel.createGuestInvitation(webinar.id, {
    email,
    firstName,
    lastName
  });

  // if email provided, send email with confirm url
  // if it is not, return success with invitation link
  // let invitating user handle giving the link to the guest
  const userId = await sessionService.getUserId(request) as string;
  const t = translateService.translate;
  const language = await translateService.getCurrentLang(request);
  const url = new URL(request.url);
  const confirmUrl = url.origin + "/dashboard/webinars/client/accept-invitation/" + invitation.id + "?ref=" + userId;

  if (!email)
    return { success: true, confirmUrl };
  else {
    await mailService.sendMail(
      email,
      t(language, "mails.webinarInvitation.subject", webinar.title[language] || ""),
      t(language, "mails.webinarInvitation.text", confirmUrl)
    );

    return { success: true };
  }
}
