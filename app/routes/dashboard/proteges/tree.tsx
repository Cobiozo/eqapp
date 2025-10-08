import { PermissionName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { useContext, useState } from "react";
import TreeProtegeTemplate from "~/components/layout/TreeProtegeTemplate";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import type { UserWithProteges, UserWithRole } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = UserWithProteges & {
  todayProtegesCount: number;
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // require permission
  await sessionService.requirePermission(request, PermissionName.protegesRead, "/no-permission");
  
  // get logged user and proteges tree
  const user = await sessionService.getUser(request) as UserWithRole;
  const tree = await userModel.generateProtegesTree(user.id);

  // cache proteges tree as db record
  await userModel.cacheProtegesTree(user.id, tree);

  // count proteges that are created today
  const todayProtegesCount = await userModel.countProtegesCreatedToday(user.id);

  return {
    ...user,
    proteges: tree,
    todayProtegesCount,
  }
}

function ProtegesBranch({ user, isLink = true } : { user: UserWithProteges, isLink?: boolean }) {
  const [showProteges, setShowProteges] = useState(false);

  return (
    <li className="shrink-0">
      <div className="h-12 w-1 bg-medium-dark mx-auto" />
      <TreeProtegeTemplate
        isLink={isLink}
        protege={user}
      />
      { !showProteges && user.proteges?.length > 0 && (
        <a className="link mx-auto block w-fit" onClick={() => setShowProteges(!showProteges)}>
          ...
        </a>
      )}
      { showProteges && user.proteges?.length > 0 && (  
        <>
          <div className="h-12 w-1 bg-medium-dark mx-auto" />
          <ul
            className={clsx(
              "flex justify-center gap-8",
              user.proteges.length > 1 && "border-t-3 border-medium-dark"
            )}
          >
            {user.proteges.map(protege => (
              <ProtegesBranch
                user={protege}
              />
            ))}
          </ul>
        </>
      )}
    </li>
  )
}

export default function ProtegesTreeIndex() {
  const { t } = useContext(GlobalContext);
  const { todayProtegesCount, ...userWithProteges } = useLoaderData<LoaderData>();

  return (
    <>
      <section className="absolute pb-32 left-0 p-10 3xl:pl-90 min-w-full w-max">
        <AdminPageHeader returnLink="/dashboard/proteges">
          {t("proteges.tree")}
        </AdminPageHeader>
        <p className="text-center mb-10 font-bold">
          {t("proteges.todayProtegesCount", todayProtegesCount)}
        </p>
        <ul className="flex justify-center gap-8">
          <ProtegesBranch
            user={userWithProteges}
            isLink={false}
          />
        </ul>
      </section>
      </>
  );
}
