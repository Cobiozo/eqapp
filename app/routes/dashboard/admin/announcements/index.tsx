import type { Announcement} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { BsPlusLg } from "react-icons/bs";
import PaginatedData from "~/components/features/PaginatedData";
import AnnouncementTemplate from "~/components/layout/AnnouncementTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import Notification from "~/components/ui/Notification";
import SectionTitle from "~/components/ui/SectionTitle";
import { announcementModel } from "~/models/announcement.server";
import { GlobalContext } from "~/root";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import paginatedDataLoader from "~/utils/paginatedDataLoader.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = PaginatedLoader<Announcement>

export const loader: LoaderFunction = async ({ request }) => {

  // require permission to this specific zone
  await sessionService.requirePermission(request, PermissionName.adminAnnouncementsRead, "/no-permission");

  return await paginatedDataLoader(
    request,
    "announcements",
    announcementModel,
    undefined,
    undefined,
    { startAt: "asc" }
  );
}

export default function AnnouncementsIndex() {
  const { t, user: loggedUser } = useContext(GlobalContext);
  const { items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const announcementCreated = searchParams.get("announcementCreated");
  const announcementUpdated = searchParams.get("announcementUpdated");
  const announcementRemoved = searchParams.get("announcementRemoved");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {t(`announcements.title`)}
      </AdminPageHeader>
      { announcementCreated && (
        <Notification variant="success" autoClose={true}>
          {t("announcements.announcementCreated")}
        </Notification>
      )}
      { announcementUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("announcements.announcementUpdated")}
        </Notification>
      )}
      { announcementRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("announcements.announcementRemoved")}
        </Notification>
      )}
      <section>
        <div className="flex justify-center">
          { loggedUser?.permissions.adminAnnouncementsCreate && (
            <Button
              to={`/dashboard/admin/announcements/create`}
              icon={BsPlusLg}
              className="mx-1"
              size="sm"
            >
            {t('common.create')}
          </Button>
          )}
        </div>
        <SectionTitle>
          {t("announcements.allAnnouncements")}
        </SectionTitle>
        <PaginatedData
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          collection={"announcements"}
          itemTemplate={(item) => <AnnouncementTemplate startAt={item.startAt} name={item.title} description={item.description} />}
          itemClassName="bg-white dark:bg-dark border-2 border-primary-lighter dark:border-medium-darker px-4 my-2 rounded-lg"
          removeBtn={loggedUser?.permissions.adminAnnouncementsRemove}
          editBtn={loggedUser?.permissions.adminAnnouncementsEdit}
          searchPanel={false}
        />
      </section>
    </section>
  );
}
