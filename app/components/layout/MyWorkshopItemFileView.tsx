import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { SupportedLanguage } from "@prisma/client";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import Button from "../ui/Button";
import ExtIcon from "../ui/ExtIcon";

type Props = {
  name: string;
  title: string;
  type: string;
  language: string;
  id: string;
  workshopItemId: string;
}

export default function MyWorkshopItemFileView({name, title, type, language, id, workshopItemId }: Props) {
  const { t } = useContext(GlobalContext);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
   
  return (
    <li
      className="flex items-center gap-4 px-2 mb-4 bg-light dark:bg-dark border-light-border dark:border-medium-darker rounded-lg border dark:border-medium-darker max-w-lg mx-auto"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div>
        <ExtIcon extension={type} className="text-4xl" />
      </div>
      <div>
        <h2 className="font-semibold flex items-center gap-2">
          {title}
          { language !== SupportedLanguage.intl && (
            <img className="w-4 h-4" src={"/images/flags/" + language + ".webp"} alt={language} />
          )}
        </h2>
        <span className="text-[0.5rem]">{name}</span>
      </div>
      <div className="ml-auto">
        <Button
          className="bg-white"
          size="xs"
          variant="danger"
          to={`/dashboard/my-workshops/edit/item/${workshopItemId}/files/remove/${id}`}
          icon={FaTimes}
        >
          {t("common.remove")}
        </Button>
      </div>
    </li>
  )
}