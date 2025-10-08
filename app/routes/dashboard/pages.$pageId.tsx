import { PageType, type BoardDirectory, type BoardItem, type Page } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { globalMiddleware } from "~/middlewares/global.server";
import { pageModel } from "~/models/page.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // try to find the page by id
  // if not found, redirect to 404
  const page = await pageModel.getById(params.pageId as string, ["relatedBoard", "relatedBoardItem"]) as Page & { relatedBoard?: BoardDirectory } & { relatedBoardItem?: BoardItem };
  if (!page)
    return redirect("/404");

  // if we have found it, check type and redirect to the proper board/boardItem page
  if (page.type === PageType.BOARD)
    return redirect(`/dashboard/boards/${page.relatedBoard!.id}`);
  if (page.type === PageType.BOARD_ITEM)
    return redirect(`/dashboard/boards/item/${page.relatedBoardItem!.id}`);

  return redirect("/404");

};