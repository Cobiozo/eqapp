import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import SectionTitle from "~/components/ui/SectionTitle";
import type { LoaderFunction} from "@remix-run/node";
import type { User} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { Outlet, useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import Button from "~/components/ui/Button";
import { FaCheck, FaTimes } from "react-icons/fa";
import clsx from "clsx";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import paginatedDataLoader from "~/utils/paginatedDataLoader.server";
import PaginatedData from "~/components/features/PaginatedData";
import UserTemplate from "~/components/layout/UserTemplate";
import { sessionService } from "~/utils/services/session.server";
import Notification from "~/components/ui/Notification";
import { PermissionName } from "@prisma/client";
import { MdPeopleOutline } from "react-icons/md";

type LoaderData = {
  inactiveUsers: User[];
} & PaginatedLoader<User>;

export const loader: LoaderFunction = async ({ request }) => {
  await sessionService.requirePermission(request, PermissionName.adminUsersRead, "/dashboard");
  const inactiveUsers = await userModel.getInactiveUsers();

  return {
    inactiveUsers,
    ...await paginatedDataLoader(request, "users", userModel, ["role"], {
      verified: true
    })
  };
}

export default function Users() {
  const { t, user: loggedUser } = useContext(GlobalContext);
  const { inactiveUsers, items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const userUpdated = searchParams.get("userUpdated");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {t("users.title")}
      </AdminPageHeader>
      <div className="flex justify-center items-center gap-2 flex-col sm:flex-row mb-4">
        <Button
          to={`/dashboard/admin/users/candidates`}
          icon={MdPeopleOutline}
          className="my-0"
          size="sm"
        >
          {t('users.candidatesTitle')}
        </Button>
      </div>
      { userUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("users.userUpdated")}
        </Notification>
      )}
      <Outlet />
      { loggedUser?.permissions.adminUsersActivate && inactiveUsers.length > 0 && (
        <section>
          <SectionTitle>
            {t("users.waitingForActivation")}
          </SectionTitle>
          <SuspenseBlock status={fetcher.state}>
            <ul>
              {inactiveUsers.map(user => (
                <li key={user.id}>
                  <div
                    className={clsx(
                      "flex flex-col items-center md:flex-row rounded-lg border border-primary bg-light dark:bg-dark dark:border-medium-darker my-4 py-2 px-2"
                    )}
                  >
                    {<UserTemplate user={user}/>}
                    <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-auto">
                      { loggedUser?.permissions.adminUsersRemove && (
                        <Button
                          to={"/dashboard/admin/users/remove/" + user.id}
                          variant="danger"
                          icon={FaTimes}
                        >
                          {t("users.deleteUser")}
                        </Button>
                      )}
                      <fetcher.Form
                        method="post"
                        action={"/dashboard/admin/action/users/activate/" + user.id}
                      >
                        <Button
                          variant="success"
                          icon={FaCheck}
                        >
                          {t("users.activateUser")}
                        </Button>
                      </fetcher.Form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </SuspenseBlock>
        </section>
      )}
      <section>
        <SectionTitle>
          {t("users.allUsers")}
        </SectionTitle>
        <PaginatedData
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          collection={"users"}
          editBtn={loggedUser?.permissions.adminUsersEdit}
          removeBtn={loggedUser?.permissions.adminUsersRemove}
          itemTemplate={(item) => <UserTemplate user={item} />}
          itemClassName="rounded-lg border border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker my-4 py-2 px-2"
        />
      </section>
    </section>
  );
}
