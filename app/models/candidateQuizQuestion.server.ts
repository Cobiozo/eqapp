import type { CandidateQuizQuestion } from "@prisma/client";
import { db } from "~/utils/db.server";
import BaseDbModel from "~/utils/modelBase.server";

export type { CandidateQuizQuestion };

class CandidateQuizQuestionModel extends BaseDbModel<CandidateQuizQuestion>("candidateQuizQuestion") {
  async create(
    data: Omit<CandidateQuizQuestion, "id" | "priority">,
    quizId: string
  ) {
    return await db.candidateQuizQuestion.create({
      data: {
        ...data,
        priority: await this.getCurrentHighestPriority({
          quizId: data.quizId
        }) + 1,
        quiz: {
          connect: {
            id: quizId
          }
        }
      }
    });
  }

  async update(
    id: CandidateQuizQuestion["id"],
    data: Partial<Omit<CandidateQuizQuestion, "id" | "priority">>,
  ) {
    return await db.candidateQuizQuestion.update({
      where: { id },
      data
    });
  }

  async move(
    candidateQuizQuestionId: CandidateQuizQuestion["id"],
    candidateQuizQuestionToMoveOverId: CandidateQuizQuestion["id"]
  ): Promise<void> {

    // get the candidateQuizQuestions
    const candidateQuizQuestionA = await db.candidateQuizQuestion.findUnique({
      where: { id: candidateQuizQuestionId }
    });
    const candidateQuizQuestionB = await db.candidateQuizQuestion.findUnique({
      where: { id: candidateQuizQuestionToMoveOverId }
    });

    // check if candidateQuizQuestions exist
    if (!candidateQuizQuestionA || !candidateQuizQuestionB)
      throw new Error("CandidateQuizQuestion not found");

    // if candidateQuizQuestions are okay, we need to update the priorities
    // if candidateQuizQuestionA priority is higher candidateQuizQuestionB, we need to:
    // - update candidateQuizQuestionA priority to candidateQuizQuestionB priority
    // - update all candidateQuizQuestions between candidateQuizQuestionB and candidateQuizQuestionA to +1
    // if candidateQuizQuestionA priority is lower candidateQuizQuestionB, we need to:
    // - update candidateQuizQuestionA priority to candidateQuizQuestionB priority
    // - update all candidateQuizQuestions between candidateQuizQuestionA and candidateQuizQuestionB to -1

    if (candidateQuizQuestionA.priority > candidateQuizQuestionB.priority) {
      await db.candidateQuizQuestion.updateMany({
        where: {
          priority: {
            gte: candidateQuizQuestionB.priority,
            lte: candidateQuizQuestionA.priority
          },
          quizId: candidateQuizQuestionA.quizId
        },
        data: {
          priority: {
            increment: 1
          }
        }
      });
    }
    else if (candidateQuizQuestionA.priority < candidateQuizQuestionB.priority) {
      await db.candidateQuizQuestion.updateMany({
        where: {
          priority: {
            gte: candidateQuizQuestionA.priority,
            lte: candidateQuizQuestionB.priority
          },
          quizId: candidateQuizQuestionA.quizId
        },
        data: {
          priority: {
            decrement: 1
          }
        }
      });
    }

    await db.candidateQuizQuestion.update({
      where: { id: candidateQuizQuestionA.id },
      data: {
        priority: candidateQuizQuestionB.priority
      }
    });
  }

  async getAllByQuizId(quizId: string): Promise<CandidateQuizQuestion[]> {
    return await db.candidateQuizQuestion.findMany({
      where: {
        quizId: quizId
      },
      orderBy: {
        priority: 'asc'
      },
    });
  }

}

export const candidateQuizQuestionModel = new CandidateQuizQuestionModel();
