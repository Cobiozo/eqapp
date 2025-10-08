import type { PersonalizedContent, WorkshopItem, WorkshopItemFile} from "@prisma/client";
import { PersonalizedContentType, SupportedLanguage } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { workshopItemModel } from "~/models/workshopItem.server";
import { GlobalContext } from "~/root";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import FilesBox from "~/components/features/FilesBox";
import { workshopItemFileModel } from "~/models/workshopItemFile.server";
import { languageModel } from "~/models/language.server";
import Video from "~/components/ui/Video";
import { globalMiddleware } from "~/middlewares/global.server";
import { useWakeLock } from 'react-screen-wake-lock';
import translateService from "~/utils/services/translate.server";
import { sessionService } from "~/utils/services/session.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";
import { FadeIn } from "~/components/features/AOM";
import Fog from "~/components/ui/Fog";
import { personalizedContentModel } from "~/models/personalizedContent.server";
import Button from "~/components/ui/Button";
import { FiSend } from "react-icons/fi";
import { userModel } from "~/models/user.server";
import Alert from "~/components/ui/Alert";

/********* LOADER *********/
type WorkshopItemFull = WorkshopItem & {
  files: WorkshopItemFile[];
} & {
  isRegistered: boolean;
} & {
  freeTimePassedContent: PersonalizedContent
} & {
  isVerified: boolean;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // if logged -> go to partner workshops
  if (await sessionService.isLogged(request))
    return redirect("/dashboard/workshops/item/" + params.id as string);

  // try to find the workshop item
  // it should be in client dir and be supported for the user language
  const currentLang = await translateService.getCurrentLang(request);
  const workshopItem = await workshopItemModel.getClientWorkshopById(params.id as string, currentLang as SupportedLanguage);
  if (!workshopItem)
    return redirect("/404");

  // additionally load all related files
  // remember to load only the ones that are in proper lang (intl or user lang)
  const intlLanguage = await languageModel.getOne({
    name: SupportedLanguage.intl
  });

  const langRecord = await languageModel.getByName(currentLang);
  const relatedFiles = await workshopItemFileModel.getMany({
    workshopItemId: workshopItem.id,
    languageId: {
      in: [intlLanguage!.id, langRecord!.id]
    },
  }, undefined, { priority: "asc" });

  // if found, return it
  // also return info if user is registered
  // why? if not, he can watch only a bit of the video
  // and then has to register
  // for the same reason, load personalized content that has content for this occasion
  const unloggedUser = await unloggedUserService.getUnloggedUserData(request);
  const isRegistered = unloggedUser.isRegistered;
  const isVerified = !isRegistered ? false : (await userModel.getById(unloggedUser.userId))?.emailVerified;
  const content = await personalizedContentModel.getByType(PersonalizedContentType.CLIENT_WEBINAR_FREETIME_PASSED);
  return {
    ...workshopItem,
    files: relatedFiles,
    isRegistered,
    isVerified,
    freeTimePassedContent: content
  };
}

export default function WorkshopItemView() {
  const { freeTimePassedContent, isVerified, isRegistered, ...item } = useLoaderData<WorkshopItemFull>();
  const { lang, t } = useContext(GlobalContext);
  const { request } = useWakeLock();
  const [requireRegister, setRequireRegister] = useState(false);

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    const lsWebinarFreeTimeUsed = localStorage.getItem("webinarFreeTimeUsed");
    if (!isRegistered && lsWebinarFreeTimeUsed)
      setRequireRegister(true);
    if (!isRegistered && !lsWebinarFreeTimeUsed) {
      const timer = setTimeout(() => {
        setRequireRegister(true);
      }, 5 * 60000);

      return () => {
        localStorage.setItem("webinarFreeTimeUsed", "true");
        setRequireRegister(true);
        clearTimeout(timer);
      };
    }
  }, [isRegistered]);

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/webinars/client`}>
        <span className="text-sm md:text-lg">
          {item.name[lang]}
        </span>
      </AdminPageHeader>
      { item.description[lang] && (
        <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
          <WysiwygGeneratedContent
            content={item.description[lang]}
          />
        </div>
      )}
      { (!isRegistered || isVerified) && (
        <Video
          className="my-6"
          src={item.url}
        />
      )}
      { isRegistered && !isVerified && (
        <>
          <Alert
            className="rounded-lg mx-auto my-10"
            variant="danger"
            title={t("webinars.youHaveToVerify.title")}
          >
            {t("webinars.youHaveToVerify.description")}
          </Alert>
        </>
      )}
      {item.files.length > 0 && (
        <FilesBox files={item.files} className="mb-6" />
      )}
      { requireRegister && (
        <FadeIn>
          <Fog>
            <div className="max-w-3xl">
              <AdminPageHeader>
                {freeTimePassedContent.title[lang] || ""}
              </AdminPageHeader>
              <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
                <WysiwygGeneratedContent content={freeTimePassedContent.content[lang] || ""} />
              </div>
              <Button
                to={`/dashboard/register-client?forWorkshop=${item.id}`}
                icon={FiSend}
                className="mx-auto"
              >
                {t("webinars.subscribe")}
              </Button>
            </div>
          </Fog>
        </FadeIn>
      )}
    </section>
  );

}