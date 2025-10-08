import clsx from "clsx";
import { useState, useContext } from "react";
import { FaCheck } from "react-icons/fa";
import { GlobalContext } from "~/root";
import extractTranslateString from "~/utils/ExtractTranslateString";
import extractError from "~/utils/validation/extractError";

type Props = {
  name: string,
  label?: string,
  description?: string,
  required?: boolean,
  defaultValue?: boolean,
  hidden?: boolean,
}


export default function Checkbox({
  name,
  required,
  label,
  description,
  defaultValue,
  hidden = false
}: Props) {
  const [value, setValue] = useState(defaultValue || false);
  const { t } = useContext(GlobalContext);

  return (
    <label className={clsx("block my-4 max-w-sm", hidden && "hidden")}>
      <span className="text-sm font-semibold block mb-2">
        { label && t(label) }
        { label && required && <span className="text-red-500">*</span> }
      </span>
      <div className="flex items-start">
        <div className="border-3 border-dark dark:border-white w-5 h-5 shrink-0 m-2 mr-4">
          { value && <FaCheck className="text-sm text-inherit" /> }
          <input
            defaultChecked={defaultValue}
            value="on"
            onClick={() => setValue(!value)}
            className="w-4 h-4 opacity-0"
            type="checkbox"
            name={name}
            required={required}
          />
        </div>
        { description && (<p className="text-sm" dangerouslySetInnerHTML={{ __html: t(...extractTranslateString(description)) }} />) }
      </div>
    </label>
  )
}
