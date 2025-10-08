import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import PageHeader from "~/components/ui/PageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import { boardItemModel } from "~/models/boardItem.server";
import { GlobalContext } from "~/root";

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  const pageId = "5e3a5a9c-391f-4d7d-8801-388cdaddf2e6";
  const page = await boardItemModel.getById(pageId);

  return {
    description: page?.text || {},
    title: page?.name || {},
  }
}

export default function TermsPage() {
  const { lang: currentLang } = useContext(GlobalContext);
  const { title, description } = useLoaderData();

  return (
    <section>
      <PageHeader>
        {title[currentLang] || ""}
      </PageHeader>
      <WysiwygGeneratedContent
        content={description[currentLang] || ""}
      />
    </section>
  )
}