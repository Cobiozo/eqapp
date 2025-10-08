import { Language, NotificationContentType, PushNotification, Role, SupportedLanguage, User, Webinar, WorkshopItem } from "@prisma/client";
import { notificationContentModel } from "~/models/notificationContent.server";
import { pushNotificationModel } from "~/models/pushNotification.server";
import htmlToText from "../htmlToText";

const webPush = require("web-push");

interface PushObject {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  dir?: string;
  image?: string;
  silent?: boolean;
}

/**
 * Pushes and triggers a notification to the client-side of your app straight from the server.
 *
 * @param {Request} request - The request object from the server.
 * @param {User} user - Who we wanna send the notification to?
 * @param {NotificationContentType} contentType - Notification template type.
 * @param {string} value - Values to be inserted into the push notification template placeholders.
 * @param {object} details - Info about related entity (it will be use in on-site notification list)
 * @param {number} delay - The delay in milliseconds before the text is copied (defaults to 0)
 */
export async function PushNotification(
  request: Request,
  user: User & { language: Language },
  contentType: NotificationContentType,
  value: string = "",
  details?: {
    workshopId?: WorkshopItem["id"];
    roleId?: Role["id"];
    mentorId?: User["id"];
    relatedUserId?: User["id"];
    webinarId?: Webinar["id"];
  },
  delay: number = 0
) {

  // get user language
  const language = user.language.name as SupportedLanguage;

  // try to find notification content template
  // if not found, end the function
  const notificationTemplate = await notificationContentModel.getByType(contentType);
  if (!notificationTemplate)
    return;


  // Check if the VAPID keys are set and if user.subscription is set
  // if so, send real push notification, but also save static in-site notification, but with seen = true
  // if not, just save static in-site notification with seen = false
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && user.webPushSubscription && user.webPushSubscription.endpoint) {

    // prepare and push real push notification
    const url = new URL(request.url);
    const iconUrl = `${url.origin.replace('http', 'https')}/icons/ios/72.png`
    const content: PushObject = {
      title: notificationTemplate.title[language],
      body: htmlToText(notificationTemplate.description[language]).replace("{0}", value),
      icon: iconUrl,
    };

    // push notification
    webPush.setVapidDetails("mailto:biuro@mmpolitowicz.pl", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

    setTimeout(() => {
      webPush
        .sendNotification(user.webPushSubscription, JSON.stringify(content))
        .then(() => {
          return new Response("success", {
            status: 200,
          });
        })
        .catch((e: Error) => {
          console.log(e);
          return new Response("Failed!", {
            status: 500,
          });
        });
    }, delay * 1000);

    // save static in-site notification, but with seen = true
    await pushNotificationModel.create(
      { userId: user.id },
      contentType,
      details,
      true,
    );
  
  } else {
    // save static in-site notification with seen = false
    await pushNotificationModel.create(
      { userId: user.id },
      contentType,
      details,
      false,
    );
  }
}


/**
 * Pushes and triggers a notification to the client-side of your app straight from the server.
 *
 * @param {Request} request - The request object from the server.
 * @param {User} user - Who we wanna send the notification to?
 * @param {title} title - Title of the notification
 * @param {description} content - Content of the notification
 * @param {number} delay - The delay in milliseconds before the text is copied (defaults to 0)
 */
export async function PushSimpleNotification(
  request: Request,
  user: User,
  title: string,
  description: string,
  delay: number = 0
) {

  // Check if the VAPID keys are set and if user.subscription is set
  // if so, send real push notification
  if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && user.webPushSubscription && user.webPushSubscription.endpoint) {

    // prepare and push real push notification
    const url = new URL(request.url);
    const iconUrl = `${url.origin.replace('http', 'https')}/icons/ios/72.png`
    const content: PushObject = {
      title: title,
      body: htmlToText(description),
      icon: iconUrl,
    };

    // push notification
    webPush.setVapidDetails("mailto:biuro@mmpolitowicz.pl", process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

    setTimeout(() => {
      webPush
        .sendNotification(user.webPushSubscription, JSON.stringify(content))
        .then(() => {
          return new Response("success", {
            status: 200,
          });
        })
        .catch((e: Error) => {
          console.log(e);
          return new Response("Failed!", {
            status: 500,
          });
        });
    }, delay * 1000);
  
  }
}
