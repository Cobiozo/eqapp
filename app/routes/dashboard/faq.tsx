import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Faqs from "~/components/client/Faqs";
import type { Faq} from "~/models/faq.server";
import { faqModel } from "~/models/faq.server";

export const loader: LoaderFunction = async ({ request }) => {
  const faqs = await faqModel.getAll();

  return {
    faqs
  };
};

export default function FaqPage() {
  const{ faqs } = useLoaderData<{ faqs: Faq[] }>();

  return (<Faqs faqs={faqs} />);
}