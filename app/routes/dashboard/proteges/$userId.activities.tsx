import type { UserActivity} from "@prisma/client";
import type { WorkshopItem } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import PaginatedData from "~/components/features/PaginatedData";
import { Activity } from "~/components/layout/UserActivityBox";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import type { User } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { userActivityModel } from "~/models/userActivity";
import { GlobalContext } from "~/root";
import isInProtegeTree from "~/utils/isInProtegeTree.server";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import paginatedDataLoader from "~/utils/paginatedDataLoader.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = PaginatedLoader<UserActivity & { workshop: WorkshopItem}> & { protege: User };

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // require permission
  await sessionService.requirePermission(request, "protegesRead", "/dashboard");

  // get user id from session, it will verify if protege is a protege of logged user
  const loggedUserId = await sessionService.getUserId(request) as string;

  // try to find protege
  const protegeId = params.userId as string;
  const protege = await userModel.getById(protegeId);

  // if protege is not found or loggedUser is not its mentor and is not higher in the tree
  // -> redirect to proteges list
  if (!protege || (protege.mentorId !== loggedUserId && !(await isInProtegeTree(loggedUserId, protege.id))))
    return redirect("/dashboard/admin/proteges");

  return {
    protege,
    ...await paginatedDataLoader(request, `proteges/${protegeId}/activities`, userActivityModel, ["workshop", "role", "webinar"], {
      userId: protegeId
    },{
      createdAt: "desc"
    })
  }
}

export default function ProtegeActivities() {
  const { userId } = useParams();
  const { t } = useContext(GlobalContext);
  const { items, currentPage, totalPages, protege } = useLoaderData<LoaderData>();
  const protegeFullName = protege.firstName + " " + protege.lastName;

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/proteges/${userId}`}>
        {t("proteges.activity.allActivity")}
      </AdminPageHeader>
      <div className="standard-content mb-4 max-w-3xl text-center">
        <p
          className="mb-10"
          dangerouslySetInnerHTML={{ __html: t("proteges.activity.browsingActivity", protegeFullName) }}
        />
      </div>
      <PaginatedData
        items={items}
        searchPanel={false}
        currentPage={currentPage}
        totalPages={totalPages}
        collection={`proteges/${userId}/activities`}
        itemsClassName="my-6"
        itemClassName="mx-auto max-w-lg"
        itemTemplate={(item) => <Activity {...item} />}
      />
    </section>
  );
}
