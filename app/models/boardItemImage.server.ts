import { type BoardItemImage } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { BoardItemImage };

class BoardItemImageModel extends BaseDbModel<BoardItemImage>("boardItemImage") {
  
  async create(
    data: Omit<BoardItemImage, "id" | "priority" | "createdAt" | "updatedAt">,
  ) {
    await db.boardItemImage.create({
      data: {
        name: data.name,
        boardItemId: data.boardItemId,
        priority: await this.getCurrentHighestPriority({
          boardItemId: data.boardItemId
        }) + 1
      }
    });
  }

  async move(
    boardItemImageId: BoardItemImage["id"],
    boardItemImageToMoveOverId: BoardItemImage["id"]
  ): Promise<void> {

    // get the boardItemImages
    const boardItemImageA = await db.boardItemImage.findUnique({
      where: { id: boardItemImageId }
    });
    const boardItemImageB = await db.boardItemImage.findUnique({
      where: { id: boardItemImageToMoveOverId }
    });

    // check if boardItemImages exist
    if (!boardItemImageA || !boardItemImageB)
      throw new Error("BoardItemImage not found");

    // if boardItemImages are okay, we need to update the priorities
    // if boardItemImageA priority is higher boardItemImageB, we need to:
    // - update boardItemImageA priority to boardItemImageB priority
    // - update all boardItemImages between boardItemImageB and boardItemImageA to +1
    // if boardItemImageA priority is lower boardItemImageB, we need to:
    // - update boardItemImageA priority to boardItemImageB priority
    // - update all boardItemImages between boardItemImageA and boardItemImageB to -1

    if (boardItemImageA.priority > boardItemImageB.priority) {
      await db.boardItemImage.updateMany({
        where: {
          priority: {
            gte: boardItemImageB.priority,
            lte: boardItemImageA.priority
          },
          boardItemId: boardItemImageA.boardItemId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (boardItemImageA.priority < boardItemImageB.priority) {
      await db.boardItemImage.updateMany({
        where: {
          priority: {
            gte: boardItemImageA.priority,
            lte: boardItemImageB.priority
          },
          boardItemId: boardItemImageA.boardItemId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.boardItemImage.update({
      where: { id: boardItemImageA.id },
      data: {
        priority: boardItemImageB.priority
      }
    });
  }

  async getAllByBoardItemId(
    boardItemId: string
  ): Promise<BoardItemImage[]> {
    return await db.boardItemImage.findMany({
      where: {
        boardItemId
      },
      orderBy: {
        priority: 'asc'
      }
    });
  }

}

export const boardItemImageModel = new BoardItemImageModel();
