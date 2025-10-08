import { PermissionName, WebinarVariant } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { cm } from "~/utils/cm.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsEdit, "/no-permission");

  // try to find the user
  // if not found, return error
  const user = await userModel.getById(params.userId as string, undefined, {
    verified: true
  });
  if (!user)
    return { error: true };
  
  // try to find the webinar
  // check if it's invited and not expired
  // if not found, return error
  const webinar = await webinarModel.getById(params.webinarId as string, undefined, {
    variant: WebinarVariant.INVITED,
    expired: false,
    startAt: {
      gte: new Date()
    }
  });
  if (!webinar)
    return { error: true };

  // generate private token for the user
  const token = await cm.generateWebinarToken(webinar.cmId);
  if (!token)
    return { error: true };

  // generate auto login has for this token
  const hash = await cm.generateWebinarAutoLoginHash(webinar.cmId, {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    token
  });
  if (!hash)
    return { error: true };

  // now we need to get room url to build auto login link
  const roomUrl = await cm.getWebinarUrl(webinar.cmId);
  const autoLoginLink = `${roomUrl}?l=${hash}`;

  // now we just have to save subscription info in the db
  await userModel.subscribeToWebinar(
    user.id,
    webinar.id,
    autoLoginLink
  );

  return { success: true };
}
