import type { UsefulLink } from "@prisma/client"
import BaseDbModel from "~/utils/modelBase.server";

export type { UsefulLink };

class UsefulLinkModel extends BaseDbModel<UsefulLink>("usefulLink") {
}

export const usefulLinkModel = new UsefulLinkModel();
