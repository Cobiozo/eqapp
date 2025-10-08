import type { Role} from "@prisma/client";
import { PermissionName, RoleName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import PaginatedData from "~/components/features/PaginatedData";
import ClientTemplate from "~/components/layout/ClientTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Notification from "~/components/ui/Notification";
import { globalMiddleware } from "~/middlewares/global.server";
import { roleModel } from "~/models/role.server";
import { shortLinkModel } from "~/models/shortLink.server";
import type { UserWithRole } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import paginatedDataLoader from "~/utils/paginatedDataLoader.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = {
  inactiveProteges: UserWithRole[];
  inviteUrl: string;
}
& PaginatedLoader<UserWithRole>;

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  // require permission
  await sessionService.requirePermission(request, PermissionName.protegesRead, "/dashboard");

  // get user id from session, it will be used to filter proteges
  const userId = await sessionService.getUserId(request);
  const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;

  // prepare invite link
  const inviteUrl = await shortLinkModel.generate(request, `/dashboard?ref=${userId}`);

  return {
    inviteUrl,
    ...await paginatedDataLoader(request, "clients", userModel, ["role"], {
      mentorId: userId,
      roleId: clientRole.id,
    })
  }
}

export default function Proteges() {
  const { inviteUrl, items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const { t, user: loggedUser } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const inviteLinkCopied = searchParams.get("inviteLinkCopied");
  const navigate = useNavigate();

  const handleInviteLinkClick = () => {
    navigator.clipboard.writeText(inviteUrl);
    navigate("/dashboard/clients?inviteLinkCopied=true");
  }

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard">
        {t("proteges.clients.title")}
      </AdminPageHeader>
      <div className="standard-content mb-4 max-w-3xl text-center flex flex-col">
        { loggedUser?.permissions[PermissionName.protegesInvite] && (
          <a className="link" onClick={handleInviteLinkClick}>
            {t("proteges.copyClientLink")}
          </a>
        )}
      </div>
      { inviteLinkCopied && (
        <Notification variant="success" autoClose={true}>
          {t("proteges.inviteLinkCopied")}
        </Notification>
      )}
      <PaginatedData
        admin={false}
        items={items}
        currentPage={currentPage}
        totalPages={totalPages}
        collection={"clients"}
        itemClassName="rounded-lg border border-primary-lighter text-primary-lighter bg-white dark:bg-dark dark:border-medium-darker py-2 px-4 mb-2 mx-auto max-w-sm"
        itemTemplate={(item) => <ClientTemplate client={item} />}
      />
    </section>
  );
}
