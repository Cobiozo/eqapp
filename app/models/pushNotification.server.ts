import type {  NotificationContent, NotificationContentType, PushNotification, Role, RoleName, User, Webinar, WorkshopItem } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { PushNotification };
export type FullPushNotification = PushNotification & {
  content: NotificationContent;
  user?: User;
  roles?: Role[];
  workshop?: WorkshopItem;
  webinar?: Webinar;
  role?: Role;
  mentor?: User;
  relatedUser?: User;
};

class PushNotificationModel extends BaseDbModel<PushNotification>("pushNotification") {
  async create(
    sendTo: { roles: RoleName[] } | { userId: User["id"]},
    contentType: NotificationContentType,
    details?: {
      workshopId?: WorkshopItem["id"];
      webinarId?: Webinar["id"];
      roleId?: Role["id"];
      mentorId?: User["id"];
      relatedUserId?: User["id"];
    },
    alreadySeen: Boolean = false,
    showAt: PushNotification["showAt"] = new Date(),
  ) {

    // create base data object
    // get type and content type just as they are
    const data: Record<string, any> = {
      content: {
        connect: {
          type: contentType,
        },
      },
      showAt,
    };

    // check sendTo and add roles or userId to data
    if ("roles" in sendTo) {
      data.roles = {
        connect: {
          name: {
            in: sendTo.roles,
          },
        }
      };
    } else {
      data.user = {
        connect: {
          id: sendTo.userId,
        },
      }
    }

    // then check details and add them to data if they exist
    if (details?.workshopId)
      data.workshop = {
        connect: {
          id: details.workshopId,
        },
      };
    else if (details?.webinarId)
      data.webinar = {
        connect: {
          id: details.webinarId,
        },
      }
    else if (details?.roleId)
      data.role = {
        connect: {
          id: details.roleId,
        },
      }
    else if (details?.mentorId)
      data.mentor = {
        connect: {
          id: details.mentorId,
        },
      }
    else if (details?.relatedUserId)
      data.relatedUser = {
        connect: {
          id: details.relatedUserId,
        },
      }

    // if alreadySeen is true, add it to user or roles user data
    // FOT NOW ONLY single user is supported!!
    if (alreadySeen) {
      if ("userId" in sendTo) {
        data.seenBy = {
          create: {
            user: {
              connect: {
                id: sendTo.userId,
              },
            },
          },
        }
      }
    }

    return await db.pushNotification.create({
      data,
    });
  }

  removeExpiredNotifications() {
    // get 1 days ago date
    const oneDaysAgo = new Date();
    oneDaysAgo.setDate(oneDaysAgo.getDate() - 1);

    return db.pushNotification.deleteMany({
      where: {
        showAt: {
          lte: oneDaysAgo,
        },
      },
    });
  }
}

export const pushNotificationModel = new PushNotificationModel();