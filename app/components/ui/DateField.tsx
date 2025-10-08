import clsx from "clsx";
import DatePicker from "react-datepicker";
import { useContext, useMemo, useState } from "react";
import { IconType } from "react-icons";
import { GlobalContext } from "~/root";

type Props = {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  onChange?: (value: Date) => void;
  validate?: (value: Date, isServer: boolean) => Promise<true | string>;
  defaultValue?: Date;
  icon?: IconType
  min?: Date,
  max?: Date,
}

export default function DateField({
  name,
  label,
  className,
  required,
  icon,
  onChange,
  defaultValue,
  min,
  max
}: Props) {

  const { t } = useContext(GlobalContext);
  const [currentDate, setCurrentDate] = useState(defaultValue ? new Date(defaultValue) : new Date());

  const handleChange = (value: Date) => {
    setCurrentDate(value);
    if (onChange) onChange(value);
  }

  const isError = useMemo(() => {
    if (required && !currentDate) return true;
    return false;
  }, [currentDate, required]);

  return (
    <div className={clsx(className, "block my-4")}>
      <label className="w-52 block mx-auto">
        <span className="text-sm font-semibold block mb-2">
          { label && t(label)}
          { label && required && <span className="text-red-500">*</span> }
        </span>
      </label>
      <div className="relative w-[350px] date-picker">
        <DatePicker
          name={name}
          className={clsx(
            "text-dark bg-light dark:bg-dark border-2 rounded-lg border-dark dark:border-medium-darker dark:text-light  outline-none border-b px-2 py-2 w-52 -ml-2",
            "dark:text-light"
          )}
          selected={currentDate}
          value={currentDate}
          onChange={handleChange}
          showTimeSelect
          minDate={min}
          maxDate={max}
          dateFormat="yyyy-MM-dd HH:mm"
        />
        { isError && (
          <span className="block text-sm text-red-500 mt-2">
            {t("common.validation.required")}
          </span>
        )}
      </div>
    </div>
  );
}

