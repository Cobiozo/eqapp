import type { ProductCategory} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { productCategoryModel } from "~/models/productCategory.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

/********* LOADER *********/
type Loader = ProductCategory;
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsCategoryEdit, "/no-permission");
  
  // try to find the board item
  // if not found, return to boards list
  const productCategory = await productCategoryModel.getById(params.id as string);
  if (!productCategory)
    return redirect("/404");

  // if found, just return nothing
  return productCategory;
}

/********* COMPONENT *********/
export default function ProductCategoryEditLayout() {
  const { t } = useContext(GlobalContext);
  const productCategory = useLoaderData<Loader>();
  const location = useLocation();

  const tabs = [
    { url: "", label: t("productCategory.tabs.basicData") },
    { url: "/products", label: t("productCategory.tabs.products") },
    { url: "/posts", label: t("productCategory.tabs.articles") },
    { url: "/faqs", label: t("productCategory.tabs.faqs") },
  ]

  return (  
    <section>
      <AdminPageHeader returnLink={`/dashboard/admin/product-categories`}>
        {t("productCategory.edit.title")}
      </AdminPageHeader>
      <ul className="flex justify-center standard-text gap-4 mb-4 text-sm">
        {tabs.map(tab => (
          <li key={tab.url}>
            <Link
              to={`/dashboard/admin/product-categories/edit/${productCategory.id}${tab.url}`}
              className={clsx(
                tab.url !== "" && location.pathname.includes(tab.url) ? "font-semibold uppercase" : "",
                tab.url === "" && location.pathname === `/dashboard/admin/product-categories/edit/${productCategory.id}` ? "font-bold uppercase" : ""
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
