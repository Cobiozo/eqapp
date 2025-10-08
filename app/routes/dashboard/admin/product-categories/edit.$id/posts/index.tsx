import type { Post} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import { redirect, type LoaderFunction} from "@remix-run/node";
import { useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { postModel } from "~/models/post.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import PostView from "~/components/layout/PostView";
import Notification from "~/components/ui/Notification";
import paginatedDataLoader, { PaginatedLoader } from "~/utils/paginatedDataLoader.server";
import SectionTitle from "~/components/ui/SectionTitle";
import PaginatedData from "~/components/features/PaginatedData";
import Button from "~/components/ui/Button";
import { AiOutlineFileAdd } from "react-icons/ai";
import { productCategoryModel } from "~/models/productCategory.server";

type LoaderData = PaginatedLoader<Post>;

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminPostsRead, "/dashboard");

  // try to find product category
  const id = params.id as string;
  const productCategory = await productCategoryModel.getById(id);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  return await paginatedDataLoader(request, "posts", postModel, undefined, {
    productCategoryId: id
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
  const { id } = useParams();

  return (
    <section>
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
        <div className="flex flex-col items-center mt-2">
        { loggedUser?.permissions[PermissionName.adminFaqsCreate] && (
          <Button
            size="sm"
            icon={AiOutlineFileAdd}
            to={`/dashboard/admin/product-categories/edit/${id}/posts/create`}
          >
            {t("posts.createAction")}
          </Button>
        )}
        </div>
        <PaginatedData
          items={items}
          currentPage={currentPage}
          totalPages={totalPages}
          collection={"product-categories/edit/" + id + "/posts"}
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
