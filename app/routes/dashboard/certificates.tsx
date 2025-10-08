import { Certificate, SupportedLanguage } from "@prisma/client"
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useContext } from "react"
import { FaLink } from "react-icons/fa"
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent"
import AdminPageHeader from "~/components/ui/AdminPageHeader"
import Button from "~/components/ui/Button"
import { globalMiddleware } from "~/middlewares/global.server"
import { boardItemModel } from "~/models/boardItem.server"
import { certificateModel } from "~/models/certificate.server"
import { GlobalContext } from "~/root"

type Loader = {
  description: Record<SupportedLanguage, string>
  title: Record<SupportedLanguage, string>
  certificates: Certificate[]
}
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  
  const board = (await boardItemModel.getById("5cc4645e-ea1c-41f7-a740-62d597a4bc8a"));
  return {
    title: board?.name || {},
    description: board?.text || {},
    certificates: await certificateModel.getAll()
  }

}

export default function Certificates() {
  const { description, certificates, title } = useLoaderData<Loader>();
  const { t, lang: currentLang } = useContext(GlobalContext);

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard">
        {title[currentLang] || ""}
      </AdminPageHeader>
      <div className="bg-white dark:bg-dark-lighter p-6 rounded-lg border border-light-border dark:border-medium-darker mb-6">
        <WysiwygGeneratedContent content={description[currentLang] || ""} />
      </div>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {certificates.map(certificate => (
          <li key={certificate.id} className="p-4 bg-white dark:bg-dark border-light-border border dark:border-medium-darker rounded-lg flex flex-col gap-2 items-center">
            <img src={"/uploads/" + certificate.image} alt={certificate.title[currentLang] || ""} className="w-full" />
            <h3 className="text-center text-sm font-semibold mt-2">{certificate.title[currentLang] || ""}</h3>
            <a
              href={certificate.url ? certificate.url : "/uploads/" + certificate.image}
              target="_blank"
              rel="noreferrer"
            >
              <Button

                size="xs"
                icon={FaLink}
                className="mb-2 mt-auto"
              >
                {t("certificates.seeMore")}
              </Button>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )

}
