import { useContext } from "react";
import { GlobalContext } from "~/root";

type Props = {
  name: Record<string, string>
  description: Record<string, string>
  startAt: Date
}

export default function AnnouncementTemplate({ name, description, startAt }: Props) {
  const { lang } = useContext(GlobalContext);

  return (
    <div className="py-4">
      <h3 className="font-bold text-md md:text-lg">
        { name[lang] } ({new Date(startAt).toLocaleDateString()})
      </h3>
      <p dangerouslySetInnerHTML={{ __html: description[lang] }} />
    </div>
  );
}
