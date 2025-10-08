import { ActivityType, PermissionName } from "@prisma/client";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { globalMiddleware } from "~/middlewares/global.server";
import { languageModel } from "~/models/language.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { cm } from "~/utils/cm.server";
import { determineLocalesByLang } from "~/utils/determineLocalesByLang";
import mailService from "~/utils/services/mail.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  await sessionService.requirePermission(request, PermissionName.webinarsAccess, "/no-permission");

  // try to find desired webinar, but only if  aren't yet expired and is supported for user language
  const user = await sessionService.getUser(request);
  const webinar = await webinarModel.getById(params.id as string, undefined, {
    expired: {
      not: true
    },
    supportedLanguages: {
      some: {
        id: user!.languageId
      }
    },
  });
  if (!webinar)
    return redirect("/dashboard/webinars/partner");

  // check if user is subscribed to this webinar
  // if already subscribed, return to webinars list
  const hasSubscribed = await userModel.hasSubscribedToWebinar(
    user!.id,
    params.id as string
  );
  if (hasSubscribed)
    return redirect("/dashboard/webinars/partner?showOnlyLiveWorkshops=" + webinar.isWorkshop);

  try {

    // if not and is internal webinar,
    // subscribe to the webinar at clickMeeting
    // and use the url to save subscription info in the database
    // if external, just save subscription info in the database with webinar embedUrl
    let url = webinar.embedUrl;

    if (!webinar.isExternal) {
      const web = await cm.subscribeToWebinar(webinar.cmId, {
        firstName: user!.firstName,
        lastName: user!.lastName,
        email: user!.email,
      });
      url = web.url;
    }

    // save subscription info in the database
    await userModel.subscribeToWebinar(user!.id, params.id as string, url as string);

    // now it's time to save activity
    await userModel.saveActivity(user!.id as string, {
      type: ActivityType.WEBINAR_SUBSCRIPTION,
      webinarId: params.id as string,
    });

    // we should send partner email with webinar link
    try {
      const currentLang = await translateService.getCurrentLang(request);
      const langRecord = await languageModel.getByName(currentLang);
      if (!langRecord)
        throw new Error("Language not found");

      const t = translateService.translate;
      const url = new URL(request.url);
          
      const webinarUrl = url.origin + "/dashboard/webinars/partner/play/" + webinar.id + "?usr=" + user!.id;
      const locales = determineLocalesByLang(langRecord.name);
      const startAt = (new Date(webinar.startAt)).toLocaleString(locales);
      await mailService.sendMail(
        user!.email,
        t(langRecord.name, "mails.webinarConfirmation.subject"),
        t(langRecord.name, "mails.webinarConfirmation.text", startAt, webinarUrl)
      );
    } catch (err) {
      console.log("Do nothing")
    }

    // return to webinars list with success info
    return redirect(`/dashboard/webinars/partner?webinarSubscribed=true&showOnlyLiveWorkshops=${webinar.isWorkshop}`);

  } catch (error) {

    // if error, there are no more tokens left
    // so we have to go to no-more-tokens page
    return redirect("/dashboard/webinars/partner/no-more-tokens?showOnlyLiveWorkshops=" + webinar.isWorkshop);
  }

}
