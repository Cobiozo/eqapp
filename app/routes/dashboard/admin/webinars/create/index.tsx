import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { useContext } from "react";
import { BiMoviePlay } from "react-icons/bi";
import { MdLiveTv } from "react-icons/md";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request }) => {
 // check permissions
 await sessionService.requirePermission(request, PermissionName.adminWebinarsCreate, "/no-permission");
  
  // if found, just return nothing
  return null;
}

/********* COMPONENT *********/
export default function WebinarCreateIndex() {
  const { t } = useContext(GlobalContext);
  
  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/webinars">
        {t("webinars.create.title")}
      </AdminPageHeader>
      <ul className="mt-6">
        <li>
          <Button
            variant="secondary"
            to={`/dashboard/admin/webinars/create/create-new-cm`}
            icon={BiMoviePlay}
            className="w-full mx-auto max-w-sm"
          >
            {t("webinars.platforms.cmNew")}
          </Button>
        </li>
        <li>
          <Button
            variant="secondary"
            to={`/dashboard/admin/webinars/create/create-from-cm`}
            icon={BiMoviePlay}
            className="w-full mx-auto max-w-sm"
          >
            {t("webinars.platforms.cmFrom")}
          </Button>
        </li>
        <li>
          <Button
            variant="secondary"
            to={`/dashboard/admin/webinars/create/create-sm`}
            icon={MdLiveTv}
            className="w-full mx-auto max-w-sm"
          >
            {t("webinars.platforms.sm")}
          </Button>
        </li>
      </ul>
    </section>
  );
}
