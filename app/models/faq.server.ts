import type { Faq } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { Faq };

class FaqModel extends BaseDbModel<Faq>("faq") {
  async create(
    data: Omit<Faq, "id" | "priority">,
  ) {
    return await db.faq.create({
      data: {
        ...data,
        priority: await this.getCurrentHighestPriority({
          productCategoryId: data.productCategoryId
        }) + 1,
      }
    });
  }

  async update(
    id: Faq["id"],
    data: Partial<Omit<Faq, "id" | "priority">>,
  ) {
    return await db.faq.update({
      where: { id },
      data
    });
  }

  async move(
    faqId: Faq["id"],
    faqToMoveOverId: Faq["id"]
  ): Promise<void> {

    // get the faqs
    const faqA = await db.faq.findUnique({
      where: { id: faqId }
    });
    const faqB = await db.faq.findUnique({
      where: { id: faqToMoveOverId }
    });

    // check if faqs exist
    if (!faqA || !faqB)
      throw new Error("Faq not found");

    // if faqs are okay, we need to update the priorities
    // if faqA priority is higher faqB, we need to:
    // - update faqA priority to faqB priority
    // - update all faqs between faqB and faqA to +1
    // if faqA priority is lower faqB, we need to:
    // - update faqA priority to faqB priority
    // - update all faqs between faqA and faqB to -1

    if (faqA.priority > faqB.priority) {
      await db.faq.updateMany({
        where: {
          priority: {
            gte: faqB.priority,
            lte: faqA.priority
          },
          productCategoryId: faqA.productCategoryId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (faqA.priority < faqB.priority) {
      await db.faq.updateMany({
        where: {
          priority: {
            gte: faqA.priority,
            lte: faqB.priority
          },
          productCategoryId: faqA.productCategoryId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.faq.update({
      where: { id: faqA.id },
      data: {
        priority: faqB.priority
      }
    });
  }

  async getAll(): Promise<Faq[]> {
    return await db.faq.findMany({
      orderBy: {
        priority: 'asc'
      }
    });
  }

}

export const faqModel = new FaqModel();
