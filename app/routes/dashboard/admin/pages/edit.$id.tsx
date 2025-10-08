import type { BoardDirectory, BoardItem, Page} from "@prisma/client";
import { PageType, PermissionName } from "@prisma/client";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { pageModel } from "~/models/page.server";
import { sessionService } from "~/utils/services/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");
  
  // try to find page with details about related board or board item
  // if not found redirect to 404
  const page = await pageModel.getById(params.id as string, ["relatedBoard", "relatedBoardItem"]) as Page & { relatedBoard: BoardDirectory } & { relatedBoardItem: BoardItem };
  if(!page)
    return redirect("/404");

  // if found and type is board -> redirect to board edit page
  // if found and type is board item -> redirect to board item edit page
  if (page.type === PageType.BOARD)
    return redirect(`/dashboard/admin/boards/edit/subDir/${page.relatedBoard.id}`);
  if (page.type === PageType.BOARD_ITEM)
    return redirect(`/dashboard/admin/boards/edit/item/${page.relatedBoardItem.id}`);

  throw new Error("Invalid page type");
}