import { RoleName, WebinarVariant } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import config from "~/config";
import { globalMiddleware } from "~/middlewares/global.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { workshopItemModel } from "~/models/workshopItem.server";
import { gr } from "~/utils/gr.server";
import { sessionService } from "~/utils/services/session.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check if we aren't logged in
  // if we are, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/dashboard");

  // get forWebinar and forWorkshop from search params
  const url = new URL(request.url);
  const forWebinar = url.searchParams.get("forWebinar");
  const forWorkshop = url.searchParams.get("forWorkshop");

  // if forWebinar or forWorkshop is undefined
  // just go to home
  // currently we allow registering for clients only for these two reasons
  if (!forWebinar && !forWorkshop)
    return redirect("/dashboard/client/webinars");

  // try to find webinar or workshop
  // we should find at least one of them
  const webinar = forWebinar ? await webinarModel.getById(forWebinar) : null;
  const workshop = forWorkshop ? await workshopItemModel.getById(forWorkshop) : null;
  if (!webinar && !workshop)
    return redirect("/dashboard");

  // try to find user by given id
  // it should be not verified and be CLIENT or CANDIDATE_PARTNER
  // if not user at all, go to dashboard
  // if he is verified, you can update
  // and just try to subscribe (if webinar, workshop doesn't have to be subscribed)
  // if it exists, but is not verified, go ahead and verify it
  const user = await userModel.getById(params.id as string, undefined, {
    verified: false,
    OR: [
      { role: { name: RoleName.CLIENT } },
      { role: { name: RoleName.CANDIDATE_PARTNER } }
    ]
  });
  if (!user)
    return redirect("/dashboard");

  // now we know that user is legit and await for email verification
  // verify user email
  await userModel.activateEmail(user.id);

  // we can also save this contact in GetResponse db, but which one?
  // it depends on webinar role (client or candidate) or it should be just client (if workshop)
  // Save only if newsletter search param is true (user agreed to newsletter)
  const newsletter = url.searchParams.get("newsletter");
  if (newsletter === "true") {
    const variant = forWebinar ? (
      webinar!.variant === WebinarVariant.CLIENT
        ? "client"
        : "candidate"
    ) : "client";
    await gr.saveContactToCampaign({
      variant,
      name: `${user!.firstName} ${user!.lastName}`,
      email: user!.email,
    });
  }

  // check if there is ref in link
  // if there is, get the user by ref
  // try to find it
  // if it exists, use it as mentorId
  // if not, use current userMentorId or default one
  const refFromUrl = url.searchParams.get("ref");
  const ref = refFromUrl !== "null" ? refFromUrl : null

  const mentorId = ref
    ? (await userModel.getById(ref as string))?.id
    : user.mentorId

  // update user logged data to new info
  // if forWebinar redirect to subscribe page
  // if forWorkshop redirect to watch page for this workshop
  return unloggedUserService.updateUnloggedUserData(request, {
    userId: user.id,
    mentorId: mentorId || config.defaultMentorId,
    isRegistered: true,
  }, forWebinar ? `/dashboard/webinars/client/subscribe/${forWebinar}` : `/dashboard/webinars/client/watch/${forWorkshop}`);

}
