import type { CandidateQuizAnswer } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { CandidateQuizAnswer };

class CandidateQuizAnswerModel extends BaseDbModel<CandidateQuizAnswer>("candidateQuizAnswer") {
  async create(
    data: Omit<CandidateQuizAnswer, "id" | "priority">,
    questionId: string
  ) {
    return await db.candidateQuizAnswer.create({
      data: {
        ...data,
        priority: await this.getCurrentHighestPriority({
          questionId
        }) + 1,
        question: {
          connect: {
            id: questionId
          }
        }
      }
    });
  }

  async update(
    id: CandidateQuizAnswer["id"],
    data: Partial<Omit<CandidateQuizAnswer, "id" | "priority">>,
  ) {
    return await db.candidateQuizAnswer.update({
      where: { id },
      data
    });
  }

  async move(
    candidateQuizAnswerId: CandidateQuizAnswer["id"],
    candidateQuizAnswerToMoveOverId: CandidateQuizAnswer["id"]
  ): Promise<void> {

    // get the candidateQuizAnswers
    const candidateQuizAnswerA = await db.candidateQuizAnswer.findUnique({
      where: { id: candidateQuizAnswerId }
    });
    const candidateQuizAnswerB = await db.candidateQuizAnswer.findUnique({
      where: { id: candidateQuizAnswerToMoveOverId }
    });

    // check if candidateQuizAnswers exist
    if (!candidateQuizAnswerA || !candidateQuizAnswerB)
      throw new Error("CandidateQuizAnswer not found");

    // if candidateQuizAnswers are okay, we need to update the priorities
    // if candidateQuizAnswerA priority is higher candidateQuizAnswerB, we need to:
    // - update candidateQuizAnswerA priority to candidateQuizAnswerB priority
    // - update all candidateQuizAnswers between candidateQuizAnswerB and candidateQuizAnswerA to +1
    // if candidateQuizAnswerA priority is lower candidateQuizAnswerB, we need to:
    // - update candidateQuizAnswerA priority to candidateQuizAnswerB priority
    // - update all candidateQuizAnswers between candidateQuizAnswerA and candidateQuizAnswerB to -1

    if (candidateQuizAnswerA.priority > candidateQuizAnswerB.priority) {
      await db.candidateQuizAnswer.updateMany({
        where: {
          priority: {
            gte: candidateQuizAnswerB.priority,
            lte: candidateQuizAnswerA.priority
          },
          questionId: candidateQuizAnswerA.questionId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (candidateQuizAnswerA.priority < candidateQuizAnswerB.priority) {
      await db.candidateQuizAnswer.updateMany({
        where: {
          priority: {
            gte: candidateQuizAnswerA.priority,
            lte: candidateQuizAnswerB.priority
          },
          questionId: candidateQuizAnswerA.questionId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.candidateQuizAnswer.update({
      where: { id: candidateQuizAnswerA.id },
      data: {
        priority: candidateQuizAnswerB.priority
      }
    });
  }

  async getAllByQuestionId(questionId: string): Promise<CandidateQuizAnswer[]> {
    return await db.candidateQuizAnswer.findMany({
      where: {
        questionId
      },
      orderBy: {
        priority: 'asc'
      },
    });
  }

}

export const candidateQuizAnswerModel = new CandidateQuizAnswerModel();
