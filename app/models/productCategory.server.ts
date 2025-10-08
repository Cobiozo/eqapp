import type { ProductCategory } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { ProductCategory };

class ProductCategoryModel extends BaseDbModel<ProductCategory>("productCategory") {
  async create(
    data: Omit<ProductCategory, "id" | "priority">,
  ) {
    return await db.productCategory.create({
      data: {
        ...data,
        priority: await this.getCurrentHighestPriority() + 1,
      }
    });
  }

  async update(
    id: ProductCategory["id"],
    data: Partial<Omit<ProductCategory, "id" | "priority">>,
  ) {
    return await db.productCategory.update({
      where: { id },
      data
    });
  }

  async move(
    productCategoryId: ProductCategory["id"],
    productCategoryToMoveOverId: ProductCategory["id"]
  ): Promise<void> {

    // get the productCategorys
    const productCategoryA = await db.productCategory.findUnique({
      where: { id: productCategoryId }
    });
    const productCategoryB = await db.productCategory.findUnique({
      where: { id: productCategoryToMoveOverId }
    });

    // check if productCategorys exist
    if (!productCategoryA || !productCategoryB)
      throw new Error("ProductCategory not found");

    // if productCategorys are okay, we need to update the priorities
    // if productCategoryA priority is higher productCategoryB, we need to:
    // - update productCategoryA priority to productCategoryB priority
    // - update all productCategorys between productCategoryB and productCategoryA to +1
    // if productCategoryA priority is lower productCategoryB, we need to:
    // - update productCategoryA priority to productCategoryB priority
    // - update all productCategorys between productCategoryA and productCategoryB to -1

    if (productCategoryA.priority > productCategoryB.priority) {
      await db.productCategory.updateMany({
        where: {
          priority: {
            gte: productCategoryB.priority,
            lte: productCategoryA.priority
          }
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (productCategoryA.priority < productCategoryB.priority) {
      await db.productCategory.updateMany({
        where: {
          priority: {
            gte: productCategoryA.priority,
            lte: productCategoryB.priority
          },
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.productCategory.update({
      where: { id: productCategoryA.id },
      data: {
        priority: productCategoryB.priority
      }
    });
  }

  async getAll(): Promise<ProductCategory[]> {
    return await db.productCategory.findMany({
      orderBy: {
        priority: 'asc'
      }
    });
  }

}

export const productCategoryModel = new ProductCategoryModel();
