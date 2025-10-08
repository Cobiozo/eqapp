const paramsObjToUrlFD = (obj: Record<string, any>) => {
  const formData = new URLSearchParams();
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      // add empty key, as CS starts indexing from 1
      formData.append(key + "[]", "");
      obj[key].forEach((el) => {
        formData.append(key + "[]", el);
      });
    } else if (typeof obj[key] === "object") {
      for (const subKey in obj[key]) {
        formData.append(`${key}[${subKey}]`, obj[key][subKey]);
      }
    } else {
      formData.append(key, obj[key]);
    }
  }
  return formData;
}

type HTTP_METHOD = "GET" | "POST" | "PUT" | "DELETE";
const makeApiRequest = async (url: string, method: HTTP_METHOD, params?: Record<string, any>) => {
  const options = {
    method: method,
    headers: {
      'X-Api-Key': process.env.CLICK_MEETING_API_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params ? paramsObjToUrlFD(params) : undefined,
  };

  return fetch("https://api.clickmeeting.com/v1" + url, options)
    .then(response => response.json());
}

export enum CMWebinarAccessType {
  PUBLIC = 1,
  INVITED = 3
}

export const cm = {

  createWebinar: async ({
    name,
    startsAt,
    accessType,
  }: {
    name: string,
    startsAt: string,
    accessType: CMWebinarAccessType,
  }) => {
    return await makeApiRequest("/conferences", "POST", {
      name,
      starts_at: new Date(startsAt).toISOString(),
      access_type: accessType,
      room_type: "webinar",
      permanent_room: false,
      lobby_enabled: true,
      timezone: "Europe/Warsaw",
      registration: {
        enabled: accessType === CMWebinarAccessType.PUBLIC,
      }
    });
  },

  updateWebinar: async ({
    id,
    name,
    startsAt,
  }: {
    id: number,
    name: string,
    startsAt: string,
  }) => {
    return await makeApiRequest(`/conferences/${id}`, "PUT", {
      name,
      starts_at: new Date(startsAt).toISOString(),
      permanent_room: false,
    });
  },

  enableRegistration: async (id: number) => {
    return await makeApiRequest(`/conferences/${id}`, "PUT", {
      registration: {
        enabled: true
      }
    });
  },

  removeWebinar: async (id: string) => {
    return await makeApiRequest(`/conferences/${id}`, "DELETE", {});
  },

  subscribeToWebinar: async (id: number, {
    firstName,
    lastName,
    email,
  }: {
    firstName: string,
    lastName: string,
    email: string,
  }) => {
    return await makeApiRequest(`/conferences/${id}/registration`, "POST", {
      registration: [firstName, lastName, email, email]
    });
  },

  generateWebinarToken: async (id: number) => {
    const access_tokens = (await makeApiRequest(`/conferences/${id}/tokens`, "POST", {
      how_many: 1,
    }))?.access_tokens

    if (!access_tokens || !access_tokens[0])
      return null;
    return access_tokens[0].token;
  },

  generateWebinarAutoLoginHash: async (id: number, {
    token,
    email,
    firstName,
    lastName,
  }: {
    token: string,
    email: string,
    firstName: string,
    lastName: string,
  }): Promise<string | null> => {
    return (await makeApiRequest(`/conferences/${id}/room/autologin_hash`, "POST", {
      email: email,
      nickname: firstName + " " + lastName,
      role: "listener",
      token: token,
    }))?.autologin_hash;
  },

  getWebinarUrl: async (id: number): Promise<string | null> => {
    return (await makeApiRequest(`/conferences/${id}`, "GET"))?.conference.room_url;
  },

  getWebinarInfo: async (id: number) => {
    return await makeApiRequest(`/conferences/${id}`, "GET");
  },

  getWebinarSessions: async (id: number) => {
    return await makeApiRequest(`/conferences/${id}/sessions`, "GET");
  },

  getWebinarSessionAttendees: async (id: number, sessionId: number) => {
    return await makeApiRequest(`/conferences/${id}/sessions/${sessionId}/attendees`, "GET");
  },

  getAllWebinars: async () => {
    return await makeApiRequest(`/conferences`, "GET");
  },

}