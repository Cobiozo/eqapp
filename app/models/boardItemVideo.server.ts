import { type BoardItemVideo } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { BoardItemVideo };

class BoardItemVideoModel extends BaseDbModel<BoardItemVideo>("boardItemVideo") {
  
  async create(
    data: Omit<BoardItemVideo, "id" | "priority" | "createdAt" | "updatedAt">,
  ) {
    await db.boardItemVideo.create({
      data: {
        url: data.url,
        boardItemId: data.boardItemId,
        priority: await this.getCurrentHighestPriority({
          boardItemId: data.boardItemId
        }) + 1
      }
    });
  }

  async move(
    boardItemVideoId: BoardItemVideo["id"],
    boardItemVideoToMoveOverId: BoardItemVideo["id"]
  ): Promise<void> {

    // get the boardItemVideos
    const boardItemVideoA = await db.boardItemVideo.findUnique({
      where: { id: boardItemVideoId }
    });
    const boardItemVideoB = await db.boardItemVideo.findUnique({
      where: { id: boardItemVideoToMoveOverId }
    });

    // check if boardItemVideos exist
    if (!boardItemVideoA || !boardItemVideoB)
      throw new Error("BoardItemVideo not found");

    // if boardItemVideos are okay, we need to update the priorities
    // if boardItemVideoA priority is higher boardItemVideoB, we need to:
    // - update boardItemVideoA priority to boardItemVideoB priority
    // - update all boardItemVideos between boardItemVideoB and boardItemVideoA to +1
    // if boardItemVideoA priority is lower boardItemVideoB, we need to:
    // - update boardItemVideoA priority to boardItemVideoB priority
    // - update all boardItemVideos between boardItemVideoA and boardItemVideoB to -1

    if (boardItemVideoA.priority > boardItemVideoB.priority) {
      await db.boardItemVideo.updateMany({
        where: {
          priority: {
            gte: boardItemVideoB.priority,
            lte: boardItemVideoA.priority
          },
          boardItemId: boardItemVideoA.boardItemId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (boardItemVideoA.priority < boardItemVideoB.priority) {
      await db.boardItemVideo.updateMany({
        where: {
          priority: {
            gte: boardItemVideoA.priority,
            lte: boardItemVideoB.priority
          },
          boardItemId: boardItemVideoA.boardItemId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.boardItemVideo.update({
      where: { id: boardItemVideoA.id },
      data: {
        priority: boardItemVideoB.priority
      }
    });
  }

  async getAllByBoardItemId(
    boardItemId: string
  ): Promise<BoardItemVideo[]> {
    return await db.boardItemVideo.findMany({
      where: {
        boardItemId
      },
      orderBy: {
        priority: 'asc'
      }
    });
  }

}

export const boardItemVideoModel = new BoardItemVideoModel();
