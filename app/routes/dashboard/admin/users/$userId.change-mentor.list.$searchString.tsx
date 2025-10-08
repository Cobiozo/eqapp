import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import SearchResults from "~/components/features/SearchResults";
import MentorTemplate from "~/components/layout/MentorTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { roleModel } from "~/models/role.server";
import type { UserWithRole } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = UserWithRole[];

export const loader: LoaderFunction = async function({ request, params }) {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminProtegesChangeMentor, "/no-permission");

  // try to find protege 
  const protegeId = params.userId as string;
  const protege = await userModel.getByIdWithRole(protegeId);
  if (!protege)
    return redirect("/dashboard/admin/users");

  // check which roles can invite proteges
  const supportedRoles = await roleModel.getMany({
    permissions: {
      some: {
        name: PermissionName.protegesInvite
      }
    }
  })

  // get users that match the search string and have proper roles
  const matchedUsers = await userModel.searchByFullName(
    params.searchString as string,
    ["role"],
    {
      id: {
        notIn: [protegeId, protege.mentorId]
      },
      roleId: {
        in: supportedRoles.map(role => role.id)
      }
    },
    { createdAt: "desc" }
  );

  return matchedUsers;
}

/********* COMPONENT *********/
export default function ChangeMentor() {
  const { t } = useContext(GlobalContext);
  const mentors = useLoaderData<LoaderData>();
  const { searchString, userId } = useParams();

  return (
    <section className="w-fit mx-auto">
      <AdminPageHeader
        returnLink={`/dashboard/admin/users/edit/${userId}`}
      >
        {t("register.chooseMentor")}
      </AdminPageHeader>
      <SearchResults
        itemsClassName="flex flex-wrap justify-center gap-6 my-6"
        defaultValue={searchString}
        collection={"users"}
        items={mentors}
        itemTemplate={(item) => <MentorTemplate mentor={item} url={`/dashboard/admin/users/${userId}/change-mentor/${item.id}`} />}
        itemClassName="w-full max-w-sm"
        hideHeader={true}
        searchUrl={`/dashboard/admin/users/${userId}/change-mentor/list/$searchString`}
      />
    </section>
  );
}
