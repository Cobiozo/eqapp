import { AiOutlineEdit, AiOutlineFolder } from "react-icons/ai";
import Button from "../ui/Button";
import { FaTimes } from "react-icons/fa";
import { Link } from "@remix-run/react";
import { useContext } from "react";
import type { Icon as IconType } from "@prisma/client";
import { BoardColor } from "@prisma/client";
import { GlobalContext } from "~/root";
import { PermissionName } from "@prisma/client";
import Icon from "./Icon";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import clsx from "clsx";


type Props = {
  name: string;
  id: string;
  url?: string | null
  icon: IconType | null;
  variant: "subDir" | "item";
  isAdmin?: boolean;
  color: BoardColor;
  removable?: boolean;
}

export default function BoardLink({ name, color, variant, id, icon, url, isAdmin, removable }: Props) {
  const { user } = useContext(GlobalContext);
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

  const getColorClassName = (color: BoardColor) => {
    switch(color) {
      case BoardColor.PRIMARY:
        return "text-primary dark:text-[#3b9aff]";
      case BoardColor.PRIMARY_LIGHTER:
        return "text-primary-lighter dark:text-[#43a9ff]";
      case BoardColor.GREEN:
        return "text-green-500";
      case BoardColor.RED:
        return "text-red-500";
      case BoardColor.ORANGE:
        return "text-orange-500";
      default:
        return "text-dark dark:text-light";
    }
  }

  return (
    <li
      ref={isAdmin ? setNodeRef : null}
      style={isAdmin ? style : {}}
      {...(isAdmin ? attributes : {})}
      {...(isAdmin ? listeners : {})}
      className={clsx(
        getColorClassName(color),
        "text-sm font-semibold bg-white dark:bg-dark-lighter border-current flex gap-2 items-center rounded px-3 my-3 py-2 mx-auto max-w-sm",
        isAdmin && variant === "subDir" ? "border-gold border-2" : "border"
      )}
    >
      { icon && <Icon className="text-xl flex-none" name={icon} /> }
      { variant === "subDir" && (
        <Link to={isAdmin ? `/dashboard/admin/boards/${id}` : `/dashboard/boards/${id}`}>
          <div>{name}</div>
        </Link>
      )}
      { variant === "item" && isAdmin && (
        <div>{name}</div>
      )}
      { variant === "item" && url && !isAdmin && (
        <a href={url} className="flex-1">
          <div>{name}</div>
        </a>
      )}
      { variant === "item" && !url && !isAdmin && (
        <Link to={ `/dashboard/boards/item/${id}`} className="flex-1">
          <div>{name}</div>
        </Link>
      )}
      { isAdmin && (
        <div className="flex items-center gap-1 ml-auto">
          { user?.permissions[PermissionName.adminPagesEdit] && (
            <Button
              size="xs"
              to={`/dashboard/admin/boards/edit/${variant}/${id}`}
              icon={AiOutlineEdit}
              className="my-0"
            />
          )}
          { user?.permissions[PermissionName.adminPagesRemove] && removable && (
            <Button
              size="xs"
              to={`/dashboard/admin/boards/remove/${variant}/${id}`}
              icon={FaTimes}
              variant="danger"
              className="my-0"
            />
          )}
        </div>
      )}
    </li>
  )
}