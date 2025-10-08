import { GlobalContext } from "~/root";
import { useContext } from "react";
import type { UserWithRole } from "~/models/user.server";
import { Link } from "@remix-run/react";
import { FaCheck } from "react-icons/fa";

type Props = {
  protege: UserWithRole
  isLink?: boolean
}

export default function TreeProtegeTemplate({ protege, isLink = true }: Props) {
  const { t } = useContext(GlobalContext);

  const Element = () => (
    <>
      <div className="relative w-fit mx-auto">
        <img
          src={ protege.avatar ? "/uploads/" + protege.avatar : '/images/no-avatar.webp'}
          className="mx-auto w-18 h-18 block rounded-lg border-2 border-gold"
        />
        { protege.verified && (
          <FaCheck className="absolute text-xl -top-1 -right-1 bg-green-500 shrink-0 text-light rounded-full p-1" />
        )}
      </div>
      <h3 className="standard-content font-bold text-center text-sm mt-2 max-w-24 mx-auto">
        {protege.firstName} {protege.lastName}
      </h3>
      <p className="text-center text-xs max-w-24 mx-auto">
        {t("users.roles." + protege.role.name.toLowerCase())}
      </p>
    </>
  );

  if (!isLink)
    return <Element />;
  return (
    <Link to={`/dashboard/proteges/${protege.id}`} className="block pb-2">
     <Element />
    </Link>
  );
}
