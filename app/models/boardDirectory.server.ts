import type { BoardDirectory } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { BoardDirectory };

class BoardDirectoryModel extends BaseDbModel<BoardDirectory>("boardDirectory") {
  async create(
    data: Omit<BoardDirectory, "id" | "createdAt" | "pageId" | "priority">,
    supportedLanguages: string[]
  ) {
    return await db.boardDirectory.create({
      data: {
        ...data,
        priority: await this.getCurrentHighestPriority(data.parentDirectoryId) + 1,
        supportedLanguages: {
          connect: supportedLanguages.map((language) => ({ id: language }))
        }
      }
    });
  }

  async update(
    id: BoardDirectory["id"],
    data: Partial<Omit<BoardDirectory, "id" | "createdAt" | "parentDirectoryId">>,
    supportedLanguages: string[]
  ) {
    return await db.boardDirectory.update({
      where: { id },
      data: {
        ...data,
        supportedLanguages: {
          set: supportedLanguages.map((language) => ({ id: language }))
        }
      }
    });
  }

  // get all subcategories ids from given directory, but also get all subcategories from subcategories recursively
  async getAllSubDirectoriesIds(directoryId: BoardDirectory["id"]) {
    const directory = await db.boardDirectory.findUnique({
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
    elemId: string,
    elemToMoveOverId: string,
  ): Promise<void> {

    // get the elem (boardItem or boardDirectory) that we want to move
    const elemA = (await db.boardItem.findUnique({
      where: { id: elemId }
    })) || await db.boardDirectory.findUnique({
      where: { id: elemId }
    });
    const elemB = (await db.boardItem.findUnique({
      where: { id: elemToMoveOverId }
    })) || await db.boardDirectory.findUnique({
      where: { id: elemToMoveOverId }
    });

    // check if those elements exist
    if (!elemA || !elemB)
      throw new Error("Invalid elements");

    // if elements are okay, we need to update the priorities
    // if elemA priority is higher elemB, we need to:
    // - update elemA priority to elemB priority
    // - update all elems between elemB and elemA to +1
    // if elemA priority is lower elemB, we need to:
    // - update elemA priority to elemB priority
    // - update all elements between elemA and elemB to -1

    if (elemA.priority > elemB.priority) {
      await db.boardItem.updateMany({
        where: {
          priority: {
            lt: elemA.priority,
            gte: elemB.priority
          },
          directoryId: elemA.directoryId || elemA.parentDirectoryId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
      await db.boardDirectory.updateMany({
        where: {
          priority: {
            lt: elemA.priority,
            gte: elemB.priority
          },
          parentDirectoryId: elemA.directoryId || elemA.parentDirectoryId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (elemA.priority < elemB.priority) {
      await db.boardItem.updateMany({
        where: {
          priority: {
            gt: elemA.priority,
            lte: elemB.priority
          },
          directoryId: elemA.directoryId || elemA.parentDirectoryId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
      await db.boardDirectory.updateMany({
        where: {
          priority: {
            gt: elemA.priority,
            lte: elemB.priority
          },
          parentDirectoryId: elemA.directoryId || elemA.parentDirectoryId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    if ("directoryId" in elemA)
      await db.boardItem.update({
        where: { id: elemA.id },
        data: {
          priority: elemB.priority
        }
      });
    else
      await db.boardDirectory.update({
        where: { id: elemA.id },
        data: {
          priority: elemB.priority
        }
      });
  }

  async getCurrentHighestPriority(
    parentDirectoryId: BoardDirectory["parentDirectoryId"]
  ): Promise<number> {

    // prepare query
    const query: Record<string, any> = {
      select: {
        id: true,
        priority: true
      },
      orderBy: {
        priority: 'desc'
      }
    }

    const currentHighestItem = (await db.boardItem.findFirst({
       ...query,
       where: {
        directoryId: parentDirectoryId
       }
    }));
    const currentHighestBoard = (await db.boardDirectory.findFirst({
      ...query,
      where: {
        parentDirectoryId: parentDirectoryId
      }
    }));

    return Math.max(currentHighestItem?.priority || 0, currentHighestBoard?.priority || 0);
  }

}

export const boardDirectoryModel = new BoardDirectoryModel();
