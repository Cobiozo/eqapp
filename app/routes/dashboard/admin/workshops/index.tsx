import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { sessionService } from "~/utils/services/session.server";
import { PermissionName } from "@prisma/client";
import { workshopDirectoryModel } from "~/models/workshopDirectory.server";

export const loader: LoaderFunction = async ({ request }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminWorkshopsRead, "/no-permission");

  // try to find root category
  // if there is one, redirect to it
  // if not, create one, then redirect to it
  const rootDir = await workshopDirectoryModel.getOne({
    parentDirectoryId: null
  });

  if (rootDir)
    return redirect(`/dashboard/admin/workshops/${rootDir.id}`);

  const newRootDir = await workshopDirectoryModel.create({
    name: {
      en: "Root",
      pl: "Root",
      de: "Root",
      uk: "Root",
      lt: "Root",
    },
  }, [], []);

  return redirect(`/dashboard/admin/workshops/${newRootDir.id}`);
}

export default function WorkshopsIndex() {
  return null;
}
