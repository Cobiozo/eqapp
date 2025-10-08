import { useContext } from "react"
import PageHeader from "~/components/ui/PageHeader";
import { GlobalContext } from "~/root"
import { UsefulLink, usefulLinkModel } from "~/models/usefulLink.server";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";
import { globalMiddleware } from "~/middlewares/global.server";

type LoaderData = UsefulLink[]

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  return db.usefulLink.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
}

export default function UsefulLinks() {
  const { t, lang } = useContext(GlobalContext);
  const links = useLoaderData<LoaderData>();

  return (
    <section>
      <PageHeader>
        {t("usefulLinks.title")}
      </PageHeader>
      <ul className="text-center">
        {links.map(link => (
          <li key={link.id}>
            <a
              className="link"
              href={link.link}
              target="_blank"
            >
              {link.name[lang]}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}