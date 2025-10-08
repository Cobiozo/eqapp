import type { ActionFunction} from "@remix-run/node";
import config from "~/config";
import { userModel } from "~/models/user.server";
import { sessionService } from "~/utils/services/session.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";

export const action: ActionFunction = async ({ request }) => {

  // if is logged, just return null
  if (await sessionService.isLogged(request))
    return null;

  // if not try to get unloggedUserData and mentor info
  // if no mentor found, use admin mentor
  // but in both cases, load and return shop url
  const unloggedUserData = await unloggedUserService.getUnloggedUserData(request);
  const mentorId = unloggedUserData?.mentorId || config.defaultMentorId;
  const url = (await userModel.getById(mentorId))?.eqShopUrl;
  return { url };
}