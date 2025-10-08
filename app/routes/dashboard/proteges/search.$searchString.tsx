import type { Role} from "@prisma/client";
import { RoleName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import SearchResults from "~/components/features/SearchResults";
import ProtegeTemplate from "~/components/layout/ProtegeTemplate";
import { globalMiddleware } from "~/middlewares/global.server";
import { roleModel } from "~/models/role.server";
import type { UserWithProteges } from "~/models/user.server";
import type { UserWithRole } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { sessionService } from "~/utils/services/session.server";

interface LoaderData {
  items: UserWithRole[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // require permission
  await sessionService.requirePermission(request, "protegesRead", "/dashboard");

  // get user id from session, it will be used to filter proteges
  const userId = await sessionService.getUserId(request);

  // get user proteges tree and reduces it to only ids
  const protegesTree = await userModel.getProtegesTree(userId as string) as UserWithProteges[];
  const protegesIds = protegesTree.reduce((acc, protege) => {

    const getProteges = (proteges: UserWithProteges[] | undefined) => {
      if (!proteges) return [];
      return proteges.reduce((acc, protege) => {
        acc.push(protege.id);
        acc.push(...getProteges(protege.proteges));
        return acc;
      }, [] as string[]);
    }

    acc.push(protege.id);
    acc.push(...getProteges(protege.proteges));
  
    return acc;
  }, [] as string[]);

  const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;
  const candidatePartnerRole = await roleModel.getByName(RoleName.CANDIDATE_PARTNER) as Role;
  return await userModel.searchProteges(params.searchString as string, 
    {
      AND: [{
        OR: [
          { mentorId: userId, roleId: { notIn: [clientRole.id, candidatePartnerRole.id]} },
          { id: { in: protegesIds } },
        ]
      }],
    },
    {
      role: true
    }
  );

}

export default function SearchUsers() {
  const items = useLoaderData<LoaderData>();
  const { searchString } = useParams();

  return (
    <SearchResults
      admin={false}
      defaultValue={searchString}
      collection="proteges"
      items={items}
      itemTemplate={(item) => <ProtegeTemplate protege={item} />}
      itemsClassName="grid grid-cols-2 md:grid-cols-4 gap-4 my-6"
    />
  )
}
