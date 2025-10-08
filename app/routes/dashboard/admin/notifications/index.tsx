import { NotificationContent, PermissionName } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import PaginatedData from "~/components/features/PaginatedData";
import NotificationContentTemplate from "~/components/layout/NotificationContentTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Notification from "~/components/ui/Notification";
import SectionTitle from "~/components/ui/SectionTitle";
import { notificationContentModel } from "~/models/notificationContent.server";
import { GlobalContext } from "~/root";
import paginatedDataLoader, { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = PaginatedLoader<NotificationContent>

export const loader: LoaderFunction = async ({ request }) => {

  // require permission to this specific zone
  await sessionService.requirePermission(request, PermissionName.adminNotificationsRead, "/no-permission");

  return await paginatedDataLoader(
    request,
    "notificationContents",
    notificationContentModel,
    undefined,
    undefined,
    { createdAt: "desc" }
  );
}

export default function NotificationContentsIndex() {
  const { t, user: loggedUser } = useContext(GlobalContext);
  const { items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const notificationContentUpdated = searchParams.get("notificationUpdated");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {t("notifications.notificationTemplates")}
      </AdminPageHeader>
      { notificationContentUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("notifications.notificationUpdated")}
        </Notification>
      )}
      <section>
        <PaginatedData
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          collection={"notifications"}
          itemTemplate={(item) => <NotificationContentTemplate id={item.id} name={item.name} description={item.description} title={item.title} />}
          itemClassName="max-w-lg mx-auto bg-white border border-primary-lighter dark:bg-dark dark:border-medium-darker px-2 py-2 mb-2 rounded-lg"
          removeBtn={false}
          editBtn={false}
          searchPanel={false}
        />
      </section>
    </section>
  );
}
