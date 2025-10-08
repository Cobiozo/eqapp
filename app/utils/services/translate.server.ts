import { createCookie, json, redirect } from "@remix-run/node";
import translateFunc from "../translate";
import config from "~/config";

const langCookie = createCookie("lang", {
  maxAge: 60 * 60 * 24 * 365,
  secrets: [process.env.SECRET || "fsd4wrxr"],
});


class TranslateService {

  /** Returns current lang */
  /* @param request
  /* @returns lang key (e.g. pl) */
  async getCurrentLang(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await langCookie.parse(cookieHeader)) || {};

    return cookie.lang || "pl";
  }

  async isLangSet(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await langCookie.parse(cookieHeader)) || {};

    return !!cookie.lang;
  }

  /** Set language mode to given one */
  /* @param request
  /* @param lang key of language to set
  /* @param redirectTo optional redirect url
  /* @returns json response with theme cookie */
  async setLang(request: Request, lang: string, redirectTo?: string) {

    // try to retrieve the cookie
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await langCookie.parse(cookieHeader)) || {};

    // check if lang is supported
    if (!config.supportedLanguages.includes(lang))
      return new Error("Language not supported");

    // if everything is okay -> set new language
    cookie.lang = lang;

    if (!redirectTo)
      return json(
        { success: true },
        { headers: { "Set-Cookie": await langCookie.serialize(cookie) } }
      );
    else
      return redirect(redirectTo, {
        headers: { "Set-Cookie": await langCookie.serialize(cookie) },
      });
  }

  /** Returns translation for given key */
  /* @param lang
  /* @param key
  /* @param data optional data to replace in translation
  /* @returns translation or empty string (if nothing fits) */
  translate(lang: string, key: string, data?: string | number, dataTwo?: string | number) {
    return translateFunc(lang, key, data, dataTwo);
  }

  /** Checks if lang cookie exists */
  /* @param request
  /* @returns boolean */
  async langCookieExists(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await langCookie.parse(cookieHeader)) || {};

    return !!cookie.lang;
  }
}

const translateService = new TranslateService();
export default translateService;
