import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import type { LoaderFunction} from "@remix-run/node";
import type { User} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import Button from "~/components/ui/Button";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import paginatedDataLoader from "~/utils/paginatedDataLoader.server";
import PaginatedData from "~/components/features/PaginatedData";
import { sessionService } from "~/utils/services/session.server";
import Notification from "~/components/ui/Notification";
import { PermissionName, RoleName } from "@prisma/client";
import { FiSend } from "react-icons/fi";
import CandidateTemplate from "~/components/layout/CandidateTemplate";

type LoaderData = {
  inactiveUsers: User[];
} & PaginatedLoader<User>;

export const loader: LoaderFunction = async ({ request }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersRead, "/dashboard");

  return await paginatedDataLoader(request, "users", userModel, ["role"], {
    verified: false,
    role: {
      name: RoleName.CANDIDATE_PARTNER
    }
  })
}

export default function Candidates() {
  const { t, user: loggedUser } = useContext(GlobalContext);
  const { items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const invitationSent = searchParams.get("invitationSent");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/users">
        {t("users.candidatesTitle")}
      </AdminPageHeader>
      { invitationSent && (
        <Notification variant="success" autoClose={true}>
          {t("users.invitationSent")}
        </Notification>
      )}
      <PaginatedData
        items={items}
        currentPage={currentPage}
        totalPages={totalPages}
        collection={"users/candidates"}
        removeBtn={loggedUser?.permissions.adminUsersRemove}
        editBtn={false}
        itemTemplate={(item) => <CandidateTemplate user={item} />}
        itemClassName="rounded-lg border border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker my-4 py-2 px-2"
        additionalButtonsBefore={item => (
          <Button
            to={`/dashboard/admin/users/candidates/send-invitation/${item.id}`}
            variant="success"
            icon={FiSend}
            size="sm"
            className="mr-2"
          >
            {t('users.invite')}
          </Button>
        )}
      />
    </section>
  );
}
