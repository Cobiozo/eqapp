import PageHeader from "~/components/ui/PageHeader";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import Button from "~/components/ui/Button";
import type { LoaderFunction} from "@remix-run/node";
import { sessionService } from "~/utils/services/session.server";
import { PageType, PermissionName } from "@prisma/client";
import { HiOutlineExternalLink } from "react-icons/hi";
import { AiOutlineDatabase, AiOutlineFile, AiOutlineHome } from "react-icons/ai";

export const loader: LoaderFunction = async ({ request }) => {
  await sessionService.requirePermission(request, PermissionName.adminPagesCreate, "/no-permission");
  
  return null;
}

export default function PagesCreateIndex() {
  const { t } = useContext(GlobalContext);

  return (
    <section className="w-fit mx-auto">
      <PageHeader>
        {t("pages.create.title")}
      </PageHeader>
      <ul className="flex flex-wrap justify-around">
        <li>
          <Button
            to={`/dashboard/admin/boards/create`}
            icon={AiOutlineDatabase}
            size="lg"
            className="w-52 mx-2 mb-2"
          >
            {t("pages.types.board")}
          </Button>
        </li>
        <li>
          <Button
            to={`/dashboard/admin/boards/page/create-item/ADVANCED`}
            icon={AiOutlineFile}
            size="lg"
            className="w-52 mx-2"
          >
            {t("pages.types.boardItem")}
          </Button>
        </li>
      </ul>
    </section>
  );
}

