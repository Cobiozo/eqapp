import type { BoardDirectory, BoardItem} from "@prisma/client";
import { BoardItemType, RoleName } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import PushNotificationsChecker from "~/components/features/PushNotificationsChecker";
import MainLayout from "~/components/layout/MainLayout";
import config from "~/config";
import { boardDirectoryModel } from "~/models/boardDirectory.server";
import { userModel } from "~/models/user.server";
import quillStyles from '~/styles/quill.css';
import { sessionService } from "~/utils/services/session.server";
import unloggedUserService from "~/utils/services/unloggedUser.server";

// react-datepicker install
export const links = function() {
  return [
    { rel: "stylesheet", href: quillStyles },
  ];
}

// client
export const loader: LoaderFunction = async function({ request }) {
  
  // if user is is logged candidate_partner, just return empty array
  // candidate partner should take care of the quiz, not anything else
  const isLogged = await sessionService.isLogged(request);
  if (isLogged && !await userModel.exists({
    id: await sessionService.getUserId(request),
    role: {
      name: {
        not: RoleName.CANDIDATE_PARTNER
      }
    }
  }))
    return {
      shopUrl: "",
      links: []
    }

  // if its client or normal user
  // load board with details
  const board = await boardDirectoryModel.getById(
    isLogged ? "f3861a8a-dbe5-4df8-8be2-6d858af9c066" : "4278acc1-7425-4980-9d52-28a1fc2ceaff", ["subDirectories", "items"]) as BoardDirectory & {
    subDirectories: BoardDirectory[]
    items: BoardItem[],
  }

  // prepare urls from the items and subDirs
  const elements = board.subDirectories
    .map(subDir => ({
      name: subDir.name,
      url: `/dashboard/boards/${subDir.id}`,
      icon: subDir.icon,
      priority: subDir.priority,
      color: subDir.color
    }))
    .concat(board.items.map(item => ({
      name: item.name,
      url: item.type === BoardItemType.LINK ? item.link : `/dashboard/boards/item/${item.id}`,
      icon: item.icon,
      priority: item.priority,
      color: item.color
    })))
    .sort((a, b) => a.priority - b.priority);

  const mentorId = isLogged 
    ? (await sessionService.getUser(request))?.mentorId || config.defaultMentorId
    : (await unloggedUserService.getUnloggedUserData(request))?.mentorId || config.defaultMentorId

  const mentor = await userModel.getById(mentorId);

  return {
    links: elements,
    shopUrl: mentor?.eqShopUrl || "https://eqology.com/"
  }
}

export default function DashboardLayout() {
  const { links: sidebarLinks, shopUrl } = useLoaderData();

  return (
    <>
      <PushNotificationsChecker />
      <MainLayout sidebarLinks={sidebarLinks} shopUrl={shopUrl}>
        <Outlet />
      </MainLayout>
    </>
  );
}
