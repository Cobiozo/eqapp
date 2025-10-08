import clsx from "clsx";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import { BoardIcon } from "@prisma/client";
import Icon from "../layout/Icon";

type Props = {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  onChange?: (value: any) => void;
  validate?: (value: any, isServer: boolean) => Promise<true | string>;
  defaultValue?: string;
  options: { label: string; value: any }[];
  disabled?: boolean;
  error?: string;
  hidden?: boolean;
}

export default function IconField({
  name,
  label,
  className,
  required,
  onChange,
  defaultValue,
  options,
  disabled = false,
  error,
  hidden = false
}: Props) {

  const { t } = useContext(GlobalContext);

  const [currentItem, setCurrentItem] = useState(options.find(item => item.value === defaultValue) || null);
  const [collapsed, setCollapsed] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // if user collapses select without choosing anything it is required -> show error
  useEffect(() => {
    if (required) {
      if (isTouched && collapsed && !currentItem) {
        setIsError(true);
        setErrorMessage(t("common.validation.required"));
      }
      else {
        setIsError(false);
        setErrorMessage("");
      }
    }
  }, [isTouched, collapsed])

  // if component gets information from the parent about error -> show it
  useEffect(() => {
    if (error) {
      setIsError(true);
      setErrorMessage(error);
    } else {
      setIsError(false);
      setErrorMessage("");
    }
  }, [error])

  const handleChange = async (selectedItem: { label: string, value: any }) => {
    setCurrentItem(selectedItem);
    setCollapsed(true);
    if(onChange) onChange(selectedItem);
  }

  return (
    <label className={clsx(className, "block my-4", hidden && "hidden")}>
      <span className="text-lg font-bold block mb-2">
        { label && t(label)}
        { required && <span className="text-red-500">*</span> }
      </span>
      <div className="relative">
        <input type="hidden" disabled={disabled} name={name} value={currentItem?.value} />
        <div
          className={clsx(
            "text-dark dark:text-light text-sm border-medium-dark focus:outline-none border-outline-none border rounded bg-transparent px-2 py-2 w-52 min-h-10 bg-light dark:bg-dark  dark:border-medium-darker outline-none transition-colors pr-12 cursor-pointer relative",
            "focus:border-primary",
            isError && "border-red-500",
          )}
          onClick={() => { setCollapsed(!collapsed); setIsTouched(true); }}
        >
          <div className="flex items-center gap-1">
            {currentItem?.value && <Icon name={currentItem.value} className="mr-2" /> }
            {currentItem?.label ? (t(currentItem.label) || currentItem.label) : t("common.select") }
          </div>
          {
            collapsed
              ? <FaArrowDown className="absolute right-3 top-3 transition" />
              : <FaArrowUp className="absolute right-3 top-3 transition"/>
          }
        </div>
        { isError && (
          <span className="text-red-500 text-sm px-2 pt-2 block">
            {errorMessage}
          </span>
        )}
        <ul
          className={
            clsx(
              "text-sm border-2 bg-light dark:bg-dark dark:text-light rounded-xl bg-back-end absolute z-10 w-full top-10.5 overflow-hidden flex flex-wrap justify-center mb-10",
              collapsed && "hidden"
            )}
          >
          { !required && (
            <li
              onClick={() => handleChange({ label: "", value: "" })}
              className={clsx(
                "px-4 py-2 cursor-pointer transition select-none w-full",
                "hover:bg-gray-200 dark:hover:bg-zinc-500"
              )}
            >
              <a>{t("common.none")}</a>
            </li>
          )}  
          {options.map(option => (
            <li
              key={option.label}
              onClick={() => handleChange(option)}
              className={clsx(
                "p-2 text-lg cursor-pointer transition select-none text-center",
                "hover:bg-gray-200 dark:hover:bg-zinc-500",
              )}
            >
              <Icon name={option.value} className="mx-auto" />
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
}
