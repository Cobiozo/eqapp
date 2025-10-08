import { LoaderFunction } from "@remix-run/node";
import { userModel, UserWithRole } from "~/models/user.server";
import { sessionService } from "~/utils/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  // try to find current user
  const user = await sessionService.getUser(request) as UserWithRole;
  if (!user)
    return 0;

  // return unseen notifications count
  return await userModel.countUnseenPushNotifications(user.id);
}