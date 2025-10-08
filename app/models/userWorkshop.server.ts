import type { UserWorkshop } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { UserWorkshop };

class UserWorkshopModel extends BaseDbModel<UserWorkshop>("userWorkshop") {

  async create (userWorkshopData: Omit<UserWorkshop, "id" | "createdAt" | "updatedAt">) {
    return db.userWorkshop.create({
      data: {
        userId: userWorkshopData.userId,
        workshopId: userWorkshopData.workshopId,
        done: userWorkshopData.done,
      }
    });
  }

}

export const userWorkshopModel = new UserWorkshopModel();
