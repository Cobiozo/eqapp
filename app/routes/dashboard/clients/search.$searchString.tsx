import type { Role} from "@prisma/client";
import { RoleName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import SearchResults from "~/components/features/SearchResults";
import ClientTemplate from "~/components/layout/ClientTemplate";
import { globalMiddleware } from "~/middlewares/global.server";
import { roleModel } from "~/models/role.server";
import type { UserWithRole } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
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

  const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;
  return await userModel.searchProteges(params.searchString as string, 
    {
      mentorId: userId,
      roleId: clientRole.id
    },
    {
      role: true
    }
  );
}

export default function SearchUsers() {
  const items = useLoaderData<LoaderData>();
  const { searchString } = useParams();
  const { t } = useContext(GlobalContext);

  return (
    <SearchResults
      admin={false}
      defaultValue={searchString}
      collection="clients"
      items={items}
      itemClassName="rounded-lg border border-primary-lighter text-primary-lighter bg-white dark:bg-dark dark:border-medium-darker py-2 px-4 mb-2 mx-auto max-w-sm"
      itemTemplate={(item) => <ClientTemplate client={item} />}
    />
  )
}
