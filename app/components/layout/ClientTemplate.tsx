import { Link } from "@remix-run/react";
import type { UserWithRole } from "~/models/user.server";

type Props = {
  client: UserWithRole
}

export default function ClientTemplate({ client }: Props) {
  return (
    <li key={client.id} className="w-full">
      <Link to={`/dashboard/clients/${client.id}`}>
        <h3 className="font-bold">
          {client.firstName} {client.lastName}
        </h3>
        <div className="text-sm text-gray-400">
          {client.email}
        </div>
      </Link>
    </li>
  );
}
