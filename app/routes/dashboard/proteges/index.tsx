import type { Role, SupportedLanguage} from "@prisma/client";
import { PermissionName, RoleName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { GiFamilyTree } from "react-icons/gi";
import { MdOutlineSchool } from "react-icons/md";
import PaginatedData from "~/components/features/PaginatedData";
import ProtegeTemplate from "~/components/layout/ProtegeTemplate";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import Notification from "~/components/ui/Notification";
import { globalMiddleware } from "~/middlewares/global.server";
import { boardItemModel } from "~/models/boardItem.server";
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
  description: Record<SupportedLanguage, string> | null,
}
& PaginatedLoader<UserWithRole>;

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  
  // require permission
  await sessionService.requirePermission(request, PermissionName.protegesRead, "/dashboard");

  // get user id from session, it will be used to filter proteges
  const userId = await sessionService.getUserId(request);
  const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;
  const candidatePartnerRole = await roleModel.getByName(RoleName.CANDIDATE_PARTNER) as Role;

  // generate short invite link
  const inviteUrl = await shortLinkModel.generate(request, `/dashboard/auth/before-join/${userId}?ref=${userId}`);

  // get board content for this page
  const pageId = "aa60af0c-1794-4597-b1a7-f7325d57b60a";
  const description = (await boardItemModel.getById(pageId))?.text || {};

  return {
    inviteUrl,
    description,
    ...await paginatedDataLoader(request, "proteges", userModel, ["role"], {
      mentorId: userId,
      roleId: {
        notIn: [clientRole.id, candidatePartnerRole.id]
      },
    })
  }
}

export default function Proteges() {
  const { inviteUrl, description, items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const { t, user: loggedUser, lang: currentLang } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const userRemoved = searchParams.get("userRemoved");
  const inviteLinkCopied = searchParams.get("inviteLinkCopied");
  const navigate = useNavigate();

  const handleInviteLinkClick = () => {
    navigator.clipboard.writeText(inviteUrl);
    navigate("/dashboard/proteges?inviteLinkCopied=true");
  }

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard">
        {t("proteges.title")}
      </AdminPageHeader>
      { description && description[currentLang] && (
        <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
          <WysiwygGeneratedContent content={description?.[currentLang] || ""} />
        </div>
      )}
      <div className="flex justify-center items-center gap-2 flex-col sm:flex-row mb-4">
        <Button
          to={`/dashboard/proteges/tree`}
          icon={GiFamilyTree}
          className="my-0"
          size="sm"
        >
          {t('proteges.tree')}
        </Button>
        { loggedUser?.permissions.workshopsCreate && (
          <Button
            to={`/dashboard/my-workshops`}
            icon={MdOutlineSchool}
            className="my-0"
            size="sm"
          >
            {t('proteges.myWorkshops')}
          </Button>
        )}
      </div>
      <div className="standard-content mb-4 max-w-3xl text-center flex flex-col">
        { loggedUser?.permissions[PermissionName.protegesInvite] && (
          <a className="link" onClick={handleInviteLinkClick}>
            {t("proteges.copyInviteLink")}
          </a>
        )}
      </div>
      { inviteLinkCopied && (
        <Notification variant="success" autoClose={true}>
          {t("proteges.inviteLinkCopied")}
        </Notification>
      )}
      { userRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("proteges.userRemoved")}
        </Notification>
      )}
      <PaginatedData
        admin={false}
        items={items}
        currentPage={currentPage}
        totalPages={totalPages}
        collection={"proteges"}
        itemsClassName="grid grid-cols-2 md:grid-cols-4 gap-4 my-6"
        itemTemplate={(item) => <ProtegeTemplate protege={item} />}
      />
    </section>
  );
}
