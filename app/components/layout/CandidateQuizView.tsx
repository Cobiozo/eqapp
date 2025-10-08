import { AiOutlineEdit } from "react-icons/ai";
import Button from "../ui/Button";
import { FaListUl, FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { PermissionName } from "@prisma/client";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

type Props = {
  id: string;
  name: string;
}

export default function CandidateQuizView({ id, name }: Props) {
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
      className="px-2 rounded-lg flex gap-2 items-center my-2 bg-white dark:bg-dark border border-light-border dark:border-medium-darker py-3"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <h2 className="font-semibold text-sm">
        {name}
      </h2>
      <div className="flex items-center gap-1 ml-auto">
        { user?.permissions[PermissionName.adminCandidateQuizEdit] && (
          <Button
            size="xs"
            to={`/dashboard/admin/candidate-quizes/questions/${id}`}
            icon={FaListUl}
            className="my-0"
          />
        )}
        { user?.permissions[PermissionName.adminCandidateQuizEdit] && (
          <Button
            size="xs"
            to={`/dashboard/admin/candidate-quizes/edit/${id}`}
            icon={AiOutlineEdit}
            className="my-0"
          />
        )}
        { user?.permissions[PermissionName.adminCandidateQuizRemove] && (
          <Button
            size="xs"
            to={`/dashboard/admin/candidate-quizes/remove/${id}`}
            icon={FaTimes}
            variant="danger"
            className="my-0"
          />
        )}
      </div>
    </div>
  )
}