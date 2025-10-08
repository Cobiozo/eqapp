import type { Role} from "@prisma/client";
import { RoleName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import SearchResults from "~/components/features/SearchResults";
import UserTemplate from "~/components/layout/UserTemplate";
import { roleModel } from "~/models/role.server";
import type { User} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import searchResultsLoader from "~/utils/searchResultsLoader.server";
import { sessionService } from "~/utils/services/session.server";

interface LoaderData {
  items: User[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const loggedUser = await sessionService.getUser(request);
  if (!loggedUser?.permissions.adminUsersRead)
    return redirect("/dashboard/admin");

  const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;
  return await searchResultsLoader(params, userModel, [
    "firstName",
    "lastName",
    "email",
    "eqId",
  ], ['role'], {
    verified: true,
    roleId: {
      not: clientRole.id
    }
  });
}

export default function SearchUsers() {
  const { items } = useLoaderData<LoaderData>();
  const { searchString } = useParams();
  const { user: loggedUser } = useContext(GlobalContext);

  return (
    <SearchResults
      defaultValue={searchString}
      collection="users"
      items={items}
      itemTemplate={(item) => <UserTemplate user={item} />}
      itemClassName="rounded-lg border border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker my-4 py-2 px-2"
      editBtn={loggedUser?.permissions.adminUsersEdit}
      removeBtn={loggedUser?.permissions.adminUsersRemove}
    />
  )
}
