import type { Post} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { postModel } from "~/models/post.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import PostView from "~/components/layout/PostView";
import Notification from "~/components/ui/Notification";
import type { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import paginatedDataLoader from "~/utils/paginatedDataLoader.server";
import SectionTitle from "~/components/ui/SectionTitle";
import PaginatedData from "~/components/features/PaginatedData";
import Button from "~/components/ui/Button";
import { AiOutlineFileAdd } from "react-icons/ai";

type LoaderData = PaginatedLoader<Post>;

export const loader: LoaderFunction = async ({ request }) => {
  await sessionService.requirePermission(request, PermissionName.adminPostsRead, "/dashboard");

  return await paginatedDataLoader(request, "posts", postModel, undefined, {
    productCategoryId: null
  }, {
     createdAt: "desc"
  });
}

export default function Posts() {
  const { t, user: loggedUser, lang: currentLang } = useContext(GlobalContext);
  const { items, currentPage, totalPages } = useLoaderData<LoaderData>();
  const [searchParams] = useSearchParams();
  const postCreated = searchParams.get("postCreated");
  const postUpdated = searchParams.get("postUpdated");
  const postRemoved = searchParams.get("postRemoved");

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {t("posts.title")}
      </AdminPageHeader>
      { postCreated && (
        <Notification variant="success" autoClose={true}>
          {t("posts.postCreated")}
        </Notification>
      )}
      { postUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("posts.postUpdated")}
        </Notification>
      )}
      { postRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("posts.postRemoved")}
        </Notification>
      )}
      <section>
        <SectionTitle>
          {t("posts.allPosts")}
        </SectionTitle>
        <div className="flex flex-col items-center mt-2">
        { loggedUser?.permissions[PermissionName.adminPostsCreate] && (
          <Button
            size="sm"
            icon={AiOutlineFileAdd}
            to={`/dashboard/admin/posts/create`}
          >
            {t("posts.createAction")}
          </Button>
        )}
        </div>
        <PaginatedData
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          collection={"posts"}
          searchPanel={false}
          editBtn={loggedUser?.permissions.adminPostsEdit}
          removeBtn={loggedUser?.permissions.adminPostsRemove}
          itemTemplate={(item) => <PostView title={item.title[currentLang] || "" } createdAt={item.createdAt} />}
          itemClassName="py-2 px-2 rounded-lg flex gap-2 items-center my-2 bg-white dark:bg-dark border border-light-border dark:border-medium-darker dark:border-medium-darker max-w-lg mx-auto"
        />
      </section>
    </section>
  );
}