import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { PermissionName } from "@prisma/client";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import Button from "../ui/Button";
import Video from "../ui/Video";

type Props = {
  url: string;
  id: string;
  boardItemId: string;
}

export default function BoardItemVideoView({ url, id, boardItemId }: Props) {
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
      <Video
        src={url}
        width="300"
        height="200"
        className="pointer-events-none"
      />
      { user?.permissions[PermissionName.adminPagesEdit] && (
        <div className="absolute -top-6 -right-2">
          <Button
            className="bg-white"
            size="xs"
            variant="danger"
            to={`/dashboard/admin/boards/edit/item/${boardItemId}/videos/remove/${id}`}
            icon={FaTimes}
          />
        </div>
      )}
    </li>
  )
}