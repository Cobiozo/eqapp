import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { BsPlusLg } from "react-icons/bs";
import extractError from "~/utils/validation/extractError";
import { File } from "@prisma/client";

type Props = {
  name: string;
  label?: string;
  className?: string;
  onChange?: (values: string[]) => void;
  validate?: (value: string[], isServer: boolean) => Promise<true | string>;
  defaultValue?: File[];
  required?: boolean;
}

export default function FilesField({
  name,
  label,
  className,
  onChange,
  validate,
  required,
  defaultValue
}: Props) {

  const { t } = useContext(GlobalContext);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [dt, setDt] = useState<DataTransfer | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // we have to wait with creation of dt until React is on the client-side
  useEffect(() => {
    if (DataTransfer)
      setDt(new DataTransfer());
  }, []);

  // if defaultVale is provided, we have to set it
  // we can do it directly at state creation, because we need to prepare it first
  // component expects array of strings, but defaultValue is array of File records
  useEffect(() => {

    if (defaultValue)
      setFiles(defaultValue.map(file => file.title));
  }, []);

  // filesSummary will be used on the server-side to validate the field
  // precisely, it allows us to compare old files values with new ones
  const filesSummary = useMemo(() => {
    return files.map(fileTitle => {
      if (defaultValue)
        return defaultValue.find(f => f.title === fileTitle)?.name || fileTitle
      return fileTitle;
    });
  }, [files, defaultValue]);

  // when user select file or files, we update dataTransfer array and files array
  // dt is used as value of file input, so selecting files again = adding new files, not replacing them
  // files array stores only file names, so we can display them as a list to user
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    // we know that `dt` and `inputRef` should be ready by now
    // but let's satisfy TypeScript ;)
    if (!dt || !inputRef.current) return;
    const filesFromInput = e.target.files ? Array.from(e.target.files) : [];

    // create new array
    // we will store filenames of new files in here
    // why? because there's no need to update `files` state for every loop
    // it's more efficient to gather all the names and then update it once
    const newFiles: string[] = [];

    // loop over new files
    // add files to dt
    // add filenames to newFiles array
    for(const file of filesFromInput) {
      newFiles.push(file.name);
      dt.items.add(file);
    }

    // update both arrays
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    inputRef.current.files = dt.files;

    // try to validate new data
    const validation = (validate) ? await validate(updatedFiles, false) : true;
    if (validation !== true) {
      setIsError(true);
      setErrorMessage(t(...extractError(validation)));
    }

    // if onChange prop is provided, we call it with new files array
    if (onChange)
      onChange(updatedFiles);
  }

  // when user clicks on remove button, we have remove file from both arrays
  // we remove file from dt and update input files value accordingly
  // also we remove filename from files array
  const handleRemove = async (fileName: string) => {

    // dt and inputRef should be ready by now
    // but let's satisfy TypeScript ;)
    if (!dt || !inputRef.current) return;

    // loop for every dt item
    // if filename = arg value -> remove this item
    let i = 0;
    for(const item of dt.items) {
      if (item.getAsFile()?.name === fileName) {
        dt.items.remove(i);
        break;
      }
      i++;
    }

     // update both arrays
     const updatedFiles = files.filter(file => file !== fileName);
     setFiles(updatedFiles);
     inputRef.current.files = dt.files;

     // try to validate new data
     const validation = (validate) ? await validate(updatedFiles, false) : true;
     if (validation !== true) {
       setIsError(true);
       setErrorMessage(t(...extractError(validation)));
     }

     // if onChange prop is provided, we call it with new files array
     if (onChange)
       onChange(updatedFiles);
  }

  return (
    <div className={clsx("w-52 my-6", className)}>
      <label
        className="block mb-2"
        htmlFor={name}
      >
        <header className="flex items-center justify-between">
          { label && (
            <span className="text-sm font-semibold block mb-2">
              {t(label)}
              { required && <span className="text-red-500">*</span> }
            </span>
          )}
          <a className="text-sm border-2 border-current p-1 mb-1 cursor-pointer">
            <BsPlusLg />
          </a>
        </header>
        <div className="relative">
          <div>
            <input
              id="files"
              ref={inputRef}
              type="file"
              name={name}
              multiple
              className="hidden"
              onChange={handleChange}
            />
            <input type="hidden" name={name + "_summary"} value={filesSummary} />
          </div>
        </div>
      </label>

      { files.length > 0 && (
        <ul>
          { files.map((file) => (
            <li key={file} className="flex items-center justify-between border-b border-dashed py-1 ">
              {file}
              <a onClick={() => handleRemove(file)}>
                <FaTimes className="text-red-500 ml-2 cursor-pointer" />
              </a>
            </li>
          ))}
        </ul>
      )}
      { files.length === 0 && (
        <span className="px-2">{t("common.noData")}</span>
      )}

      { isError && (
        <span className="text-red-500 text-sm px-2 block">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

