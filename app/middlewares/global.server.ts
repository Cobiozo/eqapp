import { RoleName } from "@prisma/client";
import { redirect, type LoaderArgs } from "@remix-run/node";
import config from "~/config";
import type { UserWithRole} from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { sessionService } from "~/utils/services/session.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";

export const globalMiddleware = async ({
  request,
  params
}: {
  request: LoaderArgs["request"];
  params: LoaderArgs["params"];
}) => {

  // ignored paths
  const ignoredPaths = ["verify-email/partner"]
  const url = new URL(request.url);
  for (const ignoredPath of ignoredPaths)
    if (url.pathname.includes(ignoredPath))
      return null;

  // get searchParams
  // we will use it in many scenarios to check where user currently is or to redirect him
  const searchParams = url.searchParams;

  // check if user isLogged
  // if user isLogged, check if he is ca CANDIDATE_PARTNER
  // if so, he can only visit /dashboard/candidate-quiz page
  // if he tries to visit other pages, redirect him to /dashboard/candidate-quiz
  // if user is not a CANDIDATE_PARTNER, just let him go freely
  const isLogged = await sessionService.isLogged(request);
  if (isLogged) {
    const user = await sessionService.getUser(request) as UserWithRole;
    if (user.role.name === RoleName.CANDIDATE_PARTNER && !url.pathname.includes("/dashboard/candidate-quiz"))
      throw redirect("/dashboard/candidate-quiz");
    else
      return null;
  }

  // if user is not logged, we have much more work to do

  // first, check if there is unloggedUser cookie
  // if not, it means user is here for the first time, so we have to create it for him
  // there are two options here:
  // 1. user is present here with referral, if so we should use referral id as mentorId (if ref is ok)
  // 2. user is present here without any referral, if so we should use admin id as mentorId

  // there is also one important thing here, where should we redirect our user after creating the cookie?
  // somebody visits us first time here, so we have to ask him about the language he wants to use
  // but we should make sure that after selecting the language he will be forwarded further, to the page he wanted to visit

  // where further?
  // with first option, we should just redirect him to where he was before (including all searchParams!)
  // with second option, we should ask him, what is he doing here, but... only if he visits /dashboard page
  // if it's other page he probably visits it from email and was here before from other device
  // so we should redirect him where he wanted to go
  const unloggedCookie = await unloggedUserService.getUnloggedUserData(request);
  if (!unloggedCookie) {

    // try to determine which mentorId should be used
    let mentorId = searchParams.get("ref") || config.defaultMentorId;

    // if ref exists, make sure it's valid user
    // if not, use default mentorId
    if (searchParams.get("ref") && !await userModel.exists({ id: mentorId }))
      mentorId = config.defaultMentorId;

    // redirect user to proper page
    if (url.pathname === "/dashboard" && !url.search)
      await unloggedUserService.createUnloggedUser(mentorId, "/dashboard/setup?redirectTo=/dashboard/what-am-i-doing-here");
    else
      await unloggedUserService.createUnloggedUser(mentorId, "/dashboard/setup?redirectTo=" + url.pathname + url.search);
  }

  // if unloggedUser cookie exists, check if he's alright

  // first we need to check if cookie is alright (if has got userId, mentorId and isRegistered fields
  // if not, destroy the cookie as something is clearly corrupted
  if (!("userId" in unloggedCookie && "mentorId" in unloggedCookie && "isRegistered" in unloggedCookie))
    await unloggedUserService.removeUnloggedUser();

  // if object is structured alright, check if he points to proper users
  // if user is not registered, check only mentorId as user doesn't exist in DB yet
  // if user is registered, check both userId and mentorId
  // if any of them is not valid, destroy the cookie as something is clearly corrupted
  if (!unloggedCookie.isRegistered) {
    if (!await userModel.exists({ id: unloggedCookie.mentorId }))
      await unloggedUserService.removeUnloggedUser();
  } else {
    if (!await userModel.exists({ id: unloggedCookie.userId }) || !await userModel.exists({ id: unloggedCookie.mentorId }))
      await unloggedUserService.removeUnloggedUser();
  }

  // there is also one special thing we can check here
  // there is possibility that user  has already registered from different device
  // so check if userId is already used in db, if so, mark user as registered
  // and redirect him where he wanted to go
  if (!unloggedCookie.isRegistered) {
    const user = await userModel.getById(unloggedCookie.userId);
    if (user)
      throw await unloggedUserService.markAsRegistered(request, url.pathname + url.search);
  }

  return null;
}