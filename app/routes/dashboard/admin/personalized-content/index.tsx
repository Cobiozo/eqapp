import { PermissionName, PersonalizedContent } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import PaginatedData from "~/components/features/PaginatedData";
import PersonalizedContentTemplate from "~/components/layout/PersonalizedContentTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Notification from "~/components/ui/Notification";
import { personalizedContentModel } from "~/models/personalizedContent.server";
import { GlobalContext } from "~/root";
import paginatedDataLoader, { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = PaginatedLoader<PersonalizedContent>

export const loader: LoaderFunction = async ({ request }) => {

  // require permission to this specific zone
  await sessionService.requirePermission(request, PermissionName.adminSystemPersonalizationRead, "/no-permission");

  return await paginatedDataLoader(
    request,
    "personalizedContents",
    personalizedContentModel,
    undefined,
    undefined,
    { createdAt: "desc" }
  );
}

export default function PersonalizedContentsIndex() {
  const { t } = useContext(GlobalContext);
  const { items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const personalizedContentUpdated = searchParams.get("personalizedContentUpdated");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {t("personalizedContent.title")}
      </AdminPageHeader>
      { personalizedContentUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("personalizedContent.contentUpdated")}
        </Notification>
      )}
      <section>
        <PaginatedData
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          collection={"personalizedContents"}
          itemTemplate={(item) => <PersonalizedContentTemplate id={item.id} name={item.name} title={item.title} />}
          itemClassName="max-w-lg mx-auto bg-white border border-primary-lighter dark:bg-dark dark:border-medium-darker px-2 py-2 mb-2 rounded-lg"
          removeBtn={false}
          editBtn={false}
          searchPanel={false}
        />
      </section>
    </section>
  );
}
