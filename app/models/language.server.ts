import type { Language, SupportedLanguage } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { Language };

class LanguageModel extends BaseDbModel<Language>("language") {
  async getByName(name: SupportedLanguage): Promise<Language | null> {
    return db.language.findFirst({ where: { name } });
  }
}

export const languageModel = new LanguageModel();
