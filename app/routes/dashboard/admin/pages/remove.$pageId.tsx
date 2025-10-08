import type { BoardDirectory, BoardItem, Page} from "@prisma/client";
import { BoardItemType, PageType, PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { boardItemModel } from "~/models/boardItem.server";
import { pageModel } from "~/models/page.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import removeUploadedFiles from "~/utils/removeUploadedFiles.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesRemove, "/no-permission");

  // try to find page, if not found, redirect to 404
  const page = await pageModel.getById(params.pageId as string, ["relatedBoard", "relatedBoardItem"]) as Page & { relatedBoardItem?: BoardItem, relatedBoard?: BoardDirectory };
  if (!page)
    return redirect("/404");

  // if page is BOARD type...
  // try to get boardDir, remove it and all its subdirectories and files
  // if not found, redirect to 404
  // if it's BOARD_ITEM type
  // try to get boardItem, remove it and all its files
  // if not found, redirect to 404
  if (page.type === PageType.BOARD) {
    
    const boardDir = await boardDirectoryModel.getById(page.relatedBoard!.id);
    if (!boardDir)
      return redirect("/404");

    try {

      // find all subDirectories no matter how deep they are
      const subDirectories = await boardDirectoryModel.getAllSubDirectoriesIds(boardDir.id);

      // create files to remove array (start as empty, fill it later)
      const filesToRemove: string[] = [];

      // find all file items in this directory and its subdirectories that are advanced
      // as ADVANCED records can have files or images related to them
      const items = await boardItemModel.getMany(
        {
          directoryId: { in: subDirectories.concat(boardDir.id) },
          type: BoardItemType.ADVANCED,
        },
      ) as BoardItem[];

      // loop through the items and add their files to filesToRemove array
      const getFilesPromises = items.map(item => boardItemModel.getFiles(item.id));
      const files = (await Promise.all(getFilesPromises)).flat();
      filesToRemove.push(...files);

      // remove page
      await pageModel.deleteById(page.id);

      // remove files from the filesToRemove array
      await removeUploadedFiles(filesToRemove);

      // get rid of any wysiwyg images that are not used anymore
      for (const item of items) {
        for (const lang of Object.keys(item.text)) {
          await cleanupWysiwygImages(item.text[lang]);
        }
      }

      // redirect to pages
      return redirect("/dashboard/admin/pages");

    } catch (error) {
      throw error;
    }

  } else if (page.type === PageType.BOARD_ITEM) {

    const boardItem = await boardItemModel.getById(page.relatedBoardItem!.id);
    if (!boardItem)
      return redirect("/404");

    try {

      // if boardItem is ADVANCED type
      // retrieve its files
      const filesToRemove = boardItem.type === BoardItemType.ADVANCED
        ? await boardItemModel.getFiles(boardItem.id)
        : [];
  
      // remove page
      await pageModel.deleteById(page.id);
  
      // if its ADVANCED type, remove unused images from wysiwyg and other related files
      if (boardItem.type === BoardItemType.ADVANCED) {
        for (const lang of Object.keys(boardItem.text)) {
          await cleanupWysiwygImages(boardItem.text[lang]);
        }
        await removeUploadedFiles(filesToRemove);
      }
  
      // redirect to pages
      return redirect("/dashboard/admin/pages");
  
    } catch (error) {
      throw error;
    }
  }

  // redirect to pages list
  return redirect("/dashboard/admin/pages");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesRemove, "/no-permission");

  // try to find page, if not found, redirect to pages list
  const page = await pageModel.getById(params.pageId as string);
  if (!page)
    return redirect("/dashboard/admin/pages");

  return null;

}

export default function RemovePage() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate(-1);
  }

  return (
    <>
      <Confirm
        title={t("pages.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("pages.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
