import { PersonalizedContentType, type SupportedLanguage } from "@prisma/client";
import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import { FaArrowRight } from "react-icons/fa";
import WysiwygGeneratedContent from "~/components/layout/WysiwygGeneratedContent";
import Button from "~/components/ui/Button";
import PageHeader from "~/components/ui/PageHeader";
import { globalMiddleware } from "~/middlewares/global.server";
import { personalizedContentModel } from "~/models/personalizedContent.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

type LoaderData = {
  title: Record<SupportedLanguage, string>;
  content: Record<SupportedLanguage, string>;
}
export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });
  
  // if user is logged, get out of here!
  if (await sessionService.isLogged(request))
    return redirect("/dashboard");

  // get page data
  const pageData = await personalizedContentModel.getByType(PersonalizedContentType.BEFORE_CANDIDATE_REGISTER);
  
  return {
    title: pageData?.title,
    content: pageData?.content,
  }
}


export default function BeforeJoin() {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const { title, content } = useLoaderData<LoaderData>();
  const { mentorId } = useParams();

  return (
    <section>
      <PageHeader>
        {title[currentLang] || ""}
      </PageHeader>
      <WysiwygGeneratedContent content={content[currentLang] || ""} />
      <Button
        to={"/dashboard/auth/join/" + mentorId}
        className="my-6 mx-auto"
        icon={FaArrowRight}
        type="button"
      >
        {t("register.createAction")}
      </Button>
    </section>
  )
}
