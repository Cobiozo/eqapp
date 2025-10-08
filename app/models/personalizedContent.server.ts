import type { PersonalizedContent } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { PersonalizedContent };

class PersonalizedContentModel extends BaseDbModel<PersonalizedContent>("personalizedContent") {
  async create(
    data: Omit<PersonalizedContent, "id">
  ) {
    return await db.personalizedContent.create({
      data,
    });
  }

  async update(
    id: PersonalizedContent["id"],
    data: Partial<Omit<PersonalizedContent, "id">>
  ) {
    return await db.personalizedContent.update({
      where: { id },
      data,
    });
  }

  async getByType(
    type: PersonalizedContent["type"]
  ) {
    return await db.personalizedContent.findFirst({
      where: { type },
    });
  }
}

export const personalizedContentModel = new PersonalizedContentModel();
