import { PermissionName } from "@prisma/client";
import type { ActionFunction} from "@remix-run/node";
import { unstable_parseMultipartFormData } from "@remix-run/node";
import { chatModel } from "~/models/chat.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  await sessionService.requirePermission(request, PermissionName.chatAccess, "/no-permission");

  // check if room exists
  // if not, do nothing
  const roomId = params.roomId as string;
  const room = await chatModel.getById(roomId);
  if (!room)
    return;

  // check if we are the owner of this room
  // (currently only owner can add messages)
  // if not, do nothing
  const userId = await sessionService.getUserId(request);
  if (room.ownerId !== userId)
    return null;

  // if  room exists and we are it's owner,
  // just add message to it (if message exists)
  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const content = formData.get("content") as string;
  if (!content)
    return null;

  await chatModel.addMessageToRoom(
    roomId,
    userId,
    content,
  );

  return null;

}