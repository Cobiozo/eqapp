import type { Language, SupportedLanguage } from "@prisma/client";
import { redirect, type ActionFunction, type LoaderFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import LanguageCarousel from "~/components/features/LanguageCarousel";
import Container from "~/components/layout/Container";
import Notification from "~/components/ui/Notification";
import PageHeader from "~/components/ui/PageHeader";
import config from "~/config";
import { globalMiddleware } from "~/middlewares/global.server";
import { languageModel } from "~/models/language.server";
import type { UserWithRole} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";

export const action: ActionFunction = async ({ request }) => {

  // try to get language from form-data
  const fd = await request.formData();
  const language = fd.get("language");

  // check if lang is supported
  // return { error: true }
  if(!config.supportedLanguages.includes(language as string))
    return { error: true }

  // if lang is supported
  // update lang in cookie
  // but also in user record (if logged)
  // with updating the cookie, redirect to setup -> newsletter page as well
  if (await sessionService.isLogged(request)) {
    const loggedUser = await sessionService.getUserId(request);
    const langRecord = await languageModel.getByName(language as SupportedLanguage);
    if (loggedUser && langRecord) {
      await userModel.update(loggedUser, { languageId: langRecord.id });
    }
  }

  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");
  if (redirectTo)
    return await translateService.setLang(request, language as string, redirectTo);
  else
    return await translateService.setLang(request, language as string, "/dashboard");
}

export const loader: LoaderFunction = async ({ request, params }) => {

  // if lang set, ignore setup page
  const lang = await translateService.isLangSet(request);
  if (lang) {
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo");
    if (redirectTo)
      return redirect(redirectTo);
    else
      return redirect("/dashboard");
  }

  // if lang is not set, just continue
  await globalMiddleware({ request, params });

  // check url, if there is ref in url, check if it's valid user
  // if it is, get it's language and just set in to user
  // then redirect where user wanted to go
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo");
  if (!redirectTo)
    return null;
  
  const redirectToUrl = new URL(url.origin + "/" + redirectTo);
  const refFromUrl = redirectToUrl?.searchParams.get("ref");
  const ref = refFromUrl !== "null" ? refFromUrl : null;

  if (ref) {
    const refUser = await userModel.getById(ref as string, ["language"]) as UserWithRole & { language: Language };
    if (!refUser)
      return null;

    if (redirectTo)
      return await translateService.setLang(request, refUser!.language.name as string, redirectTo);
    else
      return await translateService.setLang(request, refUser!.language.name as string, "/dashboard");
  }

  return null;
}

export default function SetupIndex() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (actionData?.error)
      setShowError(true);
  }, [actionData]);

  return (
    <section>
      <Container>
        { showError && (
          <Notification variant="danger" autoClose={true} onClose={() => setShowError(false)}>
            {t("setup.langNotSupported")}
          </Notification>
        )}
        <PageHeader>
          {t("setup.title")}
        </PageHeader>
        <LanguageCarousel />
      </Container>
    </section>
  );
}