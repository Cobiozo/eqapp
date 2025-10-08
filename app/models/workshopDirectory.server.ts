import type { WorkshopDirectory } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { WorkshopDirectory };

class WorkshopDirectoryModel extends BaseDbModel<WorkshopDirectory>("workshopDirectory") {
  async create(
    data: Omit<WorkshopDirectory, "id" | "createdAt" | "pageId" | "priority">,
    supportedRoles: string[],
    supportedLanguages: string[]
  ) {
    const { parentDirectoryId, userId, ...restData } = data;

    return await db.workshopDirectory.create({
      data: {
        ...restData,
        priority: await this.getCurrentHighestPriority({
          parentDirectoryId: data.parentDirectoryId
        }) + 1,
        supportedRoles: {
          connect: supportedRoles.map((role) => ({ id: role }))
        },
        supportedLanguages: {
          connect: supportedLanguages.map((language) => ({ id: language }))
        },
        parentDirectory:{
          connect: parentDirectoryId 
            ? { id: parentDirectoryId }
            : undefined
        },
        user: {
          connect: userId
            ? { id: userId }
            : undefined
        },
      }
    });
  }

  async update(
    id: WorkshopDirectory["id"],
    data: Partial<Omit<WorkshopDirectory, "id" | "createdAt" | "parentDirectoryId">>,
    supportedRoles: string[],
    supportedLanguages: string[]
  ) {
    return await db.workshopDirectory.update({
      where: { id },
      data: {
        ...data,
        supportedRoles: {
          set: supportedRoles.map((role) => ({ id: role }))
        },
        supportedLanguages: {
          set: supportedLanguages.map((language) => ({ id: language }))
        }
      }
    });
  }

  // get all subcategories ids from given directory, but also get all subcategories from subcategories recursively
  async getAllSubDirectoriesIds(directoryId: WorkshopDirectory["id"]) {
    const directory = await db.workshopDirectory.findUnique({
      where: {
        id: directoryId
      },
      include: {
        subDirectories: true
      }
    });

    const subDirectories = directory?.subDirectories;
    if (!subDirectories) {
      return [];
    }

    const subDirectoriesIds = subDirectories.map((subDirectory) => subDirectory.id);
    const subDirectoriesIdsFromSubDirectories = await Promise.all(
      subDirectories.map((subDirectory) => this.getAllSubDirectoriesIds(subDirectory.id))
    );

    return [...subDirectoriesIds, ...subDirectoriesIdsFromSubDirectories.flat()];
  }

  async move(
    workshopDirectoryId: WorkshopDirectory["id"],
    workshopDirectoryToMoveOverId: WorkshopDirectory["id"]
  ): Promise<void> {

    // get the workshopDirectories
    const workshopDirectoryA = await db.workshopDirectory.findUnique({
      where: { id: workshopDirectoryId }
    });
    const workshopDirectoryB = await db.workshopDirectory.findUnique({
      where: { id: workshopDirectoryToMoveOverId }
    });

    // check if workshopDirectories are okay
    if (!workshopDirectoryA || !workshopDirectoryB)
      throw new Error("Workshop directory not found");

    // if workshopDirectories are okay, we need to update the priorities
    // if workshopDirectoryA priority is higher workshopDirectoryB, we need to:
    // - update workshopDirectoryA priority to workshopDirectoryB priority
    // - update all workshopDirectories between workshopDirectoryB and workshopDirectoryA to +1
    // if workshopDirectoryA priority is lower workshopDirectoryB, we need to:
    // - update workshopDirectoryA priority to workshopDirectoryB priority
    // - update all workshopDirectories between workshopDirectoryA and workshopDirectoryB to -1

    if (workshopDirectoryA.priority > workshopDirectoryB.priority) {
      await db.workshopDirectory.updateMany({
        where: {
          priority: {
            gte: workshopDirectoryB.priority,
            lte: workshopDirectoryA.priority
          },
          parentDirectoryId: workshopDirectoryA.parentDirectoryId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (workshopDirectoryA.priority < workshopDirectoryB.priority) {
      await db.workshopDirectory.updateMany({
        where: {
          priority: {
            gte: workshopDirectoryA.priority,
            lte: workshopDirectoryB.priority
          },
          parentDirectoryId: workshopDirectoryA.parentDirectoryId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.workshopDirectory.update({
      where: { id: workshopDirectoryA.id },
      data: {
        priority: workshopDirectoryB.priority
      }
    });
  }


}

export const workshopDirectoryModel = new WorkshopDirectoryModel();
