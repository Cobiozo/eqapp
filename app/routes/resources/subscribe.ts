import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { sessionService } from "~/utils/services/session.server";
import { userModel } from "~/models/user.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";
import { globalMiddleware } from "~/middlewares/global.server";

const webPush = require("web-push");

export const action: ActionFunction = async ({ request, params }) => { 
  await globalMiddleware({ request, params });
 
  const data = await request.json();
  const subscription = data.subscription;

  const userId = await sessionService.getUserId(request);
  if (userId) {
    await userModel.savePushSubscription(userId, subscription);
    return { message: "Done" };
  }

  // we should also check for cookie based user
  const unloggedUserData = await unloggedUserService.getUnloggedUserData(request);
  if (unloggedUserData?.isRegistered) {
    const relatedUser = await userModel.getById(unloggedUserData.userId);
    if (relatedUser) {
      await userModel.savePushSubscription(relatedUser.id, subscription);
      return { message: "Done" };
    }
  }

  return { message: "Failed: User is not authorized, so doesn't need subscription" };
};

export const loader: LoaderFunction = async () => {
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    console.log(
      "You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
        "environment variables. You can use the following ones:",
    );
    console.log(webPush.generateVAPIDKeys());
    return null;
  }

  const publicKey = process.env.VAPID_PUBLIC_KEY;

  return new Response(publicKey, {
    status: 202,
    statusText: "Successful Operation",
  });
};
