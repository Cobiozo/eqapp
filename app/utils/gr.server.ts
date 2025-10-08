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
      'X-Auth-Token': "api-key " + process.env.GET_RESPONSE_API_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params ? paramsObjToUrlFD(params) : undefined,
  };

  return fetch("https://api.getresponse.com/v3" + url, options)
    .then(response => response.json());
}

export const gr = {

  getCampaigns: async () => {
    return await makeApiRequest("/campaigns", "GET");
  },
  
  saveContactToCampaign: async ({
    variant,
    name,
    email
  }: {
    variant: "client" | "partner" | "candidate"
    name: string,
    email: string,
  }) => {
    try {
      const campaignIds = {
        client: process.env.GET_RESPONSE_CAMPAIGN_ID_CLIENT,
        partner: process.env.GET_RESPONSE_CAMPAIGN_ID_PARTNER,
        candidate: process.env.GET_RESPONSE_CAMPAIGN_ID_CANDIDATE_PARTNER
      };
      const campaignId = campaignIds[variant];
      return await makeApiRequest("/contacts", "POST", {
        name,
        campaign: {
          campaignId: campaignId
        },
        email: email,
      });
    } catch (error) {
      // fail silently
    }
  }

}