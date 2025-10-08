import { useContext } from "react";
import Container from "../layout/Container";
import { GlobalContext } from "~/root";
import SectionHeader from "./SectionHeader";
import { LoaderFunction } from "@remix-run/node";
import { Certificate, certificateModel } from "~/models/certificate.server";
import { useLoaderData } from "@remix-run/react";
import { FadeIn, FadeInUp } from "./AOM";
import { FaArrowRight } from "react-icons/fa";
import Button from "./Button";
import Marquee from "~/utils/marquee.client";
import { ClientOnly } from "remix-utils";

type Props = {
  certificates: Certificate[];
}

export default function Certificates({ certificates }: Props) {
  const { t, lang: currentLang } = useContext(GlobalContext);

  return (
    <section className="my-4 md:my-10">
      <SectionHeader>
        {t("clients.certificates.title")}
      </SectionHeader>
      <FadeInUp>
        <p className="text-center">
          {t("clients.certificates.description")}
        </p>
      </FadeInUp>
      <FadeInUp delay={1}>
        <p className="text-center text-lg my-6" dangerouslySetInnerHTML={{ __html: t("clients.certificates.slogan") }} />
      </FadeInUp>
      <div className="relative">
        <div className="absolute z-10 top-0 left-0 w-10 md:w-40 h-full bg-gradient-to-r from-light-back to-transparent dark:from-bg-zinc-900" />
        <ClientOnly>
          { () => (
            <Marquee>
              {certificates.map(certificate => (
                <figure key={certificate.id}>
                  <img
                    src={"/uploads/" + certificate.image}
                    alt={certificate.title[currentLang]}
                    className="max-h-[13rem] rounded-3xl aspect-square mx-2 md:mx-4 w-24 md:w-auto"
                  />
                </figure>
              ))}
              
            </Marquee>
          )}
        </ClientOnly>
        <div className="absolute z-10 top-0 right-0 w-10 md:w-40 h-full bg-gradient-to-l from-light-back to-transparent dark:from-bg-zinc-900" />
      </div>
    </section>
  )
}