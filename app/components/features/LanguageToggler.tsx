import { useFetcher } from "@remix-run/react";
import { useContext, useState } from "react";
import config from "~/config";
import { GlobalContext } from "~/root";

export default function LanguageToggler() {
  const fetcher = useFetcher();
  const [showOptions, setShowOptions] = useState(false);
  const { lang: currentLang } = useContext(GlobalContext);

  const handleChange = (lang: string) => {
    setShowOptions(false);
    fetcher.submit(
      null,
      { method: "post", action: "/action/set-lang/" + lang }
    );
  }

  const langOptions = config.supportedLanguages
    .filter(lang => lang !== currentLang)

  return (
    <div className="relative mx-1">
      <a className="border-2 border-current rounded-full text-xl w-10 h-10 flex justify-center items-center cursor-pointer">
      <img
          onClick={() => setShowOptions(!showOptions)}
          src={"/images/flags/" + currentLang + ".webp"}
          alt={currentLang}
        />
      </a>
      { showOptions && (
        <ul className="absolute top-14 2xs:bottom-auto z-20 flex flex-col items-center w-full">
          {langOptions.map(lang => (
            <li key={lang}>
              <button onClick={() => handleChange(lang)} className="transition-opacity border-2 mt-2 border-current rounded-full text-xl w-8 h-8 flex justify-center items-center cursor-pointer opacity-80 hover:opacity-100">
                <img src={"/images/flags/" + lang + ".webp"} alt={lang} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
