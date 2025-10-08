import clsx from "clsx";
import { useContext, useState } from "react";
import { GlobalContext } from "~/root";
import config from "~/config";
import prepareValidateFunc from "~/utils/validation/prepareValidateFunc";
import WysiwygField from "./Wysiwyg";

type Props = {
  name: string;
  validate?: (value: string) => Promise<string | true>;
  label?: string;
  required?: boolean;
  className?: string;
  defaultValue?: Record<string, string>,
  minLength?: number;
  maxLength?: number;
  modules: any;
  formats: any;
}

export default function TextMultiLangField({
  name,
  required,
  label,
  className,
  defaultValue,
  modules,
  formats,
}: Props) {
  const { t, lang: currentLang } = useContext(GlobalContext);

  return (
    <div className={clsx(className, "block my-4")}>
      <span className="text-sm font-semibold block mb-2">
        { label && t(label)}
        { required && <span className="text-red-500">*</span> }
      </span>
      <div>
        <WysiwygField
          name={`${name}_ver_${currentLang}`}
          required={required}
          defaultValue={defaultValue && defaultValue[currentLang]}
          validate={prepareValidateFunc({ type: "wysiwyg", required })}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  )
}
