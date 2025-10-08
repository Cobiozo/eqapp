import type { User  } from "@prisma/client";
import { PermissionName, WebinarVariant } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useParams } from "@remix-run/react";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
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
  await sessionService.requirePermission(request, PermissionName.adminWebinarsEdit, "/no-permission");

  // check if webinar exists
  const webinar = await webinarModel.exists({
    id: params.id as string,
    variant: WebinarVariant.INVITED,
    expired: false,
    startAt: {
      gte: new Date()
    }
  })
  if (!webinar)
    return redirect("/admin/dashboard/webinars");

  return null;
}

/********* COMPONENT *********/
export default function WebinarInviteGuest() {
  const { t } = useContext(GlobalContext);
  const { id } = useParams();
  const fetcher = useFetcher();
  const [showAddedInfo, setShowAddedInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showEmailExists, setShowEmailExists] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const inviteGuest = (e) => {
    e.preventDefault();
    fetcher.submit(
      { email, firstName, lastName },
      { method: "post", action: "/dashboard/admin/action/invite-guest-to-webinar/" + id }
    );
  }

  useEffect(() => {
    if (fetcher.data?.success) {
      setShowAddedInfo(true);
      setEmail("");
      setFirstName("");
      setLastName("");
    } else if (fetcher.data?.error) {
      setShowError(true);
    }
    else if (fetcher.data?.emailExists) {
      setShowEmailExists(true);
    }
  }, [fetcher.data]);

  return (
    <section>
      <AdminPageHeader returnLink={"/dashboard/admin/webinars/invitations/" + id}>
        {t("webinars.invited.inviteGuest")}
      </AdminPageHeader>
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


      <SuspenseBlock status={fetcher.state}>
        <form onSubmit={inviteGuest}>
          <div className="w-fit mx-auto flex flex-col gap-2 justify-center items-center">
            <InputField
              required
              label="webinars.invited.email"
              name="email"
              type="email"
              onChange={setEmail}
              value={email}
            />
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
            <Button
              type="submit"
              className="mx-auto"
              variant="success"
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

