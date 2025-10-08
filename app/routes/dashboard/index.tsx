import type { BoardDirectory, BoardItem, Certificate, Faq, ProductCategory} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import Articles from "~/components/client/Articles";
import Certificates from "~/components/client/Certificates";
import Faqs from "~/components/client/Faqs";
import MeetOurProducts from "~/components/client/MeetOurProducts";
import Splash from "~/components/client/Splash";
import WhyEqology from "~/components/client/WhyEqology";
import BoardContentList from "~/components/layout/BoardContentList";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import Button from "~/components/ui/Button";
import DecoratedImageGold from "~/components/ui/DecoratedImageGold";
import PageHeader from "~/components/ui/PageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { certificateModel } from "~/models/certificate.server";
import { faqModel } from "~/models/faq.server";
import { productCategoryModel } from "~/models/productCategory.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";

type LoaderData = {
  board: {
    title: BoardDirectory["name"],
    description: BoardDirectory["description"],
    subDirectories: BoardDirectory[]
    items: BoardItem[]
  }
} | {
  certificates: Certificate[],
  title: BoardDirectory["name"],
  description: BoardDirectory["description"],
  products: ProductCategory[],
  faqs: Faq[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  // refresh pwa if needed
  const userId = await sessionService.getUserId(request) || (await unloggedUserService.getUnloggedUserData(request))?.userId;
  const user = await userModel.getById(userId);
  if (user) {
    const pwaSubLastRefreshedAt = user.pwaSubLastRefreshedAt;
    if (!pwaSubLastRefreshedAt) {
      await userModel.updatePwaLastRefreshedAt(user.id);
      return redirect("/resources/refresh-subscription");
    }
    else if (!("keys" in (user.webPushSubscription as Object))) {
      const now = new Date();
      const diff = now.getTime() - (new Date(pwaSubLastRefreshedAt)).getTime();
      if (diff > 6 * 60 * 60 * 1000) {
        await userModel.updatePwaLastRefreshedAt(user.id);
        return redirect("/resources/refresh-subscription");
      }
    }
  }

  // check if user is logged
  // if not, just load board title and description and of course client certificates
  const isLogged = await sessionService.isLogged(request)
  if (!isLogged) {
    const board = await boardDirectoryModel.getById("4278acc1-7425-4980-9d52-28a1fc2ceaff") as BoardDirectory;
    return {
      certificates: await certificateModel.getAll(),
      products: await productCategoryModel.getAll(),
      title: board.name,
      description: board.description,
      faqs: await faqModel.getAll()
    }
  }

  // otherwise...

  // if user has permission to activate users, check if there are any inactive users
  // if there are redirect to users page
  if(await sessionService.hasPermission(request, PermissionName.adminUsersActivate)) {
    const inactiveUsers = await userModel.getInactiveUsers();
    if (inactiveUsers.length)
      return redirect("/dashboard/admin/users");
  }

  // check if there is any unseen announcement
  const unseenAnnouncement = await userModel.getUnseenAnnouncement(userId);
  if (unseenAnnouncement)
    return redirect("/dashboard/announcements/" + unseenAnnouncement.id);

  // now load partner board, but without items and subdirectories as we won't show them here
  // there will be shown in menu
  const board = await boardDirectoryModel.getById("f3861a8a-dbe5-4df8-8be2-6d858af9c066") as BoardDirectory;

  return {
    board: {
      title: board.name,
      description: board.description,
      subDirectories: [],
      items: []
    }
  }
}

export default function Dashboard() {
  const { t, user, lang: currentLang, isLogged } = useContext(GlobalContext);
  const loaderData = useLoaderData<LoaderData>();

  if (!isLogged && "certificates" in loaderData)
    return (
      <section className="font-bitter text-client-base xl:-mx-36 dark:text-light">
        <Splash
          title={loaderData.title[currentLang] || ""}
          description={loaderData.description[currentLang] || ""}
        />
        <MeetOurProducts products={loaderData.products} />
        <Certificates certificates={loaderData.certificates} />
        <WhyEqology />
        <Articles />
        <Faqs faqs={loaderData.faqs} />
        <a
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-fit mx-auto flex gap-2 items-center my-6 md:my-10 cursor-pointer"
        >
          <FaArrowUp />
          {t("common.goTop")}
        </a>
        <div className="flex flex-col items-center md:flex-row justify-center gap-4">
          <Link to="/dashboard/cookies">
            {t("clients.links.cookies")}
          </Link>
          <Link to="/dashboard/terms">
            {t("termsOfUse.title")}
          </Link>
          <Link to="/dashboard/privacy">
            {t("legal.privacy.title")}
          </Link>
        </div>
      </section>
    )

  if (isLogged && "board" in loaderData) {
    const { title, description, subDirectories, items } = loaderData.board;

    return (
      <section>
        <PageHeader>
          { !isLogged && title[currentLang] || ""}
          { isLogged && (
            <span className="block mb-2">
              {title[currentLang]?.replace("{0}", user?.firstName) || ""}
            </span>
          )}
        </PageHeader>
        <div
          className={clsx(
            "bg-white dark:bg-dark-lighter p-6 rounded-lg border border-light-border dark:border-medium-darker relative",
            isLogged && "mt-10 pt-16 md:pt-24"
          )}
        >
          { isLogged && (
            <div className="absolute -top-14 w-full left-0">
              <DecoratedImageGold
                src={ user.avatar ? "/uploads/" + user.avatar : '/images/no-avatar.webp'}
                className="w-26 md:w-32 mx-auto"
              />
            </div>
          )}
          <WysiwygGeneratedContent className="text-xs md:text-sm" content={description[currentLang] || ""} />
        </div>
        <BoardContentList
          items={items}
          subDirectories={subDirectories}
        />
      </section>
    )
  }

  return null;
}
