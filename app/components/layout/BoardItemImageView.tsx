import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { PermissionName } from "@prisma/client";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import Button from "../ui/Button";

type Props = {
  name: string;
  id: string;
  boardItemId: string;
}

export default function BoardItemImageView({ name, id, boardItemId }: Props) {
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
    <li
      className="relative"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <img
        src={"/uploads/" + name}
        alt={name}
        className="h-30 border rounded-lg"
      />
      { user?.permissions[PermissionName.adminPagesEdit] && (
        <div className="absolute -top-6 -right-2 max-w-full">
          <Button
            className="bg-white"
            size="xs"
            variant="danger"
            to={`/dashboard/admin/boards/edit/item/${boardItemId}/images/remove/${id}`}
            icon={FaTimes}
          />
        </div>
      )}
    </li>
  )
}