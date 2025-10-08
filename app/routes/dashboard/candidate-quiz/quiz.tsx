import { RoleName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import Quiz from "~/components/features/Quiz";
import Button from "~/components/ui/Button";
import PageHeader from "~/components/ui/PageHeader";
import Video from "~/components/ui/Video";
import { globalMiddleware } from "~/middlewares/global.server";
import type { CandidateQuizFull } from "~/models/candidateQuiz.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request }) => {
  // check if user is eligible to do a quiz
  // if not redirect to dashboard
  const userId = await sessionService.getUserId(request);
  if (!userId)
    return redirect("/dashboard");
  const user = await userModel.getByIdWithRole(userId);
  if (!user || user.role.name !== RoleName.CANDIDATE_PARTNER)
    return redirect("/dashboard");

  // if is eligible, check if there is any quiz left
  // get quiz by priority
  // if not -> go to congrats page
  const currentQuiz = await userModel.getCurrentQuiz(userId) as CandidateQuizFull;
  if (!currentQuiz)
    return redirect("/dashboard/candidate-quiz/congrats");

  // if quiz is okay, mark it as done
  await userModel.markQuizAsDone(userId, currentQuiz.id);

  return { success: true };
}

type LoaderData = CandidateQuizFull;
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  // check if user is eligible to do a quiz
  // if not redirect to dashboard
  const userId = await sessionService.getUserId(request);
  if (!userId)
    return redirect("/dashboard");
  const user = await userModel.getByIdWithRole(userId);
  if (!user || user.role.name !== RoleName.CANDIDATE_PARTNER)
    return redirect("/dashboard");

  // if is eligible, check if there is any quiz left
  // get quiz by priority
  // if not -> go to congrats page
  const currentQuiz = await userModel.getCurrentQuiz(userId) as CandidateQuizFull;
  if (!currentQuiz)
    return redirect("/dashboard/candidate-quiz/congrats");

  return currentQuiz;
}

export default function CandidateQuiz() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const quiz = useLoaderData<LoaderData>();
  const [status, setStatus] = useState<"watch" | "quiz" | "result">("watch");
  const [result, setResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [someTimePassed, setSomeTimePassed] = useState(false);
  const actionData = useActionData();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSomeTimePassed(true);
    }, 1000 * 60 * 2);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (actionData?.success) {
      setStatus("watch");
      setResult(false);
      setScore(0);
      setSomeTimePassed(false);
      
      const timer = setTimeout(() => {
        setSomeTimePassed(true);
      }, 1000 * 60 * 2);
  
      return () => clearTimeout(timer);
    }
  }, [actionData]);

  const handleFinish = ({ result, score }: { result: boolean, score: number }) => {
    setResult(result);
    setScore(score);
    setStatus("result");
  }

  return (
    <section>
      <PageHeader>
        {quiz.name[currentLang] || ""}
      </PageHeader>
      { status === "watch" && (
        <>
          <Video
            className="mx-auto"
            src={quiz.movieUrl}
          />
          { someTimePassed && (
            <Button
              onClick={() => setStatus("quiz")}
              className="mx-auto"
              icon={FaArrowRight}
            >
              {t("candidateQuiz.goToQuiz")}
            </Button>
          )}
        </>  
      )}
      { status === "quiz" && (
        <Quiz
          questions={quiz.questions}
          graduateMinScore={quiz.graduateMinScore}
          onFinish={handleFinish}
        />
      )}
      { status === "result" && (
        <div className="mx-auto w-fit">
          <div
            className={clsx(
              "w-52 h-52 border-6 border-current rounded-full flex justify-center items-center text-6xl font-bold",
              result ? "text-green-500" : "text-red-500"
            )}
          >
            {score}%
          </div>
          <div className={clsx(result ? "text-green-500" : "text-red-500", "text-center my-4")}>
            {t("candidateQuiz.requiredMinScore")} <strong>{quiz.graduateMinScore}%</strong>
          </div>
          { result && (
            <Form method="post">
              <Button
                type="submit"
                className="mx-auto"
                icon={FaArrowRight}
              >
                {t("candidateQuiz.goFurther")}
              </Button>
            </Form>
          )}
          { !result && (
            <Button
              className="mx-auto"
              icon={MdRefresh}
              onClick={() => setStatus("quiz")}
            >
              {t("candidateQuiz.refresh")}
            </Button>
          )}
        </div>
      )}
    </section>
  )
}
