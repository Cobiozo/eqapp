import { useContext } from "react";
import { FaAward, FaHeart, FaStar } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { FadeIn, FadeInLeft, FadeInRight, FadeInUp } from "~/components/client/AOM";
import Button from "~/components/client/Button";
import PageHeader from "~/components/client/PageHeader";
import Container from "~/components/layout/Container";
import SectionTitle from "~/components/ui/SectionTitle";
import { GlobalContext } from "~/root";

export default function AboutUs() {
  const { t } = useContext(GlobalContext);

  const benefits: {
    title: string;
    content: string;
    icon ({ className }: { className: string }): JSX.Element;
  }[] = [
    {
      title: t("clients.aboutUs.benefits.experience.title"),
      content: t("clients.aboutUs.benefits.experience.content"),
      icon: ({ className }) => <FaAward className={className} />
    },
    {
      title: t("clients.aboutUs.benefits.creativity.title"),
      content: t("clients.aboutUs.benefits.creativity.content"),
      icon: ({ className }) => <FaStar className={className} />
    },
    {
      title: t("clients.aboutUs.benefits.trust.title"),
      content: t("clients.aboutUs.benefits.trust.content"),
      icon: ({ className }) => <FaHeart className={className} />
    }
  ]

  return (
    <section>
      <Container>
        <PageHeader>
          {t("clients.aboutUs.title")}
        </PageHeader>
        <FadeInUp>
          <div className="text-gray-600 text-lg max-w-2xl text-center mx-auto" dangerouslySetInnerHTML={{ __html: t("clients.aboutUs.description") }} />
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-14">
          <div>
            <SectionTitle>
              <FadeInRight>
                Estera – {t("clients.aboutUs.myMission")}
              </FadeInRight>
            </SectionTitle>
            <FadeIn>
              <div className="text-lg text-gray-600">
                {t("clients.aboutUs.estera")}
              </div>
            </FadeIn>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-10">
            <FadeInUp delay={0.3}>
              <img
                src="/images/client/estera-1.jpg"
                alt="Estera"
                className="rounded-3xl w-full"
              />
            </FadeInUp>
            <FadeInUp delay={0.6}>
              <img
                src="/images/client/estera-2.png"
                alt="Estera"
                className="rounded-3xl w-full mt-4"
              />
            </FadeInUp>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-14">
          <div className="grid grid-cols-2 gap-6 mt-10">
            <FadeInUp delay={0.3}>
              <img
                src="/images/client/kamil-1.jpg"
                alt="Estera"
                className="rounded-3xl w-full"
              />
            </FadeInUp>
            <FadeInUp delay={0.6}>
              <img
                src="/images/client/kamil-2.jpg"
                alt="Estera"
                className="rounded-3xl w-full mt-4"
              />
            </FadeInUp>
          </div>
          <div>
            <SectionTitle>
              <FadeInLeft>
                Kamil – {t("clients.aboutUs.myMission")}
              </FadeInLeft>
            </SectionTitle>
            <FadeIn>
              <div className="text-lg text-gray-600">
                {t("clients.aboutUs.kamil")}
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-32 mb-32">
          <div className="mt-32 md:py-0">
            <img
              src="/images/client/estera-kamil-2.jpg"
              className="w-full aspect-square rounded-3xl object-cover" alt="Estera i Kamil"
            />
          </div>
          <div className="px-10 py-6 bg-gray-200 rounded-3xl">
            <FadeInLeft>
              <SectionTitle>
                {t("clients.aboutUs.weInviteYouToCollaboration")}
              </SectionTitle>
            </FadeInLeft>
            <div>
              {benefits.map((benefit, idx) => (
                <FadeIn key={idx} delay={idx * 0.3}>
                  <div className="flex gap-6 my-10">
                    {benefit.icon({ className: "text-4xl text-primary shrink-0 text-gray-600" })}
                    <div>
                      <h2 className="text-xl mb-6 font-bold text-gray-600">{benefit.title}</h2>
                      <p className="text-gray-600">{benefit.content}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
        <div className="my-32 text-center">
          <FadeInUp>
            <p
              dangerouslySetInnerHTML={{ __html: t("clients.aboutUs.sloganOne") }}
              className="text-2xl"
            />
          </FadeInUp>
          <FadeInUp>
            <p
              dangerouslySetInnerHTML={{ __html: t("clients.aboutUs.sloganTwo") }}
              className="text-2xl"
            />
          </FadeInUp>
          <FadeIn>
            <Button
              to="/client/contact"
              variant="primary"
              className="mx-auto my-10"
              icon={IoMailOutline}
            >
              {t("clients.aboutUs.contact")}
            </Button>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-14">
          <FadeInUp>
            <img
              src="/images/client/our-mission.jpg"
              alt="Our Mission"
              className="rounded-3xl w-full"
            />
          </FadeInUp>
          <div>
            <FadeInLeft>
              <SectionTitle>
                {t("clients.aboutUs.ourVision.title")}
              </SectionTitle>
            </FadeInLeft>
            <div className="text-gray-600 text-lg">
              <FadeIn>
                <p>{t("clients.aboutUs.ourVision.content")}</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
