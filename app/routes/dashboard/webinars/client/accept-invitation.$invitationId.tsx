import type { Webinar} from "@prisma/client";
import { RoleName, WebinarVariant } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import Container from "~/components/layout/Container";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Alert from "~/components/ui/Alert";
import PageHeader from "~/components/ui/PageHeader";
import { languageModel } from "~/models/language.server";
import { roleModel } from "~/models/role.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { cm } from "~/utils/cm.server";
import { gr } from "~/utils/gr.server";
import clientService from "~/utils/services/client.server";
import { sessionService } from "~/utils/services/session.server";
import translateService from "~/utils/services/translate.server";
import { v4 as uuidv4 } from "uuid";

type Loader = { webinar: Webinar } & { unverified: true } | null;
export const loader: LoaderFunction = async ({ request, params }) => {

  // check if we aren't logged in
  // if we are, go away, it's place for clients ;)
  if (await sessionService.isLogged(request))
    return redirect("/dashboard");

  // check if invitation id is valid
  const invitationId = params.invitationId as string;
  const invitation = await webinarModel.getGuestInvitationById(invitationId);
  if (!invitation)
    return {
      error: true
    }

  // try to find webinar
  // id is correct (relation holds it), but it may be expired
  const webinar = await webinarModel.getById(invitation.webinarId, undefined, {
    expired: false,
    startAt: {
      gte: new Date()
    }
  });
  if (!webinar)
    return {
      error: true
    }

  // now we know that webinar is valid
  // we can subscribe the user to the webinar, but... which one?
  // get client data first
  // we finish the request here, and after refresh we will check it all again

  const clientData = await clientService.getClientData(request);

  // if client data doesn't exist, we have to find him or create him
  // use (ref if present)or admin as mentor
  if (!clientData) {

    // we try to find if user with this email exists in DB
    // it's possible, as our guest could open invitation on other device
    // if it exists, update client data and go back here
    const clientUser = await userModel.getByEmail(invitation.email);
    if (clientUser)
      return await clientService.updateClientData(request, {
        userId: clientUser.id,
        mentorId: clientUser.mentorId as string,
        isRegistered: true
      }, "/dashboard/webinars/client/accept-invitation/" + invitationId);

    // if there isn't anybody registered at this email
    // it means that it's really new client
    // so create clientData for him and go back here
    const ref = new URL(request.url).searchParams.get("ref");
    const adminId = ref || "ac0d94b7-2ba0-4350-a45a-f782d75fa43a";
    return await clientService.createClient(adminId, "/dashboard/webinars/client/accept-invitation/" + invitationId);
  }

  // here we know that client surely exist, but in which form?
  // if he is not registered yet, we should register him first
  if (!clientData.isRegistered) {

    // retrieve client role id, language id and mentor id
    const roleRecord = await roleModel.getByName(RoleName.CLIENT);
    const currentLang = await translateService.getCurrentLang(request);
    const langRecord = await languageModel.getByName(currentLang);
    const mentor = await userModel.getById(clientData!.mentorId);
    if (!roleRecord || !langRecord || !mentor)
      return await clientService.removeClient();

    // try to create an user
    await userModel.create({
      id: clientData.userId,
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      eqId: clientData.userId,
      email: invitation.email || uuidv4() + "@eqapp.pl",
      avatar: '',
      phone: '',
      },
      '',
      roleRecord.id,
      mentor.id,
      langRecord.id,
    );

    // activate his email right away
    // after all, he just clicked the link in mail
    // we can trust this man! ;)
    await userModel.activateEmail(clientData.userId);

    // we can also save this contact in GetResponse db (if email provided)
    if (invitation.email)
      await gr.saveContactToCampaign({
        campaignId: process.env.GET_RESPONSE_CAMPAIGN_ID as string,
        name: `${invitation.firstName} ${invitation.lastName}`,
        email: invitation.email,
      });

    // now update client data
    // we will be back here after this
    return await clientService.updateClientData(request, {
      userId: clientData.userId,
      mentorId: clientData.mentorId,
      isRegistered: true
    }, "/dashboard/webinars/client/accept-invitation/" + invitationId);
  }

  // at this step we should have registered client
  // check if he really exists
  if (!await userModel.exists({ id: clientData.userId }))
    return await clientService.removeClient();

  // now we know that user and webinar are legit
  // now check if he heasn't already subscribed
  const hasSubscribed = await userModel.hasSubscribedToWebinar(
    clientData.userId,
    webinar.id
  );
  if (hasSubscribed)
    return { error: true };

  // now we only need to prepare private url for
  // and save subscription into db

  // but... here we have two options
  // if webinar is CLIENT variant, we can just subscribe
  if (webinar.variant === WebinarVariant.CLIENT) {
    const web = await cm.subscribeToWebinar(webinar.cmId, {
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      email: invitation.email || uuidv4() + "@eqapp.pl",
    });

    // save subscription info in the database
    await userModel.subscribeToWebinar(clientData.userId, webinar.id, web.url);
  }

  // if webinar is BUSINESS variant, we need to generate private token
  if (webinar.variant === WebinarVariant.BUSINESS) {
   
    // generate private token for the user
    const token = await cm.generateWebinarToken(webinar.cmId);
    if (!token)
      return redirect("/dashboard/webinars/client/no-more-tokens");

    // generate auto login has for this token
    const hash = await cm.generateWebinarAutoLoginHash(webinar.cmId, {
      email: invitation.email || uuidv4() + "@eqapp.pl",
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      token
    });
    if (!hash)
      return { error: true };

    // now we need to get room url to build auto login link
    const roomUrl = await cm.getWebinarUrl(webinar.cmId);
    const autoLoginLink = `${roomUrl}?l=${hash}`;

    // now we just have to save subscription info in the db
    await userModel.subscribeToWebinar(
      clientData.userId,
      webinar.id,
      autoLoginLink
    );
  }

  return { webinar };
}

