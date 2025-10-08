import { RoleName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import { FiSend } from "react-icons/fi";
import SearchResults from "~/components/features/SearchResults";
import CandidateTemplate from "~/components/layout/CandidateTemplate";
import Button from "~/components/ui/Button";
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

  return await searchResultsLoader(params, userModel, [
    "firstName",
    "lastName",
    "email",
    "eqId",
  ], ['role'], {
    verified: false,
    role: {
      name: RoleName.CANDIDATE_PARTNER
    }
  });
}

export default function SearchUsers() {
  const { items } = useLoaderData<LoaderData>();
  const { searchString } = useParams();
  const { user: loggedUser, t } = useContext(GlobalContext);

  return (
    <SearchResults
      defaultValue={searchString}
      collection={"users/candidates"}
      items={items}
      itemTemplate={(item) => <CandidateTemplate user={item} />}
      itemClassName="rounded-lg border border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker my-4 py-2 px-2"
      editBtn={false}
      removeBtn={loggedUser?.permissions.adminUsersRemove}
      additionalActions={item => (
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
  )
}
