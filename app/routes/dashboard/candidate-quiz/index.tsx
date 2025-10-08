import { PersonalizedContentType, RoleName, type SupportedLanguage } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import Button from "~/components/ui/Button";
import PageHeader from "~/components/ui/PageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import { CandidateQuizFull } from "~/models/candidateQuiz.server";
import { personalizedContentModel } from "~/models/personalizedContent.server";
import { userModel } from "~/models/user.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = {
  title: Record<SupportedLanguage, string>;
  content: Record<SupportedLanguage, string>;
}
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

  // get page data
  const pageData = await personalizedContentModel.getByType(PersonalizedContentType.BEFORE_CANDIDATE_QUIZ);
  
  // if is eligible, check if there is any quiz left
  // get quiz by priority
  // if not -> go to congrats page
  const currentQuiz = await userModel.getCurrentQuiz(userId) as CandidateQuizFull;
  if (!currentQuiz)
    return redirect("/dashboard/candidate-quiz/congrats");

  return {
    title: pageData?.title,
    content: pageData?.content,
  }
}


export default function CandidateQuizIndex() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const { title, content } = useLoaderData<LoaderData>();

  return (
    <section>
      <PageHeader>
        {title[currentLang] || ""}
      </PageHeader>
      <WysiwygGeneratedContent content={content[currentLang] || ""} />
      <Button
        to="/dashboard/candidate-quiz/quiz"
        className="my-0 mx-auto"
        icon={FaArrowRight}
        type="button"
      >
        {t("candidateQuiz.start")}
      </Button>
    </section>
  )
}
