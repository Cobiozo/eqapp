import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useParams } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { FaCopy, FaPlus } from "react-icons/fa";
import { FadeIn } from "~/components/features/AOM";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import InputField from "~/components/ui/InputField";
import Notification from "~/components/ui/Notification";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";


export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.protegesInvite, "/no-permission");

  // check if the webinar exists and is not expired
  const webinar = await webinarModel.exists({
    id: params.id as string,
    expired: false,
    startAt: {
      gte: new Date()
    }
  })

  if (!webinar)
    return redirect("/dashboard/webinars/partner");

  return null;
}

/********* COMPONENT *********/
export default function WebinarInviteGuest() {
  const { t, isLogged } = useContext(GlobalContext);
  const { id } = useParams();
  const fetcher = useFetcher();
  const [showAddedInfo, setShowAddedInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showEmailExists, setShowEmailExists] = useState(false);
  const [inviteLinkCopied, setInviteLinkCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [invitationLink, setInvitationLink] = useState("");
  
  const inviteGuest = (e) => {
    e.preventDefault();
    fetcher.submit(
      { email, firstName, lastName },
      { method: "post", action: "/dashboard/action/invite-guest-to-webinar/" + id }
    );
  }

  const handleInviteLinkCopy = () => {
    navigator.clipboard.writeText(invitationLink);
    setInviteLinkCopied(true);
  }

  useEffect(() => {
    if (fetcher.data?.success) {
      setShowAddedInfo(true);
      setEmail("");
      setFirstName("");
      setLastName("");
      if (fetcher.data?.confirmUrl)
        setInvitationLink(fetcher.data.confirmUrl);
    } else if (fetcher.data?.error) {
      setShowError(true);
    }
    else if (fetcher.data?.emailExists) {
      setShowEmailExists(true);
    }
  }, [fetcher.data]);

  useEffect(() => {
    if (inviteLinkCopied) {
      const timer = setTimeout(() => setInviteLinkCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [inviteLinkCopied]);

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/webinars/${isLogged ? "partner" : "client"}`}>
        {t("webinars.invited.inviteGuest")}
      </AdminPageHeader>
      { invitationLink && (
        <FadeIn>
          <div className="text-center">
            <p>{t("webinars.invited.urlGenerated")}</p>
            <Button
              onClick={handleInviteLinkCopy}
              icon={FaCopy}
              className="mx-auto"
            >
              {t("webinars.invited.copyUrl")}
            </Button>
          </div>
        </FadeIn>
      )}
      { showAddedInfo && (
          <Notification variant="success" autoClose={true} onClose={() => setShowAddedInfo(false)}>
            {t("webinars.invited.userInvited")}
          </Notification>
      )}
      { showError && (
          <Notification variant="danger" autoClose={true} onClose={() => setShowError(false)}>
            {t("webinars.invited.error")}
          </Notification>
      )}
      { showEmailExists && (
          <Notification variant="danger" autoClose={true} onClose={() => setShowEmailExists(false)}>
            {t("webinars.invited.emailExists")}
          </Notification>
      )}
       { inviteLinkCopied && (
          <Notification variant="success" autoClose={true} onClose={() => setInviteLinkCopied(false)}>
            {t("webinars.invited.linkCopied")}
          </Notification>
      )}

      <SuspenseBlock status={fetcher.state}>
        <form onSubmit={inviteGuest}>
          <div className="w-fit mx-auto flex flex-col gap-2 justify-center items-center">
            <InputField
              required
              label="webinars.invited.firstName"
              name="firstName"
              type="text"
              onChange={setFirstName}
              value={firstName}
            />
            <InputField
              required
              label="webinars.invited.lastName"
              name="lastName"
              type="text"
              onChange={setLastName}
              value={lastName}
            />
            <InputField
              label="webinars.invited.email"
              name="email"
              type="email"
              onChange={setEmail}
              value={email}
            />
            <Button
              type="submit"
              className="mx-auto"
              icon={FaPlus}
            >
              {t("webinars.invited.invite")}
            </Button>
          </div>
        </form>
      </SuspenseBlock>
    </section>
  );
}

