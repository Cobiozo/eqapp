import { Link } from "@remix-run/react";
import { useContext } from "react";
import { GlobalContext } from "~/root";

type Props = {
  id: string
  name: String,
  title: Record<string, string>
  description: Record<string, string>
}

export default function CatalogTemplate({ name, title, id }: Props) {
  const { lang } = useContext(GlobalContext);

  return (
    <Link className="py-4" to={`/dashboard/admin/notifications/edit/${id}`} >
      <p className="uppercase text-xs">{name}</p>
      <h3 className="font-semibold text-sm text-primary-lighter">
        {title[lang] }
      </h3>
    </Link>
  );
}
