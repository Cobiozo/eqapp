import type { Page} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { BsPlusLg } from "react-icons/bs";
import PaginatedData from "~/components/features/PaginatedData";
import PageTemplate from "~/components/layout/PageTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import Notification from "~/components/ui/Notification";
import SectionTitle from "~/components/ui/SectionTitle";
import { pageModel } from "~/models/page.server";
import { GlobalContext } from "~/root";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import paginatedDataLoader from "~/utils/paginatedDataLoader.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = PaginatedLoader<Page>

export const loader: LoaderFunction = async ({ request }) => {

  // require permission to this specific zone
  await sessionService.requirePermission(request, PermissionName.adminPagesRead, "/no-permission");

  return await paginatedDataLoader(
    request,
    "pages",
    pageModel,
    undefined,
    undefined,
    { createdAt: "asc" }
  );
}

export default function PagesIndex() {
  const { t, user: loggedUser } = useContext(GlobalContext);
  const { items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const pageCreated = searchParams.get("pageCreated");
  const pageUpdated = searchParams.get("pageUpdated");
  const pageRemoved = searchParams.get("pageRemoved");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {t(`pages.title`)}
      </AdminPageHeader>
      { pageCreated && (
        <Notification variant="success" autoClose={true}>
          {t("pages.pageCreated")}
        </Notification>
      )}
      { pageUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("pages.pageUpdated")}
        </Notification>
      )}
      { pageRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("pages.pageRemoved")}
        </Notification>
      )}
      <section>
        <div className="flex justify-center">
          { false && (
            <Button
              to={`/dashboard/admin/pages/create`}
              icon={BsPlusLg}
              className="mx-1"
              size="sm"
            >
            {t('common.create')}
          </Button>
          )}
        </div>
        <SectionTitle>
          {t("pages.allPages")}
        </SectionTitle>
        <PaginatedData
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          collection={"pages"}
          itemTemplate={(item) => <PageTemplate name={item.name} />}
          itemClassName="rounded-lg border border-light-border dark:border-medium-darker bg-light dark:bg-dark px-2 my-2"
          removeBtn={false}
          editBtn={loggedUser?.permissions.adminPagesEdit}
          searchPanel={false}
        />
      </section>
    </section>
  );
}
