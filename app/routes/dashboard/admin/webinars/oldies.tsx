import type { Webinar} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaInfo } from "react-icons/fa";
import PaginatedData from "~/components/features/PaginatedData";
import WebinarTemplate from "~/components/layout/WebinarTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import paginatedDataLoader from "~/utils/paginatedDataLoader.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = PaginatedLoader<Webinar>

export const loader: LoaderFunction = async ({ request }) => {

  // require permission to this specific zone
  await sessionService.requirePermission(request, PermissionName.adminWebinarsRead, "/no-permission");

  return await paginatedDataLoader(
    request,
    "webinars",
    webinarModel,
    undefined,
    { 
      expired: true
    },
    { startAt: "desc" }
  );
}

export default function WebinarsIndex() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const { items, currentPage, totalPages } = useLoaderData<LoaderData>();

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/webinars">
        {t(`webinars.finishedWebinars`)}
      </AdminPageHeader>
      <section>
        <PaginatedData
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          collection={"webinars"}
          itemTemplate={(item) => <WebinarTemplate title={item.title[currentLang]} presenter={item.presenter} startAt={item.startAt} variant={item.variant} expired={item.expired} />}
          itemClassName="px-4 bg-light rounded-lg border
          dark:bg-dark dark:border-medium-darker my-2"
          removeBtn={false}
          editBtn={false}
          searchPanel={false}
          additionalButtonsBefore={
            (item) => {
              return (
                <>
                  <Button
                    to={`/dashboard/admin/webinars/info/${item.id}`}
                    icon={FaInfo}
                    className="mr-2"
                    size="sm"
                    variant="info"
                  />
                </>
              )
            }
          }
        />
      </section>
    </section>
  );
}
