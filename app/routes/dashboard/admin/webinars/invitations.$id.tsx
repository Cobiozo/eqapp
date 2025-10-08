import type { Role, User, UserWebinar, Webinar, WebinarGuestInvitation  } from "@prisma/client";
import { PermissionName, RoleName, WebinarVariant } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineLaptop } from "react-icons/ai";
import { FaCalendarAlt, FaCheck } from "react-icons/fa";
import { IoWine } from "react-icons/io5";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import BoxTitle from "~/components/ui/BoxTitle";
import Button from "~/components/ui/Button";
import { roleModel } from "~/models/role.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

/********* LOADER *********/
type Loader = Webinar & { 
  invitedGuests: WebinarGuestInvitation[],
  subscribedGuests: User[],
  subscribedPartners: User[]
};

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminWebinarsEdit, "/no-permission");

  // try to find the webinar along with its attended and subscribed users
  // if not found, go to 404
  const webinar = await webinarModel.getById(
    params.id as string,
    ["subscribedUsers", "invitedGuests"],
    {
      variant: WebinarVariant.INVITED,
      expired: false,
      startAt: {
        gte: new Date()
      }
    }
  ) as Webinar & { invitedGuests: WebinarGuestInvitation[], subscribedUsers: UserWebinar[] };
  if (!webinar)
    return redirect("/dashboard/admin/webinars");

  // subscribed users are here another relation db table
  // we should flatten it to get user data for each user
  const subscribedUsers = await userModel.getMany({
    id: {
      in: webinar.subscribedUsers.map(u => u.userId)
    }
  });

  // subscribe users are both partners and guests (in fact client users)
  // split them into two arrays
  const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;
  const subscribedGuests = subscribedUsers.filter(u => u.roleId === clientRole.id);
  const subscribedPartners = subscribedUsers.filter(u => u.roleId !== clientRole.id);

  // if found, return it
  return {
    ...webinar,
    subscribedPartners,
    subscribedGuests
  }
}

/********* COMPONENT *********/
export default function WebinarInvitations() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const webinar = useLoaderData<Loader>();
  
  const isGuestSubscribed = (guest: WebinarGuestInvitation) => {
    return webinar.subscribedGuests.some(u => u.email === guest.email);
  }

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/webinars">
        {webinar.title[currentLang]}
      </AdminPageHeader>
      <div className="flex justify-center items-center gap-4 mb-10">
        <FaCalendarAlt />
        <span>{(new Date(webinar.startAt).toLocaleString())}</span>
      </div>
      <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:justify-center">
        <Button
          className="my-0"
          variant="info"
          to={`/dashboard/admin/webinars/invite/${webinar.id}/partner/--none--`}
          icon={AiOutlineLaptop}
        >
          {t("webinars.invited.invitePartner")}
        </Button>
        <Button
          className="my-0"
          variant="gold"
          to={`/dashboard/admin/webinars/invite/${webinar.id}/guest`}
          icon={IoWine}
        >
          {t("webinars.invited.inviteGuest")}
        </Button>
      </div>
      <section>
        <BoxTitle className="text-center">
          {t("webinars.invited.invitedUsers")} ({webinar.subscribedPartners.length})
        </BoxTitle>
        <ul>
          {webinar.subscribedPartners.map(user => (
            <li key={user.id} className="flex items-center gap-4 border-b border-gray-300 border-dashed w-full mx-auto py-4 relative dark:border-zinc-600">
              <div>
                <img 
                  src={ user.avatar ? "/uploads/" + user.avatar : '/images/no-avatar.webp'}
                  className="w-10 h-10"
                  alt="Avatar"
                />
              </div>
              <div className="tracking-widest">
                <h3 className="font-bold">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="text-sm text-gray-400">
                  {user.email}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {webinar.subscribedPartners.length === 0 && (
          <p className="text-center tracking-widest text-gray-300">
            {t("webinars.noSubscribedUsers")}
          </p>
        )}
      </section>
      <section>
        <BoxTitle className="text-center">
          {t("webinars.invited.invitedGuests")} ({webinar.subscribedGuests.length}/{webinar.invitedGuests.length})
        </BoxTitle>
        <ul>
          {webinar.invitedGuests.map(user => (
            <li key={user.id} className="flex items-center gap-4 border-b border-gray-300 border-dashed w-full mx-auto py-4 relative dark:border-zinc-600">
              <div>
                <img 
                  src="/images/no-avatar.webp"
                  className="w-10 h-10"
                  alt="Avatar"
                />
              </div>
              <div className="tracking-widest">
                <h3 className="font-bold flex items-center gap-2">
                  {user.firstName} {user.lastName}
                  {isGuestSubscribed(user) && (
                    <span className="text-green-500">
                      <FaCheck />
                    </span>
                  )}
                </h3>
                <div className="text-sm text-gray-400">
                  {user.email}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {webinar.invitedGuests.length === 0 && (
          <p className="text-center tracking-widest text-gray-300">
            {t("webinars.noSubscribedUsers")}
          </p>
        )}
      </section>
    </section>
  );
}
