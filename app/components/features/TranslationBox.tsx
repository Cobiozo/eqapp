import { Link } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import config from "~/config";
import { GlobalContext } from "~/root";
import BoxTitle from "../ui/BoxTitle";

type Props = {
  className?: string,
  currentLanguage: string,
  translations: { [key: string]: string },
  editUrl: (recordId?: string, language?: string) => string,
  createUrl: (recordId?: string) => string,
}

export default function TranslationsBox({ className, currentLanguage, translations, editUrl, createUrl }: Props) {
  const { t } = useContext(GlobalContext);
  const allLangs = config.supportedLanguages;
  const allLangsExceptCurrent = allLangs
    .filter(lang => lang !== currentLanguage);
  const availableTranslations = translations

  return (
    <section className={clsx(className)}>
      <BoxTitle className="text-center">
        {t("common.translations")}
      </BoxTitle>
      <div className="flex items-center ">
        <p>{t("common.currentBrowsing")}</p>
        <img className="w-4 h-4 ml-2" src={`/images/flags/${currentLanguage}.webp`} alt={currentLanguage} />
      </div>
      <div>
        <strong className="block my-4">
          {t("common.otherTranslations")}:
        </strong>
        <div>
          <ul className="">
            {allLangsExceptCurrent.map(lang => (
              <li key={lang} className="flex items-center border-dashed border-b py-2">
                <img className="w-4 h-4 mr-2" src={`/images/flags/${lang}.webp`} alt={lang} />
                {availableTranslations[lang] ?
                  (
                    <Link className="link" to={editUrl(lang, availableTranslations[lang])}>{t("common.edit")}</Link>
                  )
                  :
                  (
                    <Link className="link" to={createUrl(lang)}>{t("common.create")}</Link>
                  )
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
