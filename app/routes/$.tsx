import PageHeader from "~/components/ui/PageHeader";
import PageInfo from "~/components/ui/PageInfo";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import { Link } from "@remix-run/react";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { shortLinkModel } from "~/models/shortLink.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  
  // if url.pathname doesn't include dashboard, check if it's a short link
  // if it is, redirect to the target
  if (!url.pathname.includes("/dashboard")) {
    const shortLink = await shortLinkModel.getByLink(url.pathname.slice(1));

    if (shortLink) {
      return redirect(shortLink.target);
    }
  }

  return null;
};

export default function NotFound() {
  const { t } = useContext(GlobalContext);
  return (
    <section>
        <PageHeader>
          {t("notFound.title")}
        </PageHeader>
        <PageInfo>
          {t("notFound.description")}
        </PageInfo>
        <Link to="/" className="link block mx-auto text-center">
          {t("common.goBackToHome")}
        </Link>
      </section>
  );
}
