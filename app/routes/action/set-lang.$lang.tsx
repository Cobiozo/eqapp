import type { ActionFunction } from "@remix-run/node";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";
import { userModel } from "~/models/user.server";
import { languageModel } from "~/models/language.server";
import { SupportedLanguage } from "@prisma/client";

export const action: ActionFunction = async ({ request, params }) => {
  const { lang } = params;

  // check if language is supported
  // if not, just do nothing
  if (!Object.keys(SupportedLanguage).includes(lang as string))
    return null;

  // if it's ok, try to find this language in db
  const langRecord = await languageModel.getByName(lang as SupportedLanguage);
  if (!langRecord)
    return null;

  // update lang in user record
  const loggedUser = await sessionService.getUserId(request);
  if (loggedUser) {
    await userModel.update(loggedUser, { languageId: langRecord.id });
  }

  return await translateService.setLang(request, lang as SupportedLanguage);
};
