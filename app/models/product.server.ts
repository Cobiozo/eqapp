import type { Product } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { Product };

class ProductModel extends BaseDbModel<Product>("product") {
  async create(
    data: Omit<Product, "id" | "priority">,
  ) {
    return await db.product.create({
      data: {
        ...data,
        priority: await this.getCurrentHighestPriority({
          categoryId: data.categoryId
        }) + 1,
      }
    });
  }

  async update(
    id: Product["id"],
    data: Partial<Omit<Product, "id" | "priority">>,
  ) {
    return await db.product.update({
      where: { id },
      data
    });
  }

  async move(
    productId: Product["id"],
    productToMoveOverId: Product["id"]
  ): Promise<void> {

    // get the products
    const productA = await db.product.findUnique({
      where: { id: productId }
    });
    const productB = await db.product.findUnique({
      where: { id: productToMoveOverId }
    });

    // check if products exist
    if (!productA || !productB)
      throw new Error("Product not found");

    // if products are okay, we need to update the priorities
    // if productA priority is higher productB, we need to:
    // - update productA priority to productB priority
    // - update all products between productB and productA to +1
    // if productA priority is lower productB, we need to:
    // - update productA priority to productB priority
    // - update all products between productA and productB to -1

    if (productA.priority > productB.priority) {
      await db.product.updateMany({
        where: {
          priority: {
            gte: productB.priority,
            lte: productA.priority
          },
          categoryId: productA.categoryId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (productA.priority < productB.priority) {
      await db.product.updateMany({
        where: {
          priority: {
            gte: productA.priority,
            lte: productB.priority
          },
          categoryId: productA.categoryId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.product.update({
      where: { id: productA.id },
      data: {
        priority: productB.priority
      }
    });
  }

  async getAll(): Promise<Product[]> {
    return await db.product.findMany({
      orderBy: {
        priority: 'asc'
      }
    });
  }

}

export const productModel = new ProductModel();
