import { useContext, useState } from "react";
import Container from "../layout/Container";
import { GlobalContext } from "~/root";
import SectionHeader from "./SectionHeader";
import { LoaderFunction } from "@remix-run/node";
import { Certificate, certificateModel } from "~/models/certificate.server";
import { useLoaderData } from "@remix-run/react";
import { FadeIn, FadeInUp } from "./AOM";
import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";
import { Faq } from "@prisma/client";

type Props = {
  faqs: Faq[];
}

export default function Faqs({ faqs }: Props) {
  const { t, lang: currentLang } = useContext(GlobalContext);
  const [currentFaq, setCurrentFaq] = useState<string|null>(null);

  return (
    <section className="mb-6 md:mb-10">
      <SectionHeader>
        {t("clients.faqs.title")}
      </SectionHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
        {faqs.map((faq, idx) => (
          <FadeIn delay={idx * 0.1} key={idx}> 
            <div className="cursor-pointer bg-white rounded-3xl p-4 md:p-10 dark:bg-dark-lighter ">
              <h3
                onClick={() => setCurrentFaq(currentFaq === faq.id ? null : faq.id)}
                className="font-bold text-sm md:text-lg"
              >
                {faq.question[currentLang]}
              </h3>
              { currentFaq === faq.id && (
                <div className="py-2 md:py-6 text-xs md:text-base" dangerouslySetInnerHTML={{ __html: faq.answer[currentLang] }} />
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}