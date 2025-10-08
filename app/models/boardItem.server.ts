import type { BoardDirectory, BoardItem } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { BoardItem };

class BoardItemModel extends BaseDbModel<BoardItem>("boardItem") {
  async create(
    data: Omit<BoardItem, "id" | "createdAt">,
    supportedLanguages: string[],
  ) {
    const { directoryId, ...rest } = data;
    return await db.boardItem.create({
      data: {
        ...rest,
        directory: {
          connect: {
            id: directoryId,
          },
        },
        priority: await this.getCurrentHighestPriority(directoryId) + 1,
        supportedLanguages: {
          connect: supportedLanguages.map(language => ({ id: language }))
        }
      },
    });
  }

  async update(
    id: BoardItem["id"],
    data: Partial<BoardItem>,
    supportedLanguages: string[],
  ) {
    console.log({
      where: { id },
      data: {
        ...data,
        supportedLanguages: {
          set: supportedLanguages.map(language => ({ id: language }))
        }
      },
    });
    return await db.boardItem.update({
      where: { id },
      data: {
        ...data,
        supportedLanguages: {
          set: supportedLanguages.map(language => ({ id: language }))
        }
      },
    });
  }

  async getFiles(boardItemId: BoardItem["id"]) {
    const files = await db.boardItemFile.findMany({
      where: {
        boardItemId
      }
    });
    const images = await db.boardItemImage.findMany({
      where: {
        boardItemId
      }
    });

    return files
      .map(file => (file.name))
      .concat(images.map(image => (image.name)));
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

export const boardItemModel = new BoardItemModel();
