import { useContext } from "react";
import { FadeInUp } from "~/components/client/AOM";
import PageHeader from "~/components/client/PageHeader";
import Container from "~/components/layout/Container";
import { GlobalContext } from "~/root";

export default function WhatAmIDoingHere() {
  const { t } = useContext(GlobalContext);

  return (
    <section>
      <Container>
        <PageHeader>
          {t("clients.whatAmIDoingHere.title")}
        </PageHeader>
        <FadeInUp>
          <p className="text-gray-600 text-center mt-10 mb-20 max-w-2xl mx-auto">
            {t("clients.whatAmIDoingHere.content")} 
          </p>
        </FadeInUp>
        <p className="text-center">
          We need Tally here!
        </p>
      </Container>
    </section>
  );
}