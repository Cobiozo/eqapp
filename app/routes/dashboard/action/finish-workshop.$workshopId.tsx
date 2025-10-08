import { ActivityType, PermissionName } from "@prisma/client";
import type { ActionFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { UserWithRole} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { userWorkshopModel } from "~/models/userWorkshop.server";
import { workshopItemModel } from "~/models/workshopItem.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // require permission
  await sessionService.requirePermission(request, PermissionName.workshopsRead, "/no-permission");

  // start by getting user info and checking if workshop is not already done
  // if it is done, we don't have to do anything
  const user = await sessionService.getUser(request) as UserWithRole;
  if (!user)
    return redirect('/404');
  if (await userModel.hasFinishedWorkshop(user.id, params.workshopId as string))
    return null;

  // workshop should supported for user role and language
  // check if this workshop is supported for user
  // if not, redirect to 404
  const workshop = await workshopItemModel.getById(params.workshopId as string, undefined, {
    supportedRoles: {
      some: {
        id: user.roleId
      }
    },
    supportedLanguages: {
      some: {
        id: user.languageId
      }
    },
    OR: [
      {
        userId: user.mentorId,
      },
      {
        userId: null,
      }
    ]
  });
  if (!workshop)
    return redirect('/404');

  // at this point, we know that the user has permission to start the workshop
  // and has not finished it yet
  // so we can mark it as done
  await userWorkshopModel.create({
    userId: user.id as string,
    workshopId: workshop.id,
    done: true,
  });

  // now it's time to save activity
  await userModel.saveActivity(user.id as string, {
    type: ActivityType.WORKSHOP_FINISH,
    workshopId: workshop.id,
  });

  return null;

}
