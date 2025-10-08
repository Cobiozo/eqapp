import type { Announcement } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { Announcement };

class AnnouncementModel extends BaseDbModel<Announcement>("announcement") {
  async create(
    data: Omit<Announcement, "id">
  ) {
    return await db.announcement.create({
      data,
    });
  }

  async update(
    id: Announcement["id"],
    data: Partial<Omit<Announcement, "id">>
  ) {
    return await db.announcement.update({
      where: { id },
      data,
    });
  }

  async markAsChecked(
    id: Announcement["id"]
  ) {
    return await db.announcement.update({
      where: { id },
      data: {
        notificationSent: true,
      }
    });
  }
}

export const announcementModel = new AnnouncementModel();
