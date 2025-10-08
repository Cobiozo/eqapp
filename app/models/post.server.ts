import type { Post } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { Post };

class PostModel extends BaseDbModel<Post>("post") {
  async create(
    data: Omit<Post, "id">,
  ) {
    return await db.post.create({
      data: {
        ...data,
      }
    });
  }

  async update(
    id: Post["id"],
    data: Partial<Omit<Post, "id">>,
  ) {
    return await db.post.update({
      where: { id },
      data
    });
  }

}

export const postModel = new PostModel();
