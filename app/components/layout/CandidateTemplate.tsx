import type { UserWithRole } from "~/models/user.server";

type Props = {
  user: UserWithRole
}

export default function CandidateTemplate({ user }: Props) {
  return (
    <div className="flex w-full relative">
      <div className="mx-4 shrink-0">
        <img
          src={ '/images/no-avatar.webp'}
          alt={user.firstName + " " + user.lastName}
          className="w-14 h-14 rounded-lg border-light-border dark:border-medium-darker"
        />
      </div>
      <div>
        <h3 className="font-bold text-md md:text-lg flex flex-col items-start md:flex-row md:items-center">
          {user.firstName} {user.lastName}
        </h3>
        <span className="text-sm">
          <div>
            <span className="block md:inline">{user.email}</span> 
          </div>
        </span>
      </div>
    </div>
  );
}
