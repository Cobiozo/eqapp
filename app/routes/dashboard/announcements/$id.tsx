import { Announcement } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaCheck } from "react-icons/fa";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import Button from "~/components/ui/Button";
import GoldBox from "~/components/ui/GoldBox";
import { globalMiddleware } from "~/middlewares/global.server";
import { announcementModel } from "~/models/announcement.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  // search for announcement, but only user hasn't seen it yet
  const userId = await sessionService.getUserId(request) as string;
  const announcement = await announcementModel.getOne({
    id: params.id as string,
    seenBy: {
      none: {
        id: userId
      }
    }
  })

  // if there isn't one -> redirect to dashboard
  if(!announcement)
    return redirect("/dashboard");

  // if there is -> mark it as read
  await userModel.markAnnouncementAsSeen(userId, announcement.id);

  return redirect("/dashboard");
}


type LoaderData = Announcement;

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // search for unread announcement
  const userId = await sessionService.getUserId(request) as string;
  const announcement = await announcementModel.getOne({
    id: params.id as string,
    seenBy: {
      none: {
        id: userId
      }
    }
  })

  // if there isn't one -> redirect to dashboard
  if(!announcement)
    return redirect("/dashboard");

  // if there is -> return it
  return announcement;
}

export default function AnnouncementIndex() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const announcement = useLoaderData<LoaderData>();

  return (
    <GoldBox
      title={announcement.title[currentLang]}
    >
      <WysiwygGeneratedContent content={announcement.description[currentLang]} />
      <Form method="post">
        <Button
          className="mx-auto mt-10"
          icon={FaCheck}
        >
          {t("common.close")}
        </Button>
      </Form>
    </GoldBox>
  );
}

