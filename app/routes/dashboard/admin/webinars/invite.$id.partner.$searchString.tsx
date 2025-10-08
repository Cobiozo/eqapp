import type { Role, User  } from "@prisma/client";
import { PermissionName, RoleName, WebinarVariant } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams } from "@remix-run/react";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import SearchResults from "~/components/features/SearchResults";
import UserTemplate from "~/components/layout/UserTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import Notification from "~/components/ui/Notification";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import { roleModel } from "~/models/role.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import searchResultsLoader from "~/utils/searchResultsLoader.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = PaginatedLoader<User> & {
  subscribedPartners: User[]
};

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsEdit, "/no-permission");

  // check if webinar exists
  const webinar = await webinarModel.exists({
    id: params.id as string,
    variant: WebinarVariant.INVITED,
    expired: false,
    startAt: {
      gte: new Date()
    }
  })
  if (!webinar)
    return redirect("/admin/dashboard/webinars");

  // get also subscribed users for the webinar
  const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;
  const subscribedUsers = await userModel.getMany({
    subscribedWebinars: {
      some: {
        webinarId: params.id as string
      }
    },
    roleId: {
      not: clientRole.id
    }
  });

  return { 
    ...await searchResultsLoader(params, userModel, [
      "firstName",
      "lastName",
      "email",
      "eqId",
    ], ['role'], {
      verified: true,
      roleId: {
        not: clientRole.id
      }
    }),
    subscribedPartners: subscribedUsers
  };

}

/********* COMPONENT *********/
export default function WebinarInvitePartner() {
  const { t } = useContext(GlobalContext);
  const { searchString, id } = useParams();
  const { items, subscribedPartners } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const [showAddedInfo, setShowAddedInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const isItemSubscribed = (item: User) => {
    return subscribedPartners.some(u => u.id === item.id);
  };

  const invitePartner = (userId: User["id"]) => {
    fetcher.submit(
      null,
      { method: "post", action: "/dashboard/admin/action/invite-partner-to-webinar/" + id + "/" + userId }
    );
  }

  useEffect(() => {
    if (fetcher.data?.success) {
      setShowAddedInfo(true);
    } else if (fetcher.data?.error) {
      setShowError(true);
    }
  }, [fetcher.data]);

  return (
    <section>
      <AdminPageHeader returnLink={"/dashboard/admin/webinars/invitations/" + id}>
        {t("webinars.invited.invitePartner")}
      </AdminPageHeader>
      { showAddedInfo && (
          <Notification variant="success" autoClose={true} onClose={() => setShowAddedInfo(false)}>
            {t("webinars.invited.userInvited")}
          </Notification>
      )}
      { showError && (
          <Notification variant="danger" autoClose={true} onClose={() => setShowError(false)}>
            {t("webinars.invited.error")}
          </Notification>
      )}

      <SuspenseBlock status={fetcher.state}>
        <SearchResults
          hideHeader
          searchUrl={`/dashboard/admin/webinars/invite/${id}/partner/$searchString`}
          defaultValue={searchString}
          collection="users"
          items={items}
          itemTemplate={(item) => (
            <div
              className={clsx(
                "flex flex-col justify-between items-center gap-4 px-4 py-2 md:flex-row",
                isItemSubscribed(item) && "opacity-50 pointer-events-none cursor-not-allowed",
              )}>
                <UserTemplate user={item} />
                <Button
                  className="mx-auto md:mr-0"
                  variant="success"
                  icon={FaPlus}
                  onClick={() => invitePartner(item.id)}
                >
                  {isItemSubscribed(item) ? t("webinars.invited.invited") : t("webinars.invited.invite")}
                </Button>
            </div>
          )}
          itemClassName="border-b dark:border-b-zinc-600 py-4"
          editBtn={false}
          removeBtn={false}
        />
      </SuspenseBlock>
    </section>
  );
}

