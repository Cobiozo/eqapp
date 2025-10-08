import type { SupportedLanguage, WorkshopItem } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { WorkshopItem };

class WorkshopItemModel extends BaseDbModel<WorkshopItem>("workshopItem") {
  async create(
    data: Omit<WorkshopItem, "id" | "createdAt">,
    supportedRoles: string[],
    supportedLanguages: string[],
  ) {
    const { directoryId, userId, ...rest } = data;
    const newDir = await db.workshopItem.create({
      data: {
        ...rest,
        directory: {
          connect: {
            id: directoryId as string
          },
        },
        priority: await this.getCurrentHighestPriority({
          directoryId,
        }) + 1,
        supportedRoles: {
          connect: supportedRoles.map(role => ({ id: role }))
        },
        supportedLanguages: {
          connect: supportedLanguages.map(language => ({ id: language }))
        }
      },
    });

    if (userId)
      await db.workshopItem.update({
        where: { id: newDir.id },
        data: {
          user: {
            connect: { id: userId }
          }
        }
      });
  }

  async update(
    id: WorkshopItem["id"],
    data: Partial<WorkshopItem>,
    supportedRoles: string[],
    supportedLanguages: string[],
  ) {
    return await db.workshopItem.update({
      where: { id },
      data: {
        ...data,
        supportedRoles: {
          set: supportedRoles.map(role => ({ id: role }))
        },
        supportedLanguages: {
          set: supportedLanguages.map(language => ({ id: language }))
        }
      },
    });
  }

  async move(
    workshopItemId: WorkshopItem["id"],
    workshopItemToMoveOverId: WorkshopItem["id"]
  ): Promise<void> {

    // get the workshopDirectories
    const workshopItemA = await db.workshopItem.findUnique({
      where: { id: workshopItemId }
    });
    const workshopItemB = await db.workshopItem.findUnique({
      where: { id: workshopItemToMoveOverId }
    });

    // check if workshopDirectories are okay
    if (!workshopItemA || !workshopItemB)
      throw new Error("Workshop directory not found");

    // if workshopDirectories are okay, we need to update the priorities
    // if workshopItemA priority is higher workshopItemB, we need to:
    // - update workshopItemA priority to workshopItemB priority
    // - update all workshopDirectories between workshopItemB and workshopItemA to +1
    // if workshopItemA priority is lower workshopItemB, we need to:
    // - update workshopItemA priority to workshopItemB priority
    // - update all workshopDirectories between workshopItemA and workshopItemB to -1

    if (workshopItemA.priority > workshopItemB.priority) {
      await db.workshopItem.updateMany({
        where: {
          priority: {
            gte: workshopItemB.priority,
            lte: workshopItemA.priority
          },
          directoryId: workshopItemA.directoryId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (workshopItemA.priority < workshopItemB.priority) {
      await db.workshopItem.updateMany({
        where: {
          priority: {
            gte: workshopItemA.priority,
            lte: workshopItemB.priority
          },
          directoryId: workshopItemA.directoryId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.workshopItem.update({
      where: { id: workshopItemA.id },
      data: {
        priority: workshopItemB.priority
      }
    });
  }

  async getFiles(workshopItemId: WorkshopItem["id"]) {
    const files = await db.workshopItemFile.findMany({
      where: {
        workshopItemId
      }
    });

    return files.map(file => (file.name))
  }

  async getClientWorkshops(lang: SupportedLanguage) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return await db.workshopItem.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        },
        directoryId: "f2b44f96-cedb-49f8-bb51-06c74923c751",
        supportedLanguages: {
          some: {
            name: lang
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }

  async getClientWorkshopById(id: WorkshopItem["id"], lang: SupportedLanguage) {
    return await db.workshopItem.findFirst({
      where: {
        id,
        directoryId: "f2b44f96-cedb-49f8-bb51-06c74923c751",
        supportedLanguages: {
          some: {
            name: lang
          }
        }
      }
    });
  }

}

export const workshopItemModel = new WorkshopItemModel();
