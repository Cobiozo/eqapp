import type { Webinar} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaInfo } from "react-icons/fa";
import PaginatedData from "~/components/features/PaginatedData";
import WebinarTemplate from "~/components/layout/WebinarTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import Notification from "~/components/ui/Notification";
import SectionTitle from "~/components/ui/SectionTitle";
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
      expired: {
        not: true
      }
    },
    { startAt: "asc" }
  );
}

export default function WebinarsIndex() {
  const { t, user: loggedUser, lang: currentLang } = useContext(GlobalContext);
  const { items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const webinarCreated = searchParams.get("webinarCreated");
  const webinarUpdated = searchParams.get("webinarUpdated");
  const webinarRemoved = searchParams.get("webinarRemoved");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {t(`webinars.title`)}
      </AdminPageHeader>
      { webinarCreated && (
        <Notification variant="success" autoClose={true}>
          {t("webinars.webinarCreated")}
        </Notification>
      )}
      { webinarUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("webinars.webinarUpdated")}
        </Notification>
      )}
      { webinarRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("webinars.webinarRemoved")}
        </Notification>
      )}
      <section>
        <div className="flex justify-center">
          { loggedUser?.permissions.adminWebinarsCreate && (
            <>
              <Button
                to={`/dashboard/admin/webinars/create`}
                icon={BsPlusLg}
                className="mx-1"
                size="sm"
              >
                {t('common.create')}
              </Button>
            </>
          )}
        </div>
        <SectionTitle>
          {t("webinars.allWebinars")}
        </SectionTitle>
        <PaginatedData
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          collection={"webinars"}
          itemTemplate={(item) => <WebinarTemplate title={item.title[currentLang]} presenter={item.presenter} startAt={item.startAt} variant={item.variant} expired={item.expired} />}
          itemClassName="px-4 bg-light rounded-lg border
          dark:bg-dark dark:border-medium-darker my-2"
          removeBtn={loggedUser?.permissions.adminWebinarsRemove}
          editBtn={loggedUser?.permissions.adminWebinarsEdit}
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
        <div className="standard-content my-6 max-w-3xl text-center flex flex-col">
          <Link className="link" to="/dashboard/admin/webinars/oldies">
            {t("webinars.showFinished")}
          </Link>
        </div>
      </section>
    </section>
  );
}
