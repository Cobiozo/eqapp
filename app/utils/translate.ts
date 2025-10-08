import config from "~/config";
import pl from "~/locales/pl.lang";
import en from "~/locales/en.lang";
import uk from "~/locales/uk.lang";
import de from "~/locales/de.lang";
import lt from "~/locales/lt.lang";

const langData ={
  pl,
  en,
  uk,
  de,
  lt
}

type langKey = { [key: string]: string | langKey } | string;

export default function translate(
  lang: string,
  key: string,
  data?: string | number,
  dataTwo?: string | number
) {

  // check if lang is supported, if no -> return ""
  if (!config.supportedLanguages.includes(lang) || !(lang in langData))
    return "";

  // if lang is supported, try to find proper translation
  // @ts-ignore - we already checked if lang is supported
  const currentLangData = langData[lang];
  const keys = key.split('.');

  let keyValue: string = "";
  if (keys.length === 1) {
    if (key in currentLangData) {
      // @ts-ignore - if key exists, it has to be a string or langKey, there is no other way
      keyValue = typeof currentLangData[key] === 'string' ? currentLangData[key] : "";
    }
  }

  if (keys.length > 1) {
    keyValue = keys.reduce((acc: langKey, curr) => {
      return typeof acc === "object" && curr in acc ? acc[curr] : "";
    }, currentLangData) as string;
  }

  // if there is a data, try to find placeholder and replace it with this data
  // else just return keyValue as it is
  let returnVal = keyValue as string;
  if (data) {
    returnVal = returnVal.replace("{0}", data.toString());
  }
  if (dataTwo) {
    returnVal = returnVal.replace("{1}", dataTwo.toString());
  }
  return returnVal;
}

