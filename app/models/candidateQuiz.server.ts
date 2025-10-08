import type { CandidateQuiz, CandidateQuizAnswer, CandidateQuizQuestion } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { CandidateQuiz };

export type CandidateQuizFull = CandidateQuiz & {
  questions: (CandidateQuizQuestion & {
    answers: CandidateQuizAnswer[];
  })[];
};

class CandidateQuizModel extends BaseDbModel<CandidateQuiz>("candidateQuiz") {
  async create(
    data: Omit<CandidateQuiz, "id" | "priority">,
  ) {
    return await db.candidateQuiz.create({
      data: {
        ...data,
        priority: await this.getCurrentHighestPriority() + 1,
      }
    });
  }

  async update(
    id: CandidateQuiz["id"],
    data: Partial<Omit<CandidateQuiz, "id" | "priority">>,
  ) {
    return await db.candidateQuiz.update({
      where: { id },
      data
    });
  }

  async move(
    candidateQuizId: CandidateQuiz["id"],
    candidateQuizToMoveOverId: CandidateQuiz["id"]
  ): Promise<void> {

    // get the candidateQuizs
    const candidateQuizA = await db.candidateQuiz.findUnique({
      where: { id: candidateQuizId }
    });
    const candidateQuizB = await db.candidateQuiz.findUnique({
      where: { id: candidateQuizToMoveOverId }
    });

    // check if candidateQuizs exist
    if (!candidateQuizA || !candidateQuizB)
      throw new Error("CandidateQuiz not found");

    // if candidateQuizs are okay, we need to update the priorities
    // if candidateQuizA priority is higher candidateQuizB, we need to:
    // - update candidateQuizA priority to candidateQuizB priority
    // - update all candidateQuizs between candidateQuizB and candidateQuizA to +1
    // if candidateQuizA priority is lower candidateQuizB, we need to:
    // - update candidateQuizA priority to candidateQuizB priority
    // - update all candidateQuizs between candidateQuizA and candidateQuizB to -1

    if (candidateQuizA.priority > candidateQuizB.priority) {
      await db.candidateQuiz.updateMany({
        where: {
          priority: {
            gte: candidateQuizB.priority,
            lte: candidateQuizA.priority
          },
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (candidateQuizA.priority < candidateQuizB.priority) {
      await db.candidateQuiz.updateMany({
        where: {
          priority: {
            gte: candidateQuizA.priority,
            lte: candidateQuizB.priority
          },
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.candidateQuiz.update({
      where: { id: candidateQuizA.id },
      data: {
        priority: candidateQuizB.priority
      }
    });
  }

  async getAll(): Promise<CandidateQuiz[]> {
    return await db.candidateQuiz.findMany({
      orderBy: {
        priority: 'asc'
      }
    });
  }

}

export const candidateQuizModel = new CandidateQuizModel();
