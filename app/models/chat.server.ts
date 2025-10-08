import type { ChatMessage } from "@prisma/client";
import { type ChatRoom } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { ChatRoom, ChatMessage };

class ChatModel extends BaseDbModel<ChatRoom>("chatRoom") {
  async getMessagesForRoom(roomId: string) {
    return db.chatMessage.findMany({
      where: { roomId },
      orderBy: { createdAt: "asc" },
      include: { user: true },
    });
  }

  async addMessageToRoom(
    roomId: string,
    userId: string,
    message: string,
  ) {
    return db.chatMessage.create({
      data: {
        roomId,
        userId,
        message,
      },
    });
  }
}

export const chatModel = new ChatModel();
