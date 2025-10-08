import { PermissionName, RoleName } from "@prisma/client";
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
import isInProtegeTree from "~/utils/isInProtegeTree.server";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = UserWithRole[];

export const loader: LoaderFunction = async function({ request, params }) {
  // require permission
  await sessionService.requirePermission(request, PermissionName.protegesInvite, "/no-permission");

  if (params.searchString === "--none--") {
    // get logged user and proteges tree
    const userId = await sessionService.getUserId(request) as string;
    const tree = await userModel.generateProtegesTree(userId);

    // cache proteges tree as db record
    await userModel.cacheProtegesTree(userId, tree);
  }

  // try to find protege and mentor
  // check if protege exists and is under mentor's tree
  const mentorId = await sessionService.getUserId(request) as string;
  const protegeId = params.userId as string;
  const protege = await userModel.getByIdWithRole(protegeId);
  if (!protege || (protege.mentorId !== mentorId && !(await isInProtegeTree(mentorId, protege.id))))
    return redirect("/dashboard/proteges");

  // check which roles can invite proteges
  const supportedRoles = await roleModel.getMany({
    permissions: {
      some: {
        name: PermissionName.protegesInvite
      }
    }
  })

  // get only users that can invite business partners
  const mentors = await userModel.searchByFullName(
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

  const userId = await sessionService.getUserId(request) as string;
  return await mentors.reduce(async (acc, mentor) => {
 
    // If our async method didn't return true, return the current list
    // *without* this new entry
    if (!await isInProtegeTree(userId, mentor.id))
      return acc;

    // Otherwise add this value to the list
    return (await acc).concat(mentor);
  }, []);
}

/********* COMPONENT *********/
export default function ChangeMentor() {
  const { t } = useContext(GlobalContext);
  const mentors = useLoaderData<LoaderData>();
  const { searchString, userId } = useParams();

  return (
    <section className="w-fit mx-auto">
      <AdminPageHeader
        returnLink={`/dashboard/proteges/${userId}`}
      >
        {t("register.chooseMentor")}
      </AdminPageHeader>
      <SearchResults
        itemsClassName="flex flex-wrap justify-center gap-6 my-6"
        defaultValue={searchString}
        collection={"users"}
        items={mentors}
        itemTemplate={(item) => <MentorTemplate mentor={item} url={`/dashboard/proteges/${userId}/change-mentor/${item.id}`} />}
        itemClassName="w-full max-w-sm"
        hideHeader={true}
        searchUrl={`/dashboard/proteges/${userId}/change-mentor/list/$searchString`}
      />
    </section>
  );
}
