import type { Webinar } from "@prisma/client"
import { Link } from "@remix-run/react";
import { useContext } from "react";
import { GlobalContext } from "~/root";

type Props = {
  items: (Webinar & { subscribed: boolean })[];
}

export default function WebinarsList({ items }: Props) {
  const { t, lang: currentLang } = useContext(GlobalContext);

  return (
    <section>
      {items.map((webinar) => (
        <div key={webinar.id}>
          <h2>{webinar.title[currentLang]}</h2>
          <p>{webinar.description[currentLang]}</p>
          {webinar.subscribed ? (
            <button>Unsubscribe</button>
          ) : (
            <Link to={"/client/webinars/subscribe/" + webinar.id}>
              Subscribe
            </Link>
          )}
        </div>
      ))}
    </section>
  )
}