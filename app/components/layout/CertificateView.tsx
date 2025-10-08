import { AiOutlineEdit } from "react-icons/ai";
import Button from "../ui/Button";
import { FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { PermissionName } from "@prisma/client";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

type Props = {
  id: string;
  title: string;
}

export default function CertificateView({ id, title }: Props) {
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
      className="py-2 flex gap-2 items-center bg-white dark:bg-dark border-2 border-light-border dark:border-medium-darker dark:border-medium-darker px-2 my-2 rounded-lg max-w-sm mx-auto"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <h2 className="font-semibold text-sm ml-2">
        {title}
      </h2>
      <div className="flex items-center gap-1 ml-auto">
        { user?.permissions[PermissionName.adminCertificatesEdit] && (
          <Button
            size="xs"
            to={`/dashboard/admin/certificates/edit/${id}`}
            icon={AiOutlineEdit}
            className="my-0"
          />
        )}
        { user?.permissions[PermissionName.adminCertificatesRemove] && (
          <Button
            size="xs"
            to={`/dashboard/admin/certificates/remove/${id}`}
            icon={FaTimes}
            variant="danger"
            className="my-0"
          />
        )}
      </div>
    </div>
  )
}