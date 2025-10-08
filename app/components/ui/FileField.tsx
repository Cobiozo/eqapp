import clsx from "clsx";
import { useContext, useState } from "react";
import { GlobalContext } from "~/root";

type Props = {
  name: string;
  label?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: any, isServer: boolean) => Promise<true | string>;
  defaultValue?: string;
  accept?: "*";
  required?: boolean;
}

export default function FileField({
  name,
  label,
  className,
  onChange,
  validate,
  accept,
  required,
  defaultValue
}: Props) {
  const [error, setError] = useState("");
  const { t } = useContext(GlobalContext);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validate) {
      const result = await validate(e.target.value, false);
      setError(result === true ? "" : result);
    }
    if (onChange) {
      onChange(e);
    }
  }
  
  return (
    <div className={clsx("max-w-15 my-6", className)}>
      <label
        className="block mb-2"
        htmlFor={name}
      >
        { label && (
          <span className="text-sm font-semibold block mb-2">
            { t(label) }
            { required && <span className="text-red-500">*</span> }
          </span>
        )}
          { defaultValue && defaultValue.split('.').pop() === "mp3" && (
              <audio controls>
                <source src={"/uploads/" + defaultValue} type="audio/mpeg" />
              </audio>
          )}
          { defaultValue && defaultValue.split('.').pop() === "wav" && (
              <audio controls>
                <source src={"/uploads/" + defaultValue} type="audio/wav" />
              </audio>
          )}
          <input
            className={clsx(
              "mx-auto block cursor-pointer my-3 w-52 bg-transparent border outline-none transition-colors",
              "focus:border-primary",
              error && "border-red-500",
            )}
            type="file"
            name={name}
            onChange={handleChange}
            id={name}
            accept={accept ? accept.join(',') : "*"}
          />
      </label>
      { error && (
        <span className="text-red-500 text-sm px-2 block">
          {error}
        </span>
      )}
    </div>
  );
}

