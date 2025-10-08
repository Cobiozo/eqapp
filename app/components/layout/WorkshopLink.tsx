import { AiOutlineEdit } from "react-icons/ai";
import Button from "../ui/Button";
import { FaTimes } from "react-icons/fa";
import { Link } from "@remix-run/react";
import { useContext } from "react";
import type { Icon as IconType } from "@prisma/client";
import { GlobalContext } from "~/root";
import { PermissionName } from "@prisma/client";
import Icon from "./Icon";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import clsx from "clsx";


type Props = {
  name: string;
  image: string;
  id: string;
  icon: IconType | null;
  variant: "subDir" | "item";
  isAdmin?: boolean;
  adminLink?: string;
}

export default function WorkshopLink({ name, image, variant, id, icon, isAdmin, adminLink = "admin/workshops" }: Props) {
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

  const getLink = () => {
    if (isAdmin) {
      if (variant === "subDir")
        return `/dashboard/${adminLink}/${id}`;
      else
        return null;
    }
    else {
      if (variant === "subDir")
        return `/dashboard/workshops/${id}`;
      else
        return `/dashboard/workshops/item/${id}`;
    }

  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "text-primary-lighter",
        "text-sm font-semibold bg-white dark:bg-dark border-current rounded px-3 my-3 py-2 mx-auto max-w-sm list-none",
        isAdmin && variant === "subDir" ? "border-gold border-2" : "border"
      )}
    >
      { !isAdmin && image && (
        getLink() ? (
          <Link to={getLink() as string}>
            <img
              src={"/uploads/" + image}
              alt={name}
              className="w-full h-40 object-cover rounded-lg mt-2"
            />
          </Link>
        ) : (
          <img
            src={"/uploads/" + image}
            alt={name}
            className="w-full h-40 object-cover rounded-lg mt-2"
          />
        )
      )}
      <div
        className={clsx(
          "flex gap-2 items-center",
          image && !isAdmin && "mt-2"
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
        { variant === "item" && !isAdmin && (
          <Link to={`/dashboard/workshops/item/${id}`} className="flex-1">
            <div className="font-semibold ">{name}</div>
          </Link>
        )}
        { isAdmin && (
          <div className="flex items-center gap-1 ml-auto">
            { user?.permissions[PermissionName.adminPagesEdit] && (
              <Button
                className="my-0"
                size="xs"
                to={`/dashboard/${adminLink}/edit/${variant}/${id}`}
                icon={AiOutlineEdit}
              />
            )}
            { user?.permissions[PermissionName.adminPagesRemove] && (
              <Button
                className="my-0"
                size="xs"
                to={`/dashboard/${adminLink}/remove/${variant}/${id}`}
                icon={FaTimes}
                variant="danger"
              />
            )}
          </div>
        )}
      </div>
    </li>
  )
}