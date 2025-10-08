import { PermissionName } from "@prisma/client";
import { redirect, type LoaderFunction } from "@remix-run/node";
import { workshopDirectoryModel } from "~/models/workshopDirectory.server";
import { sessionService } from "~/utils/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await sessionService.requirePermission(request, PermissionName.workshopsRead, "/no-permission");

  // try to find root category
  // if there is one, redirect to it
  // if not, create one, then redirect to it
  const rootDir = await workshopDirectoryModel.getOne({
    parentDirectoryId: null
  });

  if (rootDir)
    return redirect(`/dashboard/workshops/${rootDir.id}`);

  const newRootDir = await workshopDirectoryModel.create({
    name: {
      en: "Root",
      pl: "Root",
      de: "Root",
      uk: "Root",
      lt: "Root",
    },
  }, [], []);

  return redirect(`/dashboard/workshops/${newRootDir.id}`);
}