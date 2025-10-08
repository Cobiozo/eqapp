import { SupportedLanguage } from "@prisma/client";
import { useContext, useState } from "react";
import { GlobalContext } from "~/root";
import BoxTitle from "../ui/BoxTitle";
import { FadeInUp } from "./AOM"; 
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";
import config from "~/config";
import Button from "../ui/Button";
import { Form } from "@remix-run/react";

export default function LanguageCarousel() {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(SupportedLanguage.pl);
  const languages = config.supportedLanguages as SupportedLanguage[];
  const { t } = useContext(GlobalContext);
  
  const goRight = () => {
    const currentIndex = languages.indexOf(currentLanguage);
    if (currentIndex === languages.length - 1) {
      setCurrentLanguage(languages[0]);
    } else {
      setCurrentLanguage(languages[currentIndex + 1]);
    }
  }

  const goLeft = () => {
    const currentIndex = languages.indexOf(currentLanguage);
    if (currentIndex === 0) {
      setCurrentLanguage(languages[languages.length - 1]);
    } else {
      setCurrentLanguage(languages[currentIndex - 1]);
    }
  }

  return (
    <section>
      <BoxTitle>
        {t("setup.chooseLanguage")}
      </BoxTitle>
      <FadeInUp>
        <div className="flex justify-center gap-10 mt-6 items-center text-primary-lighter">
          <FaArrowLeft className="text-2xl cursor-pointer shrink-0" onClick={goLeft} />
          <img
            className="w-36 rounded-full border-6 border-white flex-shrink"
            src={"/images/flags/" + currentLanguage + "-big.webp"}
            alt={currentLanguage}
          />
          <FaArrowRight className="text-2xl cursor-pointer text-primary-lighter shrink-0" onClick={goRight} />
        </div>
        <Form method="post">
          <input type="hidden" name="language" value={currentLanguage} />
          <Button
            type="submit"
            className="mt-10 mx-auto"
            icon={FaCheck}
          >
            {t("common.save")}
          </Button>
        </Form>
      </FadeInUp>
    </section>
  )
}