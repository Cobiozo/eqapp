import { MenuLinkType, type MenuLink } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { MenuLink };

class MenuLinkModel extends BaseDbModel<MenuLink>("menuLink") {
  async create(
    data: Omit<MenuLink, "id" | "pageId" | "type">,
    pageId: string | undefined,
    supportedRoles: string[],
    supportedLanguages: string[]
  ) {

    const menuLink = await db.menuLink.create({
      data: {
        ...data,
        type: MenuLinkType.CUSTOM,
        priority: await this.getCurrentHighestPriority() + 1,
        supportedRoles: {
          connect: supportedRoles.map(role => ({ id: role }))
        },
        supportedLanguages: {
          connect: supportedLanguages.map(language => ({ id: language }))
        }
      }
    });

    if (pageId) {
      await db.menuLink.update({
        where: { id: menuLink.id },
        data: {
          page: {
            connect: { id: pageId }
          }
        }
      });
    }
  }

  async update(
    id: MenuLink["id"],
    data: Partial<Omit<MenuLink, "id" | "type" | "pageId" | "variant">>,
    pageId: string | undefined,
    supportedRoles: string[],
    supportedLanguages: string[]
  ) {
    await db.menuLink.update({
      where: { id },
      data: {
        ...data,
        supportedRoles: {
          set: supportedRoles.map(role => ({ id: role }))
        },
        supportedLanguages: {
          set: supportedLanguages.map(language => ({ id: language }))
        }
      }
    });

    if (pageId) {
      await db.menuLink.update({
        where: { id },
        data: {
          page: {
            connect: { id: pageId }
          }
        }
      });
    }
  }

  async move(
    menuLinkId: MenuLink["id"],
    menuLinkToMoveOverId: MenuLink["id"]
  ): Promise<void> {

    // get the menuLinks
    const menuLinkA = await db.menuLink.findUnique({
      where: { id: menuLinkId }
    });
    const menuLinkB = await db.menuLink.findUnique({
      where: { id: menuLinkToMoveOverId }
    });

    // check if menuLinks exist
    if (!menuLinkA || !menuLinkB)
      throw new Error("MenuLink not found");

    // if menuLinks are okay, we need to update the priorities
    // if menuLinkA priority is higher menuLinkB, we need to:
    // - update menuLinkA priority to menuLinkB priority
    // - update all menuLinks between menuLinkB and menuLinkA to +1
    // if menuLinkA priority is lower menuLinkB, we need to:
    // - update menuLinkA priority to menuLinkB priority
    // - update all menuLinks between menuLinkA and menuLinkB to -1

    if (menuLinkA.priority > menuLinkB.priority) {
      await db.menuLink.updateMany({
        where: {
          priority: {
            gte: menuLinkB.priority,
            lte: menuLinkA.priority
          }
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (menuLinkA.priority < menuLinkB.priority) {
      await db.menuLink.updateMany({
        where: {
          priority: {
            gte: menuLinkA.priority,
            lte: menuLinkB.priority
          },
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.menuLink.update({
      where: { id: menuLinkA.id },
      data: {
        priority: menuLinkB.priority
      }
    });
  }

  async getAll(): Promise<MenuLink[]> {
    return await db.menuLink.findMany({
      orderBy: {
        priority: 'asc'
      }
    });
  }

  async getSidebarLinks(
    userRole: string,
    userLang: string
  ): Promise<MenuLink[]> {
    return await db.menuLink.findMany({
      where: {
        supportedRoles: {
          some: {
            id: userRole
          }
        },
        supportedLanguages: {
          some: {
            id: userLang
          }
        },
      },
      orderBy: {
        priority: 'asc'
      },
      include: {
        permission: true,
      }
    });
  }
}

export const menuLinkModel = new MenuLinkModel();
