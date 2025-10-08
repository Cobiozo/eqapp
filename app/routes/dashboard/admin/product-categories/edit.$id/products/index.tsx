import type { Product} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useParams, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import { productModel } from "~/models/product.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import ProductView from "~/components/layout/ProductView";
import Notification from "~/components/ui/Notification";
import { productCategoryModel } from "~/models/productCategory.server";

export const action: ActionFunction = async ({ request }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminProductsEdit, "/no-permission");

  // get data and action from body
  // validate if action is valid
  const data = await request.formData();
  const action = data.get('action') as string
  if (action !== "MOVE")
    return redirect("/dashboard/admin/products-categories");

  // handle action
  // check if itemToMove and itemToMoveOver are valid
  const itemToMove = data.get('itemToMove') as string;
  const itemToMoveOver = data.get('itemToMoveOver') as string;
  if (!itemToMove || !itemToMoveOver)
    return BadRequestError({ message: "Invalid items" });

  // if both are valid, try to move itemToMove over itemToMoveOver
  try {
    await productModel.move(itemToMove, itemToMoveOver);
    return {
      success: true,
    }
  }
  catch (error) {
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = Product[];

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {

  // try to find product category
  const id = params.id as string;
  const productCategory = await productCategoryModel.getById(id);
  if (!productCategory)
    return redirect("/dashboard/admin/product-categories");

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminProductsRead, "/no-permission");

  // if found, just return the data
  return await productModel.getMany({
    categoryId: id
  },
  undefined,
  {
    priority: "asc"
  });
}

/********* COMPONENT *********/
export default function ProductItem() {
  const { t, lang: currentLang, user } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const productCreated = searchParams.get("productCreated");
  const productUpdated = searchParams.get("productUpdated");
  const productRemoved = searchParams.get("productRemoved");
  const { id: productCategoryId } = useParams();

  const products = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    // if active and over are the same, do nothing
    if (active.id === over.id) return;

    fetcher.submit(
      { action: "MOVE", itemToMove: active.id, itemToMoveOver: over.id },
      { method: "patch" }
    );
  }

  return (
    <section>
      { productCreated && (
        <Notification variant="success" autoClose={true}>
          {t("products.productCreated")}
        </Notification>
      )}
      { productUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("products.productUpdated")}
        </Notification>
      )}
      { productRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("products.productRemoved")}
        </Notification>
      )}
       <div className="flex flex-col items-center mt-2">
        { user?.permissions[PermissionName.adminProductsCreate] && (
          <Button
            size="sm"
            icon={AiOutlineFileAdd}
            to={`/dashboard/admin/product-categories/edit/${productCategoryId}/products/create`}
          >
            {t("products.createAction")}
          </Button>
        )}
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SuspenseBlock
          status={fetcher.state}
        >
          <SortableContext
            items={products}
            strategy={verticalListSortingStrategy}
          >
            {products.map(item => (
              <ProductView
                key={item.id}
                id={item.id}
                name={item.name[currentLang]}
                price={item.price[currentLang]}
                productCategoryId={productCategoryId}
              />
            ))}
          </SortableContext>
        </SuspenseBlock>
      </DndContext>
    </section>
  );
}
