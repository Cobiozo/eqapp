import clsx from "clsx";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import BoxTitle from "../ui/BoxTitle";
import ExtIcon from "../ui/ExtIcon";
import { Link } from "react-router-dom";

type File = {
  id: string,
  title: string,
  name: string,
  type: string,
  languageId: string,
}
type Props = {
  className?: string,
  listClassName?: string,
  files: File[],
}

const FileLink = ({ file }: { file: File }) => {
  if (file.type === "application/pdf")
    return (
      <Link
        to={`/dashboard/pdf-reader/${file.id}`}
        className="link flex items-center text-xm md:text-md"
      >
        <ExtIcon
          extension={file.type}
          className="mr-2"
        />
        {file.title}
      </Link>
    )

  return (
    <a
      href={`/uploads/${file.name}`}
      download
      className="link flex items-center text-xs md:text-md"
    >
      <ExtIcon
        extension={file.type}
        className="mr-2"
      />
      {file.title}
    </a>
  );

}

export default function FilesBox({ className, listClassName, files }: Props) {
  const { t } = useContext(GlobalContext);

  return (
    <section className={clsx(className)}>
      <BoxTitle className="text-center">
        {t("common.relatedFiles")}
      </BoxTitle>
      <ul className={clsx(listClassName, "standard-content")}>
        {files.map(file => (
          <li
            key={file.id}
            className={clsx("p-2 mb-2 bg-light dark:bg-dark border border-primary-lighter rounded-lg dark:border-medium-darker")}
          >
           <FileLink file={file} />
          </li>
        ))}
      </ul>
    </section>
  )
}
