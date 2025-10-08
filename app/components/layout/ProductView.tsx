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
  name: string;
  price: number;
  productCategoryId: string;
}

export default function ProductView({ id, name, price, productCategoryId }: Props) {
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
      className="px-2 rounded-lg flex gap-2 items-center my-2 bg-white dark:bg-dark border-2 border-light-border dark:border-medium-darker dark:border-medium-darker py-3 max-w-lg mx-auto"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <h2 className="font-semibold text-sm ml-2">
        {name}
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {price}
        </div>
      </h2>
      <div className="flex items-center gap-1 ml-auto">
        { user?.permissions[PermissionName.adminProductsEdit] && (
          <Button
            size="xs"
            to={`/dashboard/admin/product-categories/edit/${productCategoryId}/products/edit/${id}`}
            icon={AiOutlineEdit}
            className="my-0"
          />
        )}
        { user?.permissions[PermissionName.adminProductsRemove] && (
          <Button
            size="xs"
            to={`/dashboard/admin/product-categories/edit/${productCategoryId}/products/remove/${id}`}
            icon={FaTimes}
            variant="danger"
            className="my-0"
          />
        )}
      </div>
    </div>
  )
}