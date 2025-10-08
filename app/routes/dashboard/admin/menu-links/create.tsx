import PageHeader from "~/components/ui/PageHeader";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import Button from "~/components/ui/Button";
import type { LoaderFunction} from "@remix-run/node";
import { sessionService } from "~/utils/services/session.server";
import { MenuLinkVariant, PermissionName } from "@prisma/client";
import { HiOutlineExternalLink } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminMenuLinksCreate, "/no-permission");
  
  return null;
}

export default function MenuLinksCreateIndex() {
  const { t } = useContext(GlobalContext);

  return (
    <section className="w-fit mx-auto">
      <PageHeader>
        {t("menuLinks.create.title")}
      </PageHeader>
      <ul className="flex flex-wrap justify-around">
        <li>
          <Button
            to={`/dashboard/admin/menu-links/create/${MenuLinkVariant.INTERNAL}`}
            icon={AiOutlineHome}
            size="lg"
            className="w-52 mx-2 mb-2"
          >
            {t("menuLinks.variants.internal")}
          </Button>
        </li>
        <li>
          <Button
            to={`/dashboard/admin/menu-links/create/${MenuLinkVariant.EXTERNAL}`}
            icon={HiOutlineExternalLink}
            size="lg"
            className="w-52 mx-2"
          >
            {t("menuLinks.variants.external")}
          </Button>
        </li>
      </ul>
    </section>
  );
}

