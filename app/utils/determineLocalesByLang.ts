import { SupportedLanguage } from "@prisma/client";

export const determineLocalesByLang = (lang: SupportedLanguage) => {
  switch (lang) {
    case SupportedLanguage.pl:
      return "pl";
    case SupportedLanguage.en:
      return "en";
    case SupportedLanguage.uk:
      return "uk";
    case SupportedLanguage.de:
      return "de";
    case SupportedLanguage.lt:
      return "lt";
    default:
      return "pl";
  }
}