import { Link } from "@remix-run/react";
import type { UserWithRole } from "~/models/user.server";

type Props = {
  candidate: UserWithRole
}

export default function CandidateSimpleTemplate({ candidate }: Props) {
  return (
    <li key={candidate.id} className="w-full">
      <Link to={`/dashboard/candidates/${candidate.id}`}>
        <h3 className="font-bold">
          {candidate.firstName} {candidate.lastName}
        </h3>
        <div className="text-sm text-gray-400">
          {candidate.email}
        </div>
      </Link>
    </li>
  );
}
