import type { UserActivity } from "@prisma/client";
import BaseDbModel from "~/utils/modelBase.server";

export type { UserActivity };

class UserActivityModel extends BaseDbModel<UserActivity>("userActivity") {
}

export const userActivityModel = new UserActivityModel();
