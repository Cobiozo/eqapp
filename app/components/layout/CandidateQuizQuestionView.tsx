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
  question: string;
  quizId: string;
}

export default function CandidateQuizQuestionView({ id, question, quizId }: Props) {
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
    className="px-4 rounded-lg flex gap-2 items-center my-2 bg-white dark:bg-dark border-2 border-light-border dark:border-medium-darker dark:border-medium-darker py-3"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <h2 className="font-semibold text-sm">
        {question}
      </h2>
      <div className="flex items-center gap-1 ml-auto">
        { user?.permissions[PermissionName.adminCandidateQuizEdit] && (
          <Button
            size="xs"
            to={`/dashboard/admin/candidate-quizes/questions/${quizId}/answers/${id}`}
            icon={FaListUl}
            className="my-0"
          />
        )}
        { user?.permissions[PermissionName.adminCandidateQuizEdit] && (
          <Button
            size="xs"
            to={`/dashboard/admin/candidate-quizes/questions/${quizId}/edit/${id}`}
            icon={AiOutlineEdit}
            className="my-0"
          />
        )}
        { user?.permissions[PermissionName.adminCandidateQuizEdit] && (
          <Button
            size="xs"
            to={`/dashboard/admin/candidate-quizes/questions/${quizId}/remove/${id}`}
            icon={FaTimes}
            variant="danger"
            className="my-0"
          />
        )}
      </div>
    </div>
  )
}