import { useContext } from "react";
import { GlobalContext } from "~/root";
import SectionHeader from "./SectionHeader";
import Button from "./Button";

export default function Articles() {
  const { t } = useContext(GlobalContext);


  return (
    <section className="my-14">
      <div className="relative bg-black rounded-3xl p-10">
        <SectionHeader className="text-white [text-shadow:_0_0px_20px_rgb(0_0_0_/_80%)]">
          {t("clients.posts.title")}
        </SectionHeader>
        <p
          className="text-white text-center text-sm md:text-lg my-6"
          dangerouslySetInnerHTML={{ __html: t("clients.posts.description")} }
        />
        <Button
          size="lg"
          variant="white"
          to="/dashboard/posts"
          className="mx-auto my-4"
        >
          {t("clients.posts.readMore")}
        </Button>
      </div>
    </section>
  )
}