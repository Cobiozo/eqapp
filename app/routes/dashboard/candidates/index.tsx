import type { Role} from "@prisma/client";
import { PermissionName, RoleName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import PaginatedData from "~/components/features/PaginatedData";
import CandidateSimpleTemplate from "~/components/layout/CandidateSimpleTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import { roleModel } from "~/models/role.server";
import type { UserWithRole } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import paginatedDataLoader from "~/utils/paginatedDataLoader.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = {
  inactiveProteges: UserWithRole[];
}
& PaginatedLoader<UserWithRole>;

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  // require permission
  await sessionService.requirePermission(request, PermissionName.protegesRead, "/dashboard");

  // get user id from session, it will be used to filter proteges
  const userId = await sessionService.getUserId(request);
  const partnerCandidateRole = await roleModel.getByName(RoleName.CANDIDATE_PARTNER) as Role;

  return {
    ...await paginatedDataLoader(request, "candidates", userModel, ["role"], {
      mentorId: userId,
      roleId: partnerCandidateRole.id,
    })
  }
}

export default function Candidates() {
  const { items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard">
        {t("proteges.candidates.title")}
      </AdminPageHeader>
      <PaginatedData
        admin={false}
        items={items}
        currentPage={currentPage}
        totalPages={totalPages}
        collection={"candidates"}
        itemClassName="rounded-lg border border-primary-lighter text-primary-lighter bg-white dark:bg-dark dark:border-medium-darker py-2 px-4 mb-2 mx-auto max-w-sm"
        itemTemplate={(item) => <CandidateSimpleTemplate candidate={item} />}
      />
    </section>
  );
}
