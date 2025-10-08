import type { ChatMessage, ChatRoom} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import Chat from "~/components/features/Chat";
import { globalMiddleware } from "~/middlewares/global.server";
import { chatModel } from "~/models/chat.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type Loader = {
  chat: ChatRoom;
  messages: ChatMessage[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check if we have permission to be here
  // if not, redirect to no-permission page
  await sessionService.requirePermission(request, PermissionName.chatAccess, "/no-permission");

  // try to find chat room by given id
  const chatId = params.id as string;
  const chat = await chatModel.getById(chatId);
  if (!chat)
    return redirect("/404");

  // if chat exists, get it's all messages
  const messages = await chatModel.getMessagesForRoom(chatId);

  // return both chat details and messages
  return { chat, messages };
}

export default function ChatRoomPage() {
  const { chat, messages } = useLoaderData<Loader>();
  const { lang: currentLang } = useContext(GlobalContext);

  return (
    <Chat
      name={chat.name[currentLang] || ""}
      ownerId={chat.ownerId}
      roomId={chat.id}
      messages={messages}
    />
  )

}

