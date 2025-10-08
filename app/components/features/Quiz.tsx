import type { CandidateQuizAnswer, CandidateQuizQuestion } from "@prisma/client"
import { useContext, useState } from "react"
import { GlobalContext } from "~/root"
import Button from "../ui/Button"
import { FaCheck } from "react-icons/fa"

type Props = {
  questions: (CandidateQuizQuestion & {
    answers: CandidateQuizAnswer[]
  })[]
  graduateMinScore: number
  onFinish: ({ result, score }: { result: boolean, score: number }) => void
}

export default function Quiz({ questions, graduateMinScore, onFinish }: Props) {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const [userAnswers, setUserAnswers] = useState<{
    [x: string]: string[]
  }>(questions.reduce((acc, question) => {
    acc[question.id] = []
    return acc
  }, {}))

  const checkAnswers = () => {
    const score = questions.reduce((acc, question) => {
      const correctAnswers = question.answers.filter((answer) => answer.isCorrect)
      const userAnswerIds = userAnswers[question.id]
      const correctUserAnswers = correctAnswers.filter((answer) => userAnswerIds.includes(answer.id))
      if (correctUserAnswers.length === correctAnswers.length) {
        return acc + 1
      }
      return acc
    }, 0)
    const scoreInPercent = (score / questions.length) * 100
    onFinish({
      result: scoreInPercent >= graduateMinScore,
      score: scoreInPercent
    })
  }

  return (
    <section>
      <ul>
        {questions.map((question) => (
          <li key={question.id} className="bg-light dark:bg-dark rounded-lg border-2 dark:border-primary-dark p-4 my-4">
            <h3 className="font-bold text-lg my-4">{question.question[currentLang] || ""}</h3>
            <ul>
              {question.answers.map((answer) => (
                <li key={answer.id} className="py-2 border-b border-dashed border-zinc-400">
                  <label>
                    <input
                      type="checkbox"
                      checked={userAnswers[question.id].includes(answer.id)}
                      onChange={(e) => {
                        setUserAnswers({
                          ...userAnswers,
                          [question.id]: e.target.checked
                            ? [...userAnswers[question.id], answer.id]
                            : userAnswers[question.id].filter((id) => id !== answer.id)
                        })
                      }}
                    />
                    <span className="ml-2">
                      {answer.answer[currentLang] || ""}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Button
        className="mx-auto"
        icon={FaCheck}
        onClick={checkAnswers}
        >
          {t("candidateQuiz.checkAnswers")}
        </Button>
    </section>
  )

}