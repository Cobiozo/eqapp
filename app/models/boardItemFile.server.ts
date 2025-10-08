import { type BoardItemFile } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { BoardItemFile };

class BoardItemFileModel extends BaseDbModel<BoardItemFile>("boardItemFile") {
  
  async create(
    data: Omit<BoardItemFile, "id" | "priority" | "createdAt" | "updatedAt">,
  ) {
    await db.boardItemFile.create({
      data: {
        name: data.name,
        title: data.title,
        type: data.type,
        language: {
          connect: { id: data.languageId }
        },
        boardItem: {
          connect: { id: data.boardItemId }
        },
        priority: await this.getCurrentHighestPriority({
          boardItemId: data.boardItemId
        }) + 1
      }
    });
  }

  async move(
    boardItemFileId: BoardItemFile["id"],
    boardItemFileToMoveOverId: BoardItemFile["id"]
  ): Promise<void> {

    // get the boardItemFiles
    const boardItemFileA = await db.boardItemFile.findUnique({
      where: { id: boardItemFileId }
    });
    const boardItemFileB = await db.boardItemFile.findUnique({
      where: { id: boardItemFileToMoveOverId }
    });

    // check if boardItemFiles exist
    if (!boardItemFileA || !boardItemFileB)
      throw new Error("BoardItemFile not found");

    // if boardItemFiles are okay, we need to update the priorities
    // if boardItemFileA priority is higher boardItemFileB, we need to:
    // - update boardItemFileA priority to boardItemFileB priority
    // - update all boardItemFiles between boardItemFileB and boardItemFileA to +1
    // if boardItemFileA priority is lower boardItemFileB, we need to:
    // - update boardItemFileA priority to boardItemFileB priority
    // - update all boardItemFiles between boardItemFileA and boardItemFileB to -1

    if (boardItemFileA.priority > boardItemFileB.priority) {
      await db.boardItemFile.updateMany({
        where: {
          priority: {
            gte: boardItemFileB.priority,
            lte: boardItemFileA.priority
          },
          boardItemId: boardItemFileA.boardItemId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (boardItemFileA.priority < boardItemFileB.priority) {
      await db.boardItemFile.updateMany({
        where: {
          priority: {
            gte: boardItemFileA.priority,
            lte: boardItemFileB.priority
          },
          boardItemId: boardItemFileA.boardItemId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.boardItemFile.update({
      where: { id: boardItemFileA.id },
      data: {
        priority: boardItemFileB.priority
      }
    });
  }

  async getAllByBoardItemId(
    boardItemId: string
  ): Promise<BoardItemFile[]> {
    return await db.boardItemFile.findMany({
      where: {
        boardItemId
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

export const boardItemFileModel = new BoardItemFileModel();
