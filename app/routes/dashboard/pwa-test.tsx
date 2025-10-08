import { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import PageHeader from "~/components/ui/PageHeader";
import { UserWithRole } from "~/models/user.server";
import { PushNotification } from "~/utils/server/pwa-utils.server";
import { sessionService } from "~/utils/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
const loggedUser = await sessionService.getUser(request) as UserWithRole;
  await PushNotification(loggedUser.webPushSubscription, {
    title: "PWA Test",
    body: "Test message for user " + loggedUser.firstName + " " + loggedUser.lastName,
  }, 1);

  return null;
}

export default function() {
   return (
    <section>
      <PageHeader>
        PWA Test
      </PageHeader>
      <Link to="/dashboard/pwa-test" className="block mx-auto underline">
        Send notification
      </Link>
    </section>
   )
}
