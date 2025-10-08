import { createCookie, json, redirect } from "@remix-run/node";
import { v4 as uuidv4 } from "uuid";

export type UnloggedUserData = {
  userId: string;
  mentorId: string;
  isRegistered: boolean;
}

export const unloggedUserCookie = createCookie("unloggedUser", {
  maxAge: 60 * 60 * 24 * 365,
  secrets: [process.env.SECRET || "fsd4wrxr"],
});

class UnloggedUserService {

  /** Returns current unloggedUser data */
  /* @param request
  /* @returns unloggedUser data */
  async getUnloggedUserData(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await unloggedUserCookie.parse(cookieHeader)) || {};

    return cookie.userId ? cookie : null;
  }

  /** Creates unloggedUser data */
  /* @param request
  /* @param data
  /* @param redirectTo
  /* @returns json response with unloggedUser cookie */
  async createUnloggedUser(mentorId: string, redirectTo?: string) {
    const newUnloggedUserData: UnloggedUserData = {
      userId: uuidv4(),
      mentorId: mentorId,
      isRegistered: false,
    };

    if (!redirectTo)
      return json(
        { success: true },
        { headers: 
          { "Set-Cookie": await unloggedUserCookie.serialize(newUnloggedUserData) }
        }
      );
    else
      throw redirect(redirectTo, {
        headers: 
          { "Set-Cookie": await unloggedUserCookie.serialize(newUnloggedUserData) }
      });
  }

  async removeUnloggedUser() {
    throw redirect('/dashboard', { 
      headers: 
        { "Set-Cookie": await unloggedUserCookie.serialize({}) }
      }
    );
  }

  async markAsRegistered(request: Request, redirectTo?: string, mentorId?: string) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await unloggedUserCookie.parse(cookieHeader)) || {};

    cookie.isRegistered = true;
    if (mentorId)
      cookie.mentorId = mentorId;

    if (!redirectTo)
      return json(
        { success: true },
        { headers: { "Set-Cookie": await unloggedUserCookie.serialize(cookie) } }
      );
    else
      throw redirect(redirectTo, { headers: { "Set-Cookie": await unloggedUserCookie.serialize(cookie) } });
  }

  async updateUnloggedUserData(request: Request, data: Partial<UnloggedUserData>, redirectTo?: string, returnData?: any) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await unloggedUserCookie.parse(cookieHeader)) || {};

    Object.assign(cookie, data);

    if (!redirectTo)
      return json(
        returnData || { success: true },
        { headers: { "Set-Cookie": await unloggedUserCookie.serialize(cookie) } }
      );
    else
      throw redirect(redirectTo, { headers: { "Set-Cookie": await unloggedUserCookie.serialize(cookie) } });
  }
}

const unloggedUserService = new UnloggedUserService();
export default unloggedUserService;
