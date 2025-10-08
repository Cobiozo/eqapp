import { RoleName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { userModel } from "~/models/user.server";
import { gr } from "~/utils/gr.server";
import clientService from "~/utils/services/client.server";
import { sessionService } from "~/utils/services/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {

  // get forWebinar from search params
  const url = new URL(request.url);
  const forWebinar = url.searchParams.get("forWebinar");

  // if forWebinar is undefined
  // just go to home
  if (!forWebinar)
    return redirect("/client");

  // check if we aren't logged in
  // if we are, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/client");

  // try to find user by given id
  // it should be client user and not verified anyhow
  // if not, go away
  const user = await userModel.getById(params.id as string, undefined, {
    verified: false,
    emailVerified: false,
    role: {
      name: RoleName.CLIENT
    }
  });
  if (!user)
    return redirect("/client");

  // now we know that user is legit
  // verify user email
  await userModel.activateEmail(user.id);

  // we can also save this contact in GetResponse db
  await gr.saveContactToCampaign({
    campaignId: process.env.GET_RESPONSE_CAMPAIGN_ID as string,
    name: `${user!.firstName} ${user!.lastName}`,
    email: user!.email,
  });

  // now we can redirect to webinar subscription
  // but before we do that, there is one thing to consider
  // it's possible that user clicked on verify email on different device
  // therefore, when he goes back here, he got completely new clientId
  // it's not a problem for activation, as we got activation userId info within mail
  // but... it's problem for the rest.
  // for instance, at subscription we will be considered different client
  // so even after our activation we will be redirected to registration page
  // therefore, we should check first if clientId is different here than userId
  // if it is, we should update clientId to userId
  const clientData = await clientService.getClientData(request);
  if (clientData && clientData?.userId !== user.id) {
    return clientService.updateClientData(request, {
      userId: user.id,
      mentorId: clientData.mentorId,
      isRegistered: clientData.isRegistered
    }, `/client/webinars/subscribe/${forWebinar}`);
  }

  return redirect(`/client/webinars/subscribe/${forWebinar}`);
}

