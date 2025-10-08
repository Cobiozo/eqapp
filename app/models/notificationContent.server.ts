import type { NotificationContent } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { NotificationContent };

class NotificationContentModel extends BaseDbModel<NotificationContent>("notificationContent") {
  async create(
    data: Omit<NotificationContent, "id">
  ) {
    return await db.notificationContent.create({
      data,
    });
  }

  async update(
    id: NotificationContent["id"],
    data: Partial<Omit<NotificationContent, "id">>
  ) {
    return await db.notificationContent.update({
      where: { id },
      data,
    });
  }

  async getByType(
    type: NotificationContent["type"]
  ) {
    return await db.notificationContent.findFirst({
      where: { type },
    });
  }
}

export const notificationContentModel = new NotificationContentModel();
