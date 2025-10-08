import type { ProductCategory } from "@prisma/client"
import type { LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { useContext } from "react"
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent"
import AdminPageHeader from "~/components/ui/AdminPageHeader"
import { globalMiddleware } from "~/middlewares/global.server"
import { boardItemModel } from "~/models/boardItem.server"
import { productCategoryModel } from "~/models/productCategory.server"
import { GlobalContext } from "~/root"
import { sessionService } from "~/utils/services/session.server"

type Loader = {
  productCategories: ProductCategory[]
  title: string,
  description: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  const isLogged = await sessionService.isLogged(request)
  const clientLinkBoardItemId = "4f1621c0-0e43-4477-a27a-2c3ee0675700";
  const partnerLinkBoardItemId = "5b54953b-b4e5-4b8e-b64b-7f7959a951c1";
  const boardItem = await boardItemModel.getById(!isLogged ? clientLinkBoardItemId : partnerLinkBoardItemId);

  return {
    productCategories: await productCategoryModel.getAll(),
    title: boardItem?.name,
    description: boardItem?.text
  }
}

export default function ProductsCategories() {
  const { lang: currentLang } = useContext(GlobalContext);
  const { title, description, productCategories }  = useLoaderData<Loader>();

  return (
    <section>
      <AdminPageHeader returnLink={"/dashboard"}>
        {title[currentLang] || ""}
      </AdminPageHeader>
      <div className="bg-white dark:bg-dark p-6 rounded-lg border border-light-border dark:border-medium-darker mb-10">
        <WysiwygGeneratedContent content={description[currentLang] || ""} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {productCategories.map(product => (
          <Link to={`/dashboard/products/${product.id}`} key={product.id} className=" bg-light font-bold dark:bg-dark border border-light-border dark:border-medium-darker dark:border-medium-darker rounded-lg flex flex-col gap-4 items-center shadow-lg">
            <img src={"/uploads/"+product.image} alt={product.name[currentLang]} className="w-full aspect-square object-cover rounded-t-lg" />
            <h2 className="text-center text-sm text-semibold px-2 pb-4">{product.name[currentLang] || ""}</h2>
          </Link>
        ))}
      </div>
    </section>
  )
}
        