import type { BoardItem, Page} from "@prisma/client";
import { BoardItemType, PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { boardItemModel } from "~/models/boardItem.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

/********* LOADER *********/
type Loader = BoardItem & { page?: Page }
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");
  
  // try to find the board item
  // if not found, return to boards list
  const boardItem = await boardItemModel.getById(params.id as string, ["page"]) as BoardItem & { page?: Page }
  if (!boardItem)
    return redirect("/404");

  // if found, just return nothing
  return boardItem;
}

/********* COMPONENT *********/
export default function BoardItemEditIndex() {
  const { t } = useContext(GlobalContext);
  const boardItem = useLoaderData<Loader>();
  const isPage = boardItem.pageId !== null;
  const location = useLocation();

  const tabs = [
    { url: "", label: t("boards.items.tabs.basicData") },
    { url: "/images", label: t("boards.items.tabs.images") },
    { url: "/videos", label: t("boards.items.tabs.videos") },
    { url: "/files", label: t("boards.items.tabs.files") },
  ]

  return (  
    <section>
      <AdminPageHeader returnLink={ isPage ? `/dashboard/admin/pages` : `/dashboard/admin/boards/${boardItem.directoryId}`}>
        { isPage ? t("pages.edit.title") : t("boards.items.edit.title")}
      </AdminPageHeader>
      { boardItem.type === BoardItemType.ADVANCED && ( 
        <ul className="flex justify-center standard-text gap-4 mb-4 text-sm">
          {tabs.map(tab => (
            <li key={tab.url}>
              <Link
                to={`/dashboard/admin/boards/edit/item/${boardItem.id}${tab.url}`}
                className={clsx(
                  tab.url !== "" && location.pathname.includes(tab.url) ? "font-bold uppercase" : "",
                  tab.url === "" && location.pathname === `/dashboard/admin/boards/edit/item/${boardItem.id}` ? "font-semibold uppercase" : ""
                )}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </section>
  );
}
