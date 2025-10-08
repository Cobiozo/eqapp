import type { Notification } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { Notification };

class NotificationModel extends BaseDbModel<Notification>("notification") {
  async create(
    data: Omit<Notification, "id">
  ) {
    return await db.notification.create({
      data,
    });
  }

  removeExpiredNotifications() {
    return db.notification.deleteMany({
      where: {
        showAt: {
          lte: new Date(),
        },
      },
    });
  }
}

export const notificationModel = new NotificationModel();
