import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import config from "~/config";
import { globalMiddleware } from "~/middlewares/global.server";
import { userModel } from "~/models/user.server";
import { sessionService } from "~/utils/services/session.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  const isLogged = await sessionService.isLogged(request);
  const mentorId = isLogged 
    ? (await sessionService.getUser(request))?.mentorId || config.defaultMentorId
    : (await unloggedUserService.getUnloggedUserData(request))?.mentorId || config.defaultMentorId

  const mentor = await userModel.getById(mentorId);

  return redirect(mentor!.eqShopUrl);
}
