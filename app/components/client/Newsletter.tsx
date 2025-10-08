import { useContext } from "react";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import { GlobalContext } from "~/root";
import { FadeIn, FadeInUp } from "./AOM";

export default function Newsletter() {
  const {t} = useContext(GlobalContext);

  const reasons: string[] = [
    t("clients.newsletter.news"),
    t("clients.newsletter.promotions"),
    t("clients.newsletter.webinars"),
    t("clients.newsletter.tips"),
  ];

  return (
    <section className="my-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <SectionTitle className="text-left">
            {t("clients.newsletter.title")}
          </SectionTitle>
          <FadeInUp delay={0.5}>
            <p className="text-gray-600 text-2xl my-10">
              {t("clients.newsletter.beUpdated")}
            </p>
            <ul>
              {reasons.map((reason, idx) => (
                <li key={idx} className="text-gray-600 ml-4">
                  <FadeIn delay={0.6 + (idx * 0.3)}>
                    <div className="flex items-center gap-4 text-xl">
                      <div className="w-4 h-4 border-2 border-current rounded-full" />
                        {reason}
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </FadeInUp>
        </div>
        <div>
          <iframe
            data-tally-src="https://tally.so/embed/mRPNjl?hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="251"
            frameBorder="0"
            marginheight="0"
            marginwidth="0"
            title="Btn App Request" data-tally-embed-widget-initialized="1"
            src="https://tally.so/embed/mRPNjl?hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1&amp;originPage=%2Fstrona_glowna" id="iFrameResizer1" scrolling="no"
            className="overflow-hidden h-[600px]"></iframe>
          </div>
        </div>
      </Container>
    </section>
  )
}