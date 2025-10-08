import type { Role, User, UserAttendedWebinar, UserWebinar, Webinar } from "@prisma/client";
import { PermissionName, RoleName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoDownloadOutline } from "react-icons/io5";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import BoxTitle from "~/components/ui/BoxTitle";
import Button from "~/components/ui/Button";
import { globalMiddleware } from "~/middlewares/global.server";
import { roleModel } from "~/models/role.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import { GlobalContext } from "~/root";
import { convertArrToCSV } from "~/utils/convertArrToCSV";
import { sessionService } from "~/utils/services/session.server";

/********* LOADER *********/
type Loader = Webinar & { 
  subscribedGuests: User[],
  subscribedPartners: User[]
  attendedUsers: User[]
};

/********* LOADER *********/

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  await sessionService.requirePermission(request, PermissionName.webinarsAccess, "/no-permission");

  // determine if we are browsing workshop webinars or normal webinars
  const url = new URL(request.url);
  const showOnlyLiveWorkshops = url.searchParams.get("showOnlyLiveWorkshops") === "true";

  // try to find the webinar along with its attended and subscribed users
  // if not found, go to 404
  const webinar = await webinarModel.getById(params.id as string, ["subscribedUsers", "attendedUsers"]) as Webinar & { subscribedUsers: UserWebinar[], attendedUsers: UserAttendedWebinar[] };
  if (!webinar)
    return redirect("/dashboard/webinars/partner?showOnlyLiveWorkshops=" + showOnlyLiveWorkshops);

  // subscribed users are here another relation db table
  // we should flatten it to get user data for each user
  // we should also filter them to get only our users
  const userId = await sessionService.getUserId(request);
  const subscribedUsers = await userModel.getMany({
    id: {
      in: webinar.subscribedUsers.map(u => u.userId)
    },
    mentorId: userId
  });

  // attended users are here another relation db table
  // we should flatten it to get user data for each user
  const attendedUsers = await userModel.getMany({
    id: {
      in: webinar.attendedUsers.map(u => u.userId)
    },
    mentorId: userId
  });

  // subscribe users are both partners and guests (in fact client users or candidates for partners)
  // split them into two arrays
  const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;
  const candidatePartnerRole = await roleModel.getByName(RoleName.CANDIDATE_PARTNER) as Role;
  const subscribedGuests = subscribedUsers.filter(u => u.roleId === clientRole.id || u.roleId === candidatePartnerRole.id);
  const subscribedPartners = subscribedUsers.filter(u => u.roleId !== clientRole.id && u.roleId !== candidatePartnerRole.id);

  // if found, return it
  return {
    ...webinar,
    subscribedPartners,
    subscribedGuests,
    attendedUsers: attendedUsers.map(u => ({ 
      ...u,
      time: webinar.attendedUsers.find(au => au.userId === u.id)?.time
    }))
  }
}

/********* COMPONENT *********/
export default function WebinarInfo() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const webinar = useLoaderData<Loader>();

  // Function to download the CSV file
  function downloadAttendersCSV() {
    const data = webinar.attendedUsers.map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));
    const csvContent = convertArrToCSV(data);
    const element = document.createElement("a");
    const blob = new Blob([csvContent], { type: "text/csv" });
    element.href = URL.createObjectURL(blob);
    element.download = "data.csv";
    element.click();
  }
    
  return (
    <section>
      <AdminPageHeader returnLink={"/dashboard/webinars/partner/oldies?showOnlyLiveWorkshops=" + webinar.isWorkshop}>
        {webinar.title[currentLang]}
      </AdminPageHeader>
      <div className="flex justify-center items-center gap-4 mb-10">
        <FaCalendarAlt />
        <span>{(new Date(webinar.startAt).toLocaleString())}</span>
      </div>
      { webinar.expired && (
        <section>
          <BoxTitle className="text-center">
            {t("webinars.attendedUsers")} ({webinar.attendedUsers.length})
          </BoxTitle>
          <Button
            size="sm"
            onClick={downloadAttendersCSV}
            className="mx-auto -mt-2 mb-6"
            icon={IoDownloadOutline}
          >
            {t("webinars.downloadCSV")} 
          </Button>
          <ul>
            {webinar.attendedUsers.map(user => (
              <li key={user.id} className="flex items-center gap-4 rounded-lg border border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker my-4 py-2 px-2 mx-auto max-w-sm">
                <div>
                  <img 
                    src={ user.avatar ? "/uploads/" + user.avatar : '/images/no-avatar.webp'}
                    className="w-14 h-14 rounded-full border-primary"
                    alt="Avatar"
                  />
                </div>
                <div className="">
                  <h3 className="font-semibold">
                    {user.firstName} {user.lastName} ({user.time} min)
                  </h3>
                  <div className="text-sm text-gray-400">
                    {user.email}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {webinar.attendedUsers.length === 0 && (
            <p className="text-center text-sm">
              {t("webinars.noAttendedUsers")}
            </p>
          )}
        </section>
      )}
      <section>
        <BoxTitle className="text-center">
          {t("webinars.invited.invitedUsers")} ({webinar.subscribedPartners.length})
        </BoxTitle>
        <ul>
          {webinar.subscribedPartners.map(user => (
          <li key={user.id} className="flex items-center gap-4 rounded-lg border border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker my-4 py-2 px-2 mx-auto max-w-sm">
            <div>
              <img 
                src={ user.avatar ? "/uploads/" + user.avatar : '/images/no-avatar.webp'}
                className="w-14 h-14 rounded-full border-primary"
                alt="Avatar"
              />
            </div>
            <div className="">
              <h3 className="font-semibold">
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
          <p className="text-center text-sm">
            {t("webinars.noSubscribedUsers")}
          </p>
        )}
      </section>
      <section>
        <BoxTitle className="text-center">
          {t("webinars.invited.invitedGuests")} ({webinar.subscribedGuests.length})
        </BoxTitle>
        <ul>
          {webinar.subscribedGuests.map(user => (
            <li key={user.id} className="flex items-center gap-4 rounded-lg border border-light-border dark:border-medium-darker bg-white dark:bg-dark dark:border-medium-darker my-4 py-2 px-2 mx-auto max-w-sm">
              <div>
                <img 
                  src={ user.avatar ? "/uploads/" + user.avatar : '/images/no-avatar.webp'}
                  className="w-14 h-14 rounded-full border-primary"
                  alt="Avatar"
                />
              </div>
              <div className="">
                <h3 className="font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="text-sm text-gray-400">
                  {user.email}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {webinar.subscribedGuests.length === 0 && (
          <p className="text-center text-sm">
            {t("webinars.noSubscribedUsers")}
          </p>
        )}
      </section>
    </section>
  );
}
