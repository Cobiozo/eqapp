import type { WorkshopItem} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { workshopItemModel } from "~/models/workshopItem.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

/********* LOADER *********/
type Loader = WorkshopItem;
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWorkshopsEdit, "/no-permission");
  
  // try to find the workshop item
  // if not found, return to 404
  const workshopItem = await workshopItemModel.getById(params.id as string);
  if (!workshopItem)
    return redirect("/404");

  // if found, just return nothing
  return workshopItem;
}

/********* COMPONENT *********/
export default function WorkshopItemEditIndex() {
  const { t } = useContext(GlobalContext);
  const workshopItem = useLoaderData<Loader>();
  const location = useLocation();

  const tabs = [
    { url: "", label: t("workshops.tabs.basicData") },
    { url: "/files", label: t("workshops.tabs.files") },
  ]

  return (  
    <section>
      <AdminPageHeader returnLink={`/dashboard/admin/workshops/${workshopItem.directoryId}`}>
        {t("workshops.edit.title")}
      </AdminPageHeader>
      <ul className="flex justify-center standard-text gap-4 mb-4 text-sm">
        {tabs.map(tab => (
          <li key={tab.url}>
            <Link
              to={`/dashboard/admin/workshops/edit/item/${workshopItem.id}${tab.url}`}
              className={clsx(
                tab.url !== "" && location.pathname.includes(tab.url) ? "font-semibold uppercase" : "",
                tab.url === "" && location.pathname === `/dashboard/admin/workshops/edit/item/${workshopItem.id}` ? "font-bold uppercase" : ""
              )}
            >
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </section>
  );
}
