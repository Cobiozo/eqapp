import { createCookie, json, redirect } from "@remix-run/node";
import { v4 as uuidv4 } from "uuid";

export type ClientData = {
  userId: string;
  mentorId: string;
  isRegistered: boolean;
}

const clientCookie = createCookie("client", {
  maxAge: 60 * 60 * 24 * 365,
  secrets: [process.env.SECRET || "fsd4wrxr"],
});

class ClientService {

  /** Returns current client data */
  /* @param request
  /* @returns client data */
  async getClientData(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await clientCookie.parse(cookieHeader)) || {};

    return cookie.userId ? cookie : null;
  }

  /** Creates client data */
  /* @param request
  /* @param data
  /* @param redirectTo
  /* @returns json response with client cookie */
  async createClient(mentorId: string, redirectTo?: string) {
    const newClientData: ClientData = {
      userId: uuidv4(),
      mentorId: mentorId,
      isRegistered: false,
    };

    if (!redirectTo)
      return json(
        { success: true },
        { headers: 
          { "Set-Cookie": await clientCookie.serialize(newClientData) }
        }
      );
    else
      return redirect(redirectTo, {
        headers: 
          { "Set-Cookie": await clientCookie.serialize(newClientData) }
      });
  }

  async removeClient() {
    return redirect('/dashboard', { 
      headers: 
        { "Set-Cookie": await clientCookie.serialize({}) }
      }
    );
  }

  async markAsRegistered(request: Request, redirectTo?: string) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await clientCookie.parse(cookieHeader)) || {};

    cookie.isRegistered = true;

    if (!redirectTo)
      return json(
        { success: true },
        { headers: { "Set-Cookie": await clientCookie.serialize(cookie) } }
      );
    else
      return redirect(redirectTo, { headers: { "Set-Cookie": await clientCookie.serialize(cookie) } });
  }

  async updateClientData(request: Request, data: Partial<ClientData>, redirectTo?: string, returnData?: any) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await clientCookie.parse(cookieHeader)) || {};

    Object.assign(cookie, data);

    if (!redirectTo)
      return json(
        returnData || { success: true },
        { headers: { "Set-Cookie": await clientCookie.serialize(cookie) } }
      );
    else
      return redirect(redirectTo, { headers: { "Set-Cookie": await clientCookie.serialize(cookie) } });
  }
}

const clientService = new ClientService();
export default clientService;
