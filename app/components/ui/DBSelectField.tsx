import clsx from "clsx";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import type { DbData } from "~/utils/PageFormBase.server";
import SelectField from "./SelectField";

type Item = {
  label: string;
  value: string;
}

type Props = {
  name: string;
  label?: string;
  className?: string;
  onChange?: (selectedItem: Item) => void;
  validate?: (value: any, isServer: boolean) => Promise<true | string>;
  defaultValue?: string;
  model: string;
  dbData?: DbData,
  description?: string;
  required?: boolean;
  optionsConfig: {
    label: (item?: any, lang?: string) => string;
    translate?: boolean;
    sort?: (a: any, b: any) => number;
  },
  hidden?: boolean;
}

export default function DBSelectField({
  name,
  label,
  className,
  defaultValue,
  model,
  dbData,
  onChange,
  required = false,
  optionsConfig,
  hidden = false
}: Props) {
  const { t, lang } = useContext(GlobalContext);

  // Preparing data options on startup
  // App parses the whole form schema before creating form view and and loads all needed data from DB and...
  // ...puts in dbData object.
  // Object that is later passed to field component itself (as dbData prop).
  // Therefore we can assume, that dbData has all the data we need.
  // Nevertheless, let's better check if it's really here.
  // Maybe there was typo in collection name and data couldn't be retrieved?

  const possibleItems: Item[] = [];
  const modelName = model[0].toLowerCase() + model.slice(1);

  // if field is not required, we need to add "empty" option
  if (!required)
    possibleItems.push({ label: t("common.select"), value: "" });

  if (dbData && modelName in dbData) {
    const items = optionsConfig.sort ? dbData[modelName].sort(optionsConfig.sort) : dbData[modelName];
    for (const item of items) {
      // if optionsConfig says that label should be translated, we need to use t function
      // otherwise, we can just use label as is
      const label = optionsConfig.translate ? t(optionsConfig.label(item, lang)) : optionsConfig.label(item, lang);
      possibleItems.push({ label: label, value: item.id });
    }
  }

  const handleChange = (item: Item) => {
    if (onChange) {
      onChange(item);
    }
  }

  return (
    <div className={clsx("mx-auto my-6", className, hidden && "hidden")}>
      <div className="relative max-w-15">
        {
          model && (
            <SelectField
              className="mt-0"
              label={label}
              name={name}
              options={possibleItems}
              onChange={handleChange}
              defaultValue={defaultValue}
              required={required}
            />
          )
        }
      </div>
    </div>
  );
}

