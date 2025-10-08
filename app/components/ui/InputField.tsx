import clsx from "clsx";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { useState } from "react";
import extractError from "~/utils/validation/extractError";

type Props = {
  type: "text" | "email" | "number" | "password" | "tel"
  name: string,
  label?: string,
  placeholder?: string,
  required?: boolean,
  validate?: (value: string) => string | true,
  className?: string,
  defaultValue?: string,
  onChange?: (value: string) => void,
  value?: string
  description?: string
}

export default function InputField({
  type,
  name,
  required,
  placeholder,
  label,
  validate,
  className,
  defaultValue,
  onChange,
  value,
  description
}: Props) {
  const { t } = useContext(GlobalContext);
  const [error, setError] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validate) {
      const result = await validate(e.target.value);
      setError(result === true ? "" : t(...extractError(result)));
    }
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <label className={clsx(className, "block my-4")}>
      <span className="text-sm font-semibold block mb-2">
        { label && t(label)}
        { label && required && <span className="text-red-500">*</span> }
      </span>
      <input
        className={clsx(
          "text-dark text-sm border-medium-dark focus:outline-none border-outline-none border rounded bg-transparent px-2 py-2 w-52",
          "dark:text-light dark:bg-dark dark:border-medium-darker"
        )}
        value={value}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
        autoComplete="false"
        defaultValue={defaultValue}
      />
      {description && (
        <span className="block text-xs text-gray-500 mt-2 w-60">
          {t(description)}
        </span>
      )}
      { error && <span className="block text-sm text-red-500 mt-2">{error}</span> }
    </label>
  )
}
