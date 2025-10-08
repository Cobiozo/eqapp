import { type WorkshopItemFile } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { WorkshopItemFile };

class WorkshopItemFileModel extends BaseDbModel<WorkshopItemFile>("workshopItemFile") {
  
  async create(
    data: Omit<WorkshopItemFile, "id" | "priority" | "createdAt" | "updatedAt">,
  ) {
    await db.workshopItemFile.create({
      data: {
        name: data.name,
        title: data.title,
        type: data.type,
        language: {
          connect: { id: data.languageId }
        },
        workshopItem: {
          connect: { id: data.workshopItemId }
        },
        priority: await this.getCurrentHighestPriority({
          workshopItemId: data.workshopItemId
        }) + 1
      }
    });
  }

  async move(
    workshopItemFileId: WorkshopItemFile["id"],
    workshopItemFileToMoveOverId: WorkshopItemFile["id"]
  ): Promise<void> {

    // get the workshopItemFiles
    const workshopItemFileA = await db.workshopItemFile.findUnique({
      where: { id: workshopItemFileId }
    });
    const workshopItemFileB = await db.workshopItemFile.findUnique({
      where: { id: workshopItemFileToMoveOverId }
    });

    // check if workshopItemFiles exist
    if (!workshopItemFileA || !workshopItemFileB)
      throw new Error("WorkshopItemFile not found");

    // if workshopItemFiles are okay, we need to update the priorities
    // if workshopItemFileA priority is higher workshopItemFileB, we need to:
    // - update workshopItemFileA priority to workshopItemFileB priority
    // - update all workshopItemFiles between workshopItemFileB and workshopItemFileA to +1
    // if workshopItemFileA priority is lower workshopItemFileB, we need to:
    // - update workshopItemFileA priority to workshopItemFileB priority
    // - update all workshopItemFiles between workshopItemFileA and workshopItemFileB to -1

    if (workshopItemFileA.priority > workshopItemFileB.priority) {
      await db.workshopItemFile.updateMany({
        where: {
          priority: {
            gte: workshopItemFileB.priority,
            lte: workshopItemFileA.priority
          },
          workshopItemId: workshopItemFileA.workshopItemId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (workshopItemFileA.priority < workshopItemFileB.priority) {
      await db.workshopItemFile.updateMany({
        where: {
          priority: {
            gte: workshopItemFileA.priority,
            lte: workshopItemFileB.priority
          },
          workshopItemId: workshopItemFileA.workshopItemId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.workshopItemFile.update({
      where: { id: workshopItemFileA.id },
      data: {
        priority: workshopItemFileB.priority
      }
    });
  }

  async getAllByWorkshopItemId(
    workshopItemId: string
  ): Promise<WorkshopItemFile[]> {
    return await db.workshopItemFile.findMany({
      where: {
        workshopItemId
      },
      include: {
        language: true
      },
      orderBy: {
        priority: 'asc'
      }
    });
  }

}

export const workshopItemFileModel = new WorkshopItemFileModel();
