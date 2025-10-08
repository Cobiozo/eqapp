import type { WorkshopItem} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { globalMiddleware } from "~/middlewares/global.server";
import { workshopDirectoryModel } from "~/models/workshopDirectory.server";
import { workshopItemModel } from "~/models/workshopItem.server";
import { GlobalContext } from "~/root";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import removeUploadedFiles from "~/utils/removeUploadedFiles.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");

  // try to get workshopDir and check if it ours
  // if not found, redirect to workshops list
  const workshopDir = await workshopDirectoryModel.getById(params.id as string, undefined, {
    userId: await sessionService.getUserId(request),
  });
  if (!workshopDir)
    return redirect("/404");

  try {

    // find all subDirectories no matter how deep they are
    const subDirectories = await workshopDirectoryModel.getAllSubDirectoriesIds(workshopDir.id);

    // create files to remove array (start as empty, fill it later)
    const filesToRemove: string[] = [];

    // loop through all subdirectories and add their images (if exists) to filesToRemove array
    const subDirectoriesItems = await workshopDirectoryModel.getMany({ id: { in: subDirectories } });
    for (const dir of subDirectoriesItems) {
      if (dir.image)
        filesToRemove.push(dir.image);
    }

    // find all file items in this directory and its subdirectories
    const items = await workshopItemModel.getMany(
      {
        directoryId: { in: subDirectories.concat(workshopDir.id) },
      },
    ) as WorkshopItem[];

    // loop through the items and add their files to filesToRemove array
    // also add their posters (but only if exists)
    const getFilesPromises = items.map(item => workshopItemModel.getFiles(item.id));
    const files = (await Promise.all(getFilesPromises)).flat();
    filesToRemove.push(...files);
    const posters = items.map(item => item.poster).filter(Boolean) as string[];
    filesToRemove.push(...posters);

    // remove files from the filesToRemove array
    await removeUploadedFiles(filesToRemove);

    // loop through items and remove their wysiwyg images
    for (const item of items) {
      // remove unused images from wysiwyg and other related files
      for (const lang of Object.keys(item.description)) {
        await cleanupWysiwygImages(item.description[lang]);
      }
    }

    // remove workshop directory
    await workshopDirectoryModel.deleteById(workshopDir.id);

    // remove workshop dir image (if exists)
    if (workshopDir.image)
      await removeUploadedFile(workshopDir.image);

    // redirect to workshop parent directory
    return redirect("/dashboard/my-workshops/" + workshopDir.parentDirectoryId);

  } catch (error) {
    throw error;
  }

}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // require permission
  await sessionService.requirePermission(request, PermissionName.workshopsCreate, "/no-permission");

  // try to get workshop directory
  // if not found, redirect to workshops list
  const workshopDir = await workshopDirectoryModel.exists({ id: params.id as string, userId: await sessionService.getUserId(request) });
  if (!workshopDir)
    return redirect("/dashboard/my-workshops");

  return null;
}

export default function RemoveMyWorkshopDir() {
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
        title={t("workshops.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("workshops.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
