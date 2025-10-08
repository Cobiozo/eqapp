import { AiOutlineEdit } from "react-icons/ai";
import Button from "../ui/Button";
import { FaTimes } from "react-icons/fa";
import { Link } from "@remix-run/react";
import { useContext } from "react";
import type { Icon as IconType } from "@prisma/client";
import { GlobalContext } from "~/root";
import Icon from "./Icon";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import clsx from "clsx";


type Props = {
  name: string;
  id: string;
  icon: IconType | null;
  variant: "subDir" | "item";
  isAdmin?: boolean;
  adminLink?: string;
}

export default function MyWorkshopLink({ name, variant, id, icon, isAdmin, adminLink = "admin/workshops" }: Props) {
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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "text-primary-lighter",
        "text-sm font-semibold bg-white dark:bg-dark border-current flex gap-2 items-center rounded px-3 my-3 py-2 mx-auto max-w-sm",
        isAdmin && variant === "subDir" ? "border-gold border-2" : "border"
      )}
    >
      { icon && <Icon className="text-sm flex-none" name={icon} /> }
      { variant === "subDir" && (
        <Link to={isAdmin ? `/dashboard/${adminLink}/${id}` : `/dashboard/workshops/${id}`}>
          <div className="font-semibold ">{name}</div>
        </Link>
      )}
      { variant === "item" && isAdmin && (
        <div className="font-semibold ">{name}</div>
      )}
      <div className="flex items-center gap-1 ml-auto">
        <Button
          className="my-0"
          size="xs"
          to={`/dashboard/${adminLink}/edit/${variant}/${id}`}
          icon={AiOutlineEdit}
        />
        <Button
          className="my-0"
          size="xs"
          to={`/dashboard/${adminLink}/remove/${variant}/${id}`}
          icon={FaTimes}
          variant="danger"
        />
      </div>
    </li>
  )
}