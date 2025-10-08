import type { Faq, Post, Product, ProductCategory, UserProduct } from "@prisma/client"
import { redirect, type LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData, useSearchParams } from "@remix-run/react"
import clsx from "clsx"
import { useContext, useState } from "react"
import { BsPiggyBank } from "react-icons/bs"
import { FaArrowCircleDown, FaLink, FaRegThumbsUp } from "react-icons/fa"
import { TbFileCertificate, TbTruckDelivery } from "react-icons/tb"
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent"
import AdminPageHeader from "~/components/ui/AdminPageHeader"
import Button from "~/components/ui/Button"
import Notification from "~/components/ui/Notification"
import config from "~/config"
import { globalMiddleware } from "~/middlewares/global.server"
import { certificateModel } from "~/models/certificate.server"
import { productCategoryModel } from "~/models/productCategory.server"
import { shortLinkModel } from "~/models/shortLink.server"
import { userModel } from "~/models/user.server"
import { GlobalContext } from "~/root"
import { sessionService } from "~/utils/services/session.server"
import unloggedUserService from "~/utils/services/unloggedUser.server"

type Loader = {
  inviteLink: string,
  productCategory: ProductCategory & { products: Product[] } & { posts: Post[] } & { faqs: Faq[] },
  userProducts: UserProduct[],
  isLackOfUrls: boolean
  certificates: string[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  
  // try to find the product category with all its products, articles and faqs
  const productCategory = await productCategoryModel.getById(params.id as string, ["products", "posts", "faqs"]) as ProductCategory & { products: Product[] } & { posts: Post[] } & { faqs: Faq[] };
  if (!productCategory)
    return redirect("/dashboard/products");

  // get userId
  // if user is logged, get his userProducts
  // if not try to get clientId mentor userProducts
  // or admin userProducts (if no mentorId)
  const getUserId = async () => {
    if (await sessionService.isLogged(request))
      return await sessionService.getUserId(request);
    return (await unloggedUserService.getUnloggedUserData(request))?.mentorId || config.defaultMentorId;
  }
  const userId = await getUserId();
  
  // get user products and admin products
  const userProducts = await userModel.getUserProductsForCategory(userId, productCategory.id);
  const adminProducts = await  userModel.getUserProductsForCategory(config.defaultMentorId, productCategory.id);

  // create new combined array
  // get userProducts, but if there is lack of product, use admin product
  const preparedUserProducts = productCategory.products.map(product => {
    const userProduct = userProducts.find(userProduct => userProduct.productId === product.id);
    if (userProduct)
      return userProduct;
    const adminProduct = adminProducts.find(adminProduct => adminProduct.productId === product.id);
    return adminProduct || product;
  });

  // sort faqs and products by priority
  productCategory.faqs.sort((a, b) => a.priority - b.priority);
  productCategory.products.sort((a, b) => a.priority - b.priority);

  return {
    inviteLink: await shortLinkModel.generate(request, `/dashboard/products/${productCategory.id}?ref=${userId}`),
    productCategory,
    userProducts: preparedUserProducts,
    isLackOfUrls: userProducts.length !== productCategory.products.length,
    certificates: await certificateModel.getAll()
  }
}

export default function ProductsCategory() {
  const { t, isLogged, user, lang: currentLang } = useContext(GlobalContext);
  const { inviteLink, productCategory, userProducts, isLackOfUrls, certificates } = useLoaderData<Loader>();
  const [searchParams] = useSearchParams();
  const productUpdated = searchParams.get("productUpdated");
  const [uncollapsedProductId, setUncollapsedProductId] = useState<string | null>(null);
  const [uncollapsedFaqId, setUncollapsedFaqId] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
  }

  const benefits: {
    title: string;
    description: string;
    icon?: JSX.Element;
  }[] = [
    { 
      title: t("productCategory.benefits.one.title"),
      description: t("productCategory.benefits.one.description"),
      icon: <TbTruckDelivery />
    },
    { 
      title: t("productCategory.benefits.two.title"),
      description: t("productCategory.benefits.two.description"),
      icon: <BsPiggyBank />
    },
    { 
      title: t("productCategory.benefits.three.title"),
      description: t("productCategory.benefits.three.description"),
      icon: <FaRegThumbsUp />
    },
    { 
      title: t("productCategory.benefits.four.title"),
      description: t("productCategory.benefits.four.description"),
      icon: <TbFileCertificate />
    },
  ];

  const getProductUrl = (productId: string) => {
    const userProduct = userProducts.find(userProduct => userProduct.productId === productId);
    if (userProduct)
      return userProduct.url;
    return "";
  }

  return (
    <section>
      <AdminPageHeader returnLink={"/dashboard/products"}>
        {productCategory.name[currentLang] || ""}
      </AdminPageHeader>
      { productUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("products.productUpdated")}
        </Notification>
      )}
      {
        linkCopied && (
          <Notification variant="success" autoClose={true} onClose={() => setLinkCopied(false)}>
            {t("productCategory.refLinkCopied")}
          </Notification>
        )
      }
      { user && isLogged && (
        <Button
          variant="gold"
          icon={FaLink}
          className="mx-auto mb-10"
          onClick={handleLinkCopy}
        >
          {t("productCategory.copyRefLink")}
        </Button>
      )}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <img
            src={"/uploads/"+productCategory.image}
            alt={productCategory.name[currentLang]}
            className="w-full aspect-square object-cover rounded-lg max-h-[20rem] block sm:hidden mx-auto"
          />
           <img
            src={"/uploads/"+productCategory.imageBig}
            alt={productCategory.name[currentLang]}
            className="w-full aspect-square object-cover rounded-lg max-h-[20rem] mx-auto hidden sm:block"
          />
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-4 mt-6 border border-light-border dark:border-medium-darker sm:border-none">
          {benefits.map((benefit, index) => (
            <div key={index} className="sm:rounded-lg justify-start flex flex-col items-center p-2 gap-2 bg-light dark:bg-dark sm:border-2 border-gold">
              <div className="mx-auto text-2xl text-gold ">
                {benefit.icon}
              </div>
              <h2 className="text-center text-[0.65rem] sm:text-sm font-semibold">{benefit.title}</h2>
              <p className="hidden sm:block sm:text-xs text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
        <div>
          <WysiwygGeneratedContent content={productCategory.descriptionBefore[currentLang] || ""} />
        </div>
        { productCategory.products.length > 0 && (
          <section>
            <h2 className="font-semibold text-lg mb-6 text-center">
              {t("productCategory.buyingChoices")}
            </h2>
            { isLogged && isLackOfUrls && (
              <p className="text-red-500 font-semibold -mt-4 mb-4 text-center">
                {t("productCategory.lackOfRefUrls")}
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
              {productCategory.products.map(product => (
                <div className="relative h-fit sm:rounded-lg bg-light dark:bg-dark border border-light-border  dark:border-medium-darker" key={product.id}>
                  <img src={"/uploads/"+product.image} alt={product.name[currentLang]} className="mx-auto block mb-3 w-full h-48 object-cover rounded-t-lg" />
                  <p className="px-3 font-semibold text-sm">{product.price[currentLang] || ""}</p>
                  {product.priceOld[currentLang] && (
                    <p className="pb-1 px-3 font-semibold text-xs opacity-60">{product.priceOld[currentLang] || ""}</p>
                  )}
                  <div className={clsx("py-2 px-3", uncollapsedProductId !== product.id && "hidden")}>
                    <WysiwygGeneratedContent content={product.description[currentLang]} className="text-xs [&>p]:mb-1 [&>h3]:mb-1" />
                    <a
                      href={getProductUrl(product.id) || "#"}
                      className="mt-2"
                    >
                      <Button
                        type="button"
                        size="sm"
                        className="mx-auto"
                      >
                        {t("productCategory.goToShop")}
                      </Button>
                    </a>
                    { isLogged && (
                      <Button
                        size="xs"
                        variant={"secondary"}
                        icon={FaLink}
                        className="mx-auto"
                        to={`/dashboard/products/edit/${product.id}`}
                      >
                        {t("productCategory.editProductRefLink")}
                      </Button>
                    )}
                  </div>
                  <a
                    className={clsx("cursor-pointer mx-auto block w-fit text-primary-lighter mb-2 mt-2", uncollapsedProductId === product.id && "hidden")}
                    onClick={() => setUncollapsedProductId(uncollapsedProductId === product.id ? null : product.id)}
                  >
                    <FaArrowCircleDown className={clsx("text-lg", uncollapsedProductId === product.id && "rotate-180")} />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
        <div className="my-4 flex gap-2">
          {certificates.map(cert => (
            <div className="shrink" key={cert.id}>
              <img src={"/uploads/"+cert.image} alt={cert.title[currentLang]} className="rounded-lg w-full" key={cert} />
            </div>
          ))}
        </div>
        { productCategory.posts.length > 0 && (
          <section>
            <h2 className="font-semibold text-md mb-6 text-center">
              {t("productCategory.posts")}
            </h2>
            {productCategory.posts.map(post => (
               <Link
                 to={`/dashboard/posts/product/${post.id}`}
                 key={post.id}
                 className="mb-6 p-4 bg-white dark:bg-dark border-light-border border dark:border-medium-darker rounded-lg flex gap-4 md:gap-6 items-center"
                >
                 <div className="shrink-0">
                    <img className="w-26 rounded-xl" src={"/uploads/" + post.image} alt={post.title[currentLang] || ""} />
                 </div>
                 <div>
                    <h2 className="text-sm md:text-base font-semibold">{post.title[currentLang]}</h2>
                 </div>
               </Link>
            ))}
          </section>
        )}
        <WysiwygGeneratedContent content={productCategory.descriptionAfter[currentLang] || ""} />
        { productCategory.faqs.length > 0 && (
          <section>
            <h2 className="font-semibold text-md mb-6 text-center">
              {t("productCategory.faqs")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 select-none">
              {productCategory.faqs.map(faq => (
              <div className="bg-light dark:bg-dark border-light-border dark:border-medium-darker border rounded-lg p-4 h-fit" key={faq.id}>
                <h2
                  className="font-semibold text-sm md:text-md cursor-pointer" onClick={() => setUncollapsedFaqId(uncollapsedFaqId === faq.id ? null : faq.id)}
                >
                  {faq.question[currentLang]}
                </h2>
                <div className={clsx(uncollapsedFaqId !== faq.id && "hidden")}>
                  <WysiwygGeneratedContent content={faq.answer[currentLang]} className="text-xs my-2" />
                </div>
              </div>
            ))}
            </div>
          </section>
        )}
      </div>
    </section>
  )
}