import { ActivityType, PermissionName, WebinarVariant } from "@prisma/client";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { cm } from "~/utils/cm.server";
import { sessionService } from "~/utils/services/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.webinarsAccess, "/no-permission");

  // try to find desired webinar, but only if  aren't yet expired and is supported for user role and language
  // get only BUSINESS one
  const user = await sessionService.getUser(request);
  const webinar = await webinarModel.getById(params.id as string, undefined, {
    variant: WebinarVariant.BUSINESS,
    expired: {
      not: true
    },
    supportedLanguages: {
      some: {
        id: user!.languageId
      }
    },
    supportedRoles: {
      some: {
        id: user!.roleId
      }
    }
  });
  if (!webinar)
    return redirect("/dashboard/webinars");

  // check if user is subscribed to this webinar
  // if already subscribed, return to webinars list
  const hasSubscribed = await userModel.hasSubscribedToWebinar(
    user!.id,
    params.id as string
  );
  if (hasSubscribed)
    return redirect("/dashboard/webinars");

  try {

    // if not, subscribe to the webinar at clickMeeting
    const web = await cm.subscribeToWebinar(webinar.cmId, {
      firstName: user!.firstName,
      lastName: user!.lastName,
      email: user!.email,
    });

    // save subscription info in the database
    await userModel.subscribeToWebinar(user!.id, params.id as string, web.url);

    // now it's time to save activity
    await userModel.saveActivity(user.id as string, {
      type: ActivityType.WEBINAR_SUBSCRIPTION,
      webinarId: params.webinarId as string,
    });

    // return to webinars list with success info
    return redirect(`/dashboard/webinars?webinarSubscribed=true`);

  } catch (error) {
    throw error;
  }

}
