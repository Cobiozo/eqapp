import { type UserAttendedWebinar } from "@prisma/client";
import BaseDbModel from "~/utils/modelBase.server";

export type { UserAttendedWebinar };

class UserAttendedWebinarModel extends BaseDbModel<UserAttendedWebinar>("userAttendedWebinar") {}

export const userAttendedWebinarModel = new UserAttendedWebinarModel();