export default function SubscribedToWebinar() {
  const loaderData = useLoaderData<Loader>();
  const { t, lang: currentLang } = useContext(GlobalContext);

  return (
    <section>
      <Container>
        {loaderData?.error && (
          <>
            <AdminPageHeader returnLink="/dashboard/webinars/client">
              {t("clients.webinars.subscribe")}
            </AdminPageHeader>
            <Alert
              className="rounded-2xl mx-auto my-10"
              variant="danger"
              title={t("clients.webinars.invitationExpired.title")}
            >
              {t("clients.webinars.invitationExpired.description")}
            </Alert>
          </>
        )}
        { loaderData?.webinar && (
          <>
            <PageHeader>
              {loaderData.webinar.title[currentLang]}
            </PageHeader>
            { loaderData.webinar.description[currentLang] && (
              <WysiwygGeneratedContent
                className="text-center py-6"
                content={loaderData.webinar.description[currentLang]}
              />
            )}
            <div className="mx-auto w-fit p-6 bg-light border-2 border-primary-lighter rounded-2xl dark:bg-dark dark:border-light flex my-8 gap-4 justify-center items-center">
              <FaRegCalendarAlt className="text-8xl" />
              <div className="tracking-widest">
                <h3 className="font-bold mt-2">
                  {t("webinars.startAt")}
                </h3>
                <p>
                  {new Date(loaderData.webinar.startAt).toLocaleString()}
                </p>
                <h3 className="font-bold mt-2">
                  {t("webinars.presenter")}
                </h3>
                <p>
                  {loaderData.webinar.presenter}
                </p>
              </div>
            </div>
            <div className="text-center">
              <h4 className="flex justify-center items-center gap-4 font-bold tracking-widest">
                <FaCheck className="text-green-500 text-2xl" />
                {t("webinars.subscribed")}
              </h4>
              <div className="max-w-sm mx-auto mt-4 text-sm">
                <p>{t("webinars.subscribedInfo")}</p>
                <p className="mt-4">{t("webinars.seeYouSoon")}</p>
              </div>
            </div> 
          </>
        )}
      </Container>
    </section>
  )
}