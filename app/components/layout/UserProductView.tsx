import { AiOutlineEdit } from "react-icons/ai";
import Button from "../ui/Button";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { PermissionName } from "@prisma/client";

type Props = {
  id: string;
  name: string;
  price: number;
  refLinkAdded: boolean;
}

export default function UserProductView({ id, name, price, refLinkAdded }: Props) {
  const { user } = useContext(GlobalContext);
  const { t } = useContext(GlobalContext);

  return (
    <div className="flex gap-2 items-center border-b dark:border-b-zinc-600 py-3">
      <h2 className="text-lg font-bold ml-2">
        <span className="flex items-center gap-2">
          {name} {refLinkAdded ? (<FaCheck className="text-green-500" />) : (<FaTimes className="text-red-500" />) }
        </span>
        <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
          {price}zł
        </div>
      </h2>
      <div className="flex items-center gap-1 ml-auto">
        { user?.permissions[PermissionName.adminProductsEdit] && (
          <Button
            to={`/dashboard/products/edit/${id}`}
            icon={AiOutlineEdit}
          >
            {t("common.edit")}
          </Button>
        )}
      </div>
    </div>
  )
}