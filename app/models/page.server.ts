import type { BoardItem} from "@prisma/client";
import { PageType, type BoardDirectory, type Page } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { Page };

class PageModel extends BaseDbModel<Page>("page") {
  async createBoardPage(
    name: string,
    boardData: Omit<BoardDirectory, "id" | "createdAt" | "parentDirectoryId" | "icon" | "pageId">,
    supportedLanguages: string[],
  ) {
    const page = await db.page.create({
      data: {
        name,
        type: PageType.BOARD,
        relatedBoard: {
          create: {
            ...boardData,
            supportedLanguages: {
              connect: supportedLanguages.map(language => ({ id: language }))
            }
          }
        }
      },
    });

    // get related board directory id
    const relatedBoardId = await db.boardDirectory.findFirst({
      where: { pageId: page.id },
      select: { id: true }
    });

    return { relatedBoardId: relatedBoardId?.id, pageId: page.id };
  }

  async createBoardItemPage(
    name: string,
    boardItemData: Omit<BoardItem, "id" | "createdAt" | "directoryId" | "icon" | "pageId" | "link" | "text">,
    supportedLanguages: string[],
  ) {
      return await db.page.create({
        data: {
          name,
          type: PageType.BOARD_ITEM,
          relatedBoardItem: {
            create: {
              ...boardItemData,
              supportedLanguages: {
                connect: supportedLanguages.map(language => ({ id: language }))
              }
            }
          }
        },
      });
  }

  async updateBoardPage(
    id: Page["id"],
    name: string,
    boardData: Omit<BoardDirectory, "id" | "createdAt" | "parentDirectoryId" | "priority" | "icon" | "pageId">,
    supportedLanguages: string[],
  ) {
    return await db.page.update({
      where: { id },
      data: {
        name,
        relatedBoard: {
          update: {
            ...boardData,
            supportedLanguages: {
              set: supportedLanguages.map(language => ({ id: language }))
            }
          }
        }
      }
    });
  }

  async updateBoardItemPage(
    id: Page["id"],
    name: string,
    boardItemData: Partial<BoardItem>,
    supportedLanguages: string[],
  ) {
    return await db.page.update({
      where: { id },
      data: {
        name,
        relatedBoardItem: {
          update: {
            ...boardItemData,
            supportedLanguages: {
              set: supportedLanguages.map(language => ({ id: language }))
            }
          }
        }
      }
    });
  }

}

export const pageModel = new PageModel();
