import clsx from "clsx";
import { useContext, useEffect, useMemo, useState } from "react";
import { GlobalContext } from "~/root";
import type { DbData } from "~/utils/PageFormBase.server";
import SelectField from "./SelectField";
import Button from "./Button";
import { FaPlus, FaTimes } from "react-icons/fa";
import type FormDBMultiSelectItem from "~/utils/validation/types/FormDBMultiSelectItem";

type Item = {
  label: string;
  value: string;
}

type Props = {
  name: string;
  label?: string;
  className?: string;
  onChange?: (selectedItems: Item[]) => void;
  validate?: (value: any, isServer: boolean) => Promise<true | string>;
  defaultValue?: { id: string, [x: string]: any }[];
  model: string;
  dbData?: DbData,
  description?: string;
  required?: boolean;
  optionsConfig: FormDBMultiSelectItem["optionsConfig"]
  hidden?: boolean;
}

export default function DBMultiSelectField({
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

  const possibleItems = useMemo(() => {
    const possibleItems: Item[] = [];
    const modelName = model[0].toLowerCase() + model.slice(1);
    
    // if field is not required, we need to add "empty" option
    if (dbData && modelName in dbData) {
      for (const item of dbData[modelName]) {
        
        // if optionsConfig has ignore function,
        // we need to check if we should ignore this item
        // if so, just go to next item
        if (optionsConfig.ignore && optionsConfig.ignore(item))
          continue;

        // if optionsConfig says that label should be translated, we need to use t function
        // otherwise, we can just use label as is
        const label = optionsConfig.translate ? t(optionsConfig.label(item, lang)) : optionsConfig.label(item, lang);
        possibleItems.push({ label: label, value: item.id });
      }
    }

    return possibleItems;

  }, [dbData, model, optionsConfig, t, lang]);

  useEffect(() => {
    if (defaultValue) {
      const defaultValueIds = defaultValue.map((item) => item.id);
      const defaultItems = possibleItems.filter((item) => defaultValueIds.includes(item.value));
      setChosenItems(defaultItems);
    }

    // if no default value, but chooseAllByDefault is set,
    // we need to add all items to chosenItems at start
    if (optionsConfig.chooseAllByDefault && !defaultValue)
      setChosenItems(possibleItems);
  }, [defaultValue, possibleItems, optionsConfig.chooseAllByDefault]);

  const [chosenItems, setChosenItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isTouched, setIsTouched] = useState(false);

  const handleSelectChange = (item: Item) => {
    if (item) {
      setSelectedItem(item);
    }
  }

  const handleAddItem = () => {
    setIsTouched(true);
    if (selectedItem?.value && !chosenItems.find((item) => item.value === selectedItem.value)) {
      const newChosenItems = [...chosenItems, selectedItem];
      setChosenItems([...newChosenItems]);
      if (onChange) {
        onChange(newChosenItems);
      }
    }
  }

  const removeItem = (value: string) => {
    const newChosenItems = chosenItems.filter((item) => item.value !== value);
    setChosenItems(newChosenItems);
    if (onChange) {
      onChange(newChosenItems);
    }
  }

  return (
    <div className={clsx("mx-auto my-6", className, hidden && "hidden")}>
      <div>
        <span className="text-sm font-semibold block mb-2">
          { label && t(label)}
          { required && <span className="text-red-500">*</span> }
        </span>
        <input
          type="hidden"
          name={name}
          value={chosenItems.map((item) => item.value).join(",")}
        />
        <div className="relative max-w-15">
          {
            model && (
              <div className="flex items-center gap-2">
                <SelectField
                  className="mt-0"
                  name={name + "_select"}
                  options={possibleItems}
                  onChange={handleSelectChange}
                />
                <Button
                  type="button"
                  className="my-0"
                  onClick={handleAddItem}
                  icon={FaPlus}
                  iconSize="0.8em"
                />
            </div>
          )}
          <ul className="flex flex-wrap w-68">
            {chosenItems.map((item, index) => (
              <li
                key={item.value}
                className="flex gap-2 border border-gray-300 rounded-full px-2 py-1 m-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
              >
                {item.label}
                <button
                  type="button"
                  className="border-none bg-none text-red-500 focus:outline-none"
                  onClick={() => removeItem(item.value)}
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>
          { required && isTouched && !chosenItems.length && (
          <span className="text-red-500 text-sm px-2 pt-2 block">
            {t("common.validation.required")}
          </span>
        )}
        </div>
      </div>
    </div>
  );
}

