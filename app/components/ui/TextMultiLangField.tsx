import clsx from "clsx";
import { useContext, useState } from "react";
import { GlobalContext } from "~/root";
import config from "~/config";
import InputField from "./InputField";
import prepareValidateFunc from "~/utils/validation/prepareValidateFunc";

type Props = {
  name: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  validate?: (value: string) => string | true,
  className?: string,
  defaultValue?: Record<string, string>,
  onChange?: (value: Record<string, string>) => void,
}

export default function TextMultiLangField({
  name,
  required,
  placeholder,
  label,
  className,
  defaultValue,
}: Props) {
  const { t, lang: currentLang } = useContext(GlobalContext);

  return (
    <div className={clsx(className, "block my-4")}>
      <span className="text-sm font-semibold block mb-2">
        { label && t(label)}
        { required && <span className="text-red-500">*</span> }
      </span>
      <div>
        <InputField
          type="text"
          name={`${name}_ver_${currentLang}`}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue && defaultValue[currentLang]}
          validate={prepareValidateFunc({ type: "text", required })}
        />
      </div>
    </div>
  )
}
