import { AiOutlineEdit } from "react-icons/ai";
import Button from "../ui/Button";
import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { MenuLinkType, PermissionName } from "@prisma/client";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

type Props = {
  name: string;
  id: string;
  url: string | null
  type: MenuLinkType;
  pageId: string | null;
}

export default function MenuLinkView({ name, type, pageId, url, id }: Props) {
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
   
  return (
    <div
      className="flex gap-2 items-center border-b dark:border-b-zinc-600 py-3"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <h2 className="font-bold ml-2">
        {name}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {pageId ? `/page/${pageId}` : url}
        </div>
      </h2>
      { type === MenuLinkType.CUSTOM && (
        <div className="flex items-center gap-1 ml-auto">
          { user?.permissions[PermissionName.adminMenuLinksEdit] && (
            <Button
              size="xs"
              to={`/dashboard/admin/menu-links/edit/${id}`}
              icon={AiOutlineEdit}
            />
          )}
          { user?.permissions[PermissionName.adminMenuLinksRemove] && (
            <Button
              size="xs"
              to={`/dashboard/admin/menu-links/remove/${id}`}
              icon={FaTimes}
              variant="danger"
            />
          )}
        </div>
      )}
    </div>
  )
}