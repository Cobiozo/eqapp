import clsx from "clsx";
import { useState } from "react";

type Props = {
  label?: string,
  name?: string,
  defaultValue?: boolean,
  className?: string,
}

export default function SwitchField({ label, name, defaultValue, className }: Props) {
  const [checked, setChecked] = useState(defaultValue);

  return (
    <label className={clsx("flex gap-4 items-center my-4", className)}>
      <div
        className={clsx(
          "cursor-pointer w-12 h-6 border-3 border-current rounded-lg flex items-center transition dark:text-gold",
          !checked && "opacity-50 dark:text-light",
          checked && "text-primary-lighter"
        )}
      >
        <div className={clsx(
          "w-4 h-4 border-3 mx-1 border-current rounded-full transition",
          checked && "ml-auto bg-primary-lighter dark:bg-gold"
        )}>
        </div>
      </div>
      <span className="mr-2">{label}</span>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={() => setChecked(!checked)}
        value="on"
        className="form-switch hidden"
        defaultChecked={defaultValue}
      />
    </label>
  );
}
