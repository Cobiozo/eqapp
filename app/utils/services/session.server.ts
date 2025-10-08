import type { PermissionName } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { v4 as uuidv4 } from "uuid";

import type { UserWithRole } from "~/models/user.server";
import { userModel } from "~/models/user.server";
import { UnloggedUserData, unloggedUserCookie } from "./unloggedUser.server";
import config from "~/config";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SECRET || "234dsfs3"],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "userId";

class SessionService {
  async getSession(request: Request) {
    const cookie = request.headers.get("Cookie");
    return sessionStorage.getSession(cookie);
  }

  async getUserId(request: Request): Promise<string | undefined> {
    const session = await this.getSession(request);
    const userId = session.get(USER_SESSION_KEY);
    return userId;
  }

  async getUser(request: Request, optional: boolean = false): Promise<null | UserWithRole> {
    const userId = await this.getUserId(request);
    if (userId === undefined) return null;

    const user = await userModel.getByIdWithRole(userId);
    if (user)
      return user;

    if (!optional)
      throw await this.logout(request);

    return null;
  }

  async isLogged(request: Request) {
    const userId = await this.getUserId(request);
    if (userId === undefined) return null;

    const user = await userModel.getById(userId);
    if (user) return true;
    return false;
  }

  async requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
  ): Promise<string> {
    const userId = await this.getUserId(request);
    if (!userId) {
      const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
      throw redirect(`/?${searchParams}`);
    }
    return userId;
  }

  async requireUser(request: Request) {
    const userId = await this.requireUserId(request);

    const user = await userModel.getById(userId);
    if (user) return user;

    throw await this.logout(request);
  }

  async createUserSession({
    request,
    userId,
    remember,
    redirectTo,
  }: {
    request: Request;
    userId: string;
    remember: boolean;
    redirectTo: string;
  }) {
    const session = await this.getSession(request);
    session.set(USER_SESSION_KEY, userId);
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session, {
          maxAge: remember
            ? 60 * 60 * 24 * 7 // 7 days
            : undefined,
        }),
      },
    });
  }

  async requirePermission(request: Request, permission: PermissionName, redirectTo?: string) {
    const loggedUser = await this.getUser(request);
    if (loggedUser?.permissions[permission]) return true;
    throw redirectTo ? redirect(redirectTo) : new Error("Permission denied");
  }

  async hasPermission(request: Request, permission: PermissionName) {
    const loggedUser = await this.getUser(request, true);
    if (!loggedUser) return false;
    return loggedUser.permissions[permission];
  }

  async logout(request: Request) {
    const userId = await this.getUserId(request) as string;
    const user = await userModel.getById(userId);
    const newUnloggedUserData: UnloggedUserData = {
      userId: userId,
      mentorId: user?.mentorId || config.defaultMentorId,
      isRegistered: true
    };

    const session = await this.getSession(request);
    throw redirect("/resources/unsubscribe/" + userId, {
      headers: [
        ["Set-Cookie", await sessionStorage.destroySession(session)],
        ["Set-Cookie", await unloggedUserCookie.serialize(newUnloggedUserData)],
      ]
    });
  }

}

export const sessionService = new SessionService();

