import type { BoardItem} from "@prisma/client";
import { BoardItemType, PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { boardItemModel } from "~/models/boardItem.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import removeUploadedFiles from "~/utils/removeUploadedFiles.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to get boardDir
  // if not found, redirect to boards list
  const boardDir = await boardDirectoryModel.getById(params.id as string);
  if (!boardDir)
    return redirect("/404");

  try {

    // find all subDirectories no matter how deep they are
    const subDirectories = await boardDirectoryModel.getAllSubDirectoriesIds(boardDir.id);

    // create files to remove array (start as empty, fill it later)
    const filesToRemove: string[] = [];

    // find all file items in this directory and its subdirectories that
    const items = await boardItemModel.getMany(
      {
        directoryId: { in: subDirectories.concat(boardDir.id) },
      },
    ) as BoardItem[];

    // loop through the items and add their files to filesToRemove array
    // but only for ADVANCED items, as links do not have files
    const getFilesPromises = items
      .filter(item => item.type === BoardItemType.ADVANCED)
      .map(item => boardItemModel.getFiles(item.id));
  
    const files = (await Promise.all(getFilesPromises)).flat();
    filesToRemove.push(...files);

    // remove files from the filesToRemove array
    await removeUploadedFiles(filesToRemove);

    // get rid of any wysiwyg images that are not used anymore
    for (const item of items) {
      for (const lang of Object.keys(item.text)) {
        await cleanupWysiwygImages(item.text[lang]);
      }
    }

    // remove board wysiwyg images itself
    for (const lang of Object.keys(boardDir.description)) {
      await cleanupWysiwygImages(boardDir.description[lang]);
    }

    // remove board directory
    await boardDirectoryModel.deleteById(boardDir.id);

    // redirect to board parent directory
    return redirect("/dashboard/admin/boards/" + boardDir.parentDirectoryId);

  } catch (error) {
    throw error;
  }

}

export const loader: LoaderFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to get board directory
  // if not found, redirect to boards list
  const boardDir = await boardDirectoryModel.exists({ id: params.id as string });
  if (!boardDir)
    return redirect("/dashboard/admin/boards");

  return null;
}

export default function RemoveBoardDir() {
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
        title={t("boards.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("boards.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
