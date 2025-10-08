import { type Webinar } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { Webinar };

class WebinarModel extends BaseDbModel<Webinar>("webinar") {
  async create(
    data: Omit<Webinar, "id" | "createdAt" | "supporterRoles" | "supportedLanguages">,
    supportedLanguages: string[],
  ) {
    await db.webinar.create({
      data: {
        ...data,
        supportedLanguages: {
          connect: supportedLanguages.map(language => ({ id: language }))
        }
      }
    });
  }

  async update(
    id: string,
    data: Omit<Webinar, "id" | "createdAt" | "supporterRoles" | "supportedLanguages" | "variant">,
    supportedLanguages: string[],
  ) {
    return await db.webinar.update({
      where: { id },
      data: {
        ...data,
        supportedLanguages: {
          set: supportedLanguages.map(language => ({ id: language }))
        }
      },
    });
  }

  async markWebinarsAsExpired() {
    // get date 2 hour ago
    const date = new Date();
    date.setHours(date.getHours() - 2);

    // mark webinars started more than 2 hour ago as expired
    await db.webinar.updateMany({
      where: {
        startAt: {
          lte: date
        },
        expired: false
      },
      data: {
        expired: true
      }
    });
  }

  async deleteOldWebinars() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    await db.webinar.deleteMany({
      where: {
        startAt: {
          lt: thirtyDaysAgo
        }
      }
    });
  }

  async createGuestInvitation(webinarId: string, { email, firstName, lastName }: { email: string, firstName: string, lastName: string }) {
    return await db.webinarGuestInvitation.create({
      data: {
        webinarId,
        email,
        firstName,
        lastName
      }
    });
  }

  async getGuestInvitationById(id: string) {
    return await db.webinarGuestInvitation.findUnique({
      where: { id }
    });
  }

  async markWebinarAsChecked(id: string) {
    await db.webinar.update({
      where: { id },
      data: { checked: true }
    });
  }

  async markUserAsAttended(webinarId: string, userId: string, time: number) {
    // check if record already exists
    // if exists, do nothing, user is already marked as attended!
    const record = await db.userAttendedWebinar.findFirst({
      where: {
        webinarId,
        userId
      }
    });
    if (record)
      return;

    await db.userAttendedWebinar.create({
      data: {
        webinarId,
        userId,
        time
      }
    });
  }
}

export const webinarModel = new WebinarModel();
