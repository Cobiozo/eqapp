import type { Certificate, Faq, Webinar} from "@prisma/client";
import { WebinarVariant } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Faqs from "~/components/client/Faqs";
import Certificates from "~/components/client/Certificates";
import MeetOurProducts from "~/components/client/MeetOurProducts";
import MeetUs from "~/components/client/MeetUs";
import Newsletter from "~/components/client/Newsletter";
import Splash from "~/components/client/Splash";
import WebinarsList from "~/components/client/WebinarsList";
import WhyEqology from "~/components/client/WhyEqology";
import { certificateModel } from "~/models/certificate.server";
import { faqModel } from "~/models/faq.server";
import { userModel } from "~/models/user.server";
import { webinarModel } from "~/models/webinar.server";
import clientService from "~/utils/services/client.server";
import translateService from "~/utils/services/translate.server";

type Loader = {
  certificates: Certificate[];
  faqs: Faq[];
}

export const loader: LoaderFunction = async ({ request }) => {
  return {
    certificates: await certificateModel.getAll(),
    faqs: await faqModel.getAll(),
  }
}

export default function Index() {
  const { certificates, faqs } = useLoaderData<Loader>();

  return (
    <section>
      <Splash />
      <WhyEqology />
      <Certificates certificates={certificates} />
      <MeetOurProducts />
      <MeetUs />
      <Newsletter />
      <Faqs faqs={faqs} />
    </section>
  )
}