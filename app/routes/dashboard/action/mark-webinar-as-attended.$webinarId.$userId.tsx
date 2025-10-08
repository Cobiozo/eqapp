import type { ActionFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";

export const action: ActionFunction = async ({ params }) => {

  // start by checking if webinar is subscribed and not already marked as attended
  // if it is done or not subscribed, redirect to 404
  const userId = params.userId as string;
  const user = await userModel.getById(userId);
  if (!user)
    return redirect('/404');
  if (!await userModel.hasSubscribedToWebinar(user.id, params.webinarId as string))
    return redirect('/404');

  // at this point, we know that user is subscribed to the webinar
  // and webinar has to exist (relations and existing of subscribe rel guarantee that)
  const webinar = await webinarModel.getById(params.webinarId as string);
  if (!webinar || webinar.checked || webinar.expired)
    return null;

  const now = new Date();
  const startAt = new Date(webinar.startAt);
  const minutes = Math.floor((now.getTime() - startAt.getTime()) / 60000);
  await userModel.markWebinarAsAttended(user.id, params.webinarId as string, minutes > 0 ? minutes : 0);

  return null;
}
