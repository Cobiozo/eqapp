import type { Certificate } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { Certificate };

class CertificateModel extends BaseDbModel<Certificate>("certificate") {
  async create(
    data: Omit<Certificate, "id" | "priority">,
  ) {
    return await db.certificate.create({
      data: {
        ...data,
        priority: await this.getCurrentHighestPriority() + 1,
      }
    });
  }

  async update(
    id: Certificate["id"],
    data: Partial<Omit<Certificate, "id" | "priority">>,
  ) {
    return await db.certificate.update({
      where: { id },
      data
    });
  }

  async move(
    certificateId: Certificate["id"],
    certificateToMoveOverId: Certificate["id"]
  ): Promise<void> {

    // get the certificates
    const certificateA = await db.certificate.findUnique({
      where: { id: certificateId }
    });
    const certificateB = await db.certificate.findUnique({
      where: { id: certificateToMoveOverId }
    });

    // check if certificates exist
    if (!certificateA || !certificateB)
      throw new Error("Certificate not found");

    // if certificates are okay, we need to update the priorities
    // if certificateA priority is higher certificateB, we need to:
    // - update certificateA priority to certificateB priority
    // - update all certificates between certificateB and certificateA to +1
    // if certificateA priority is lower certificateB, we need to:
    // - update certificateA priority to certificateB priority
    // - update all certificates between certificateA and certificateB to -1

    if (certificateA.priority > certificateB.priority) {
      await db.certificate.updateMany({
        where: {
          priority: {
            gte: certificateB.priority,
            lte: certificateA.priority
          }
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (certificateA.priority < certificateB.priority) {
      await db.certificate.updateMany({
        where: {
          priority: {
            gte: certificateA.priority,
            lte: certificateB.priority
          },
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.certificate.update({
      where: { id: certificateA.id },
      data: {
        priority: certificateB.priority
      }
    });
  }

  async getAll(): Promise<Certificate[]> {
    return await db.certificate.findMany({
      orderBy: {
        priority: 'asc'
      }
    });
  }

}

export const certificateModel = new CertificateModel();
