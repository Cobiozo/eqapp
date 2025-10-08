import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineFileText, AiOutlineLink } from "react-icons/ai";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesCreate, "/no-permission");

  // if id param is set to "page", it means that it will a post related directly to page
  // we can also already redirect to advanced item creation
  // as link wouldn't make sense in this context
  if (params.id === "page")
    return redirect("/dashboard/admin/boards/page/create-item/ADVANCED");

  // but if it's different, try to find the boardDir we want to add an item to
  // if not found, return to boardDirs list
  const boardDir = await boardDirectoryModel.exists({ id: params.id as string });
  if (!boardDir)
    return redirect("/dashboard/admin/boards");
  
  // if found, just return nothing
  return null;
}

/********* COMPONENT *********/
export default function BoardItemCreateIndex() {
  const { t } = useContext(GlobalContext);
  const { id } = useParams();
  
  return (
    <section>
      <AdminPageHeader returnLink={ id === "page" ? "/dashboard/admin/pages" : `/dashboard/admin/boards/${id}`}>
        {t("boards.items.chooseType")}
      </AdminPageHeader>
      <ul className="mt-6">
        <li>
          <Button
            variant="secondary"
            to={`/dashboard/admin/boards/${id}/create-item/ADVANCED`}
            icon={AiOutlineFileText}
            className="w-full mx-auto max-w-sm"
          >
            {t("boards.items.contentTypes.text")}
          </Button>
        </li>
        <li>
          <Button
            variant="secondary"
            to={`/dashboard/admin/boards/${id}/create-item/LINK`}
            icon={AiOutlineLink}
            className="w-full mx-auto max-w-sm"
          >
            {t("boards.items.contentTypes.link")}
          </Button>
        </li>
      </ul>
    </section>
  );
}
