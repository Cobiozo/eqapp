import { ProgramRequest, PermissionName } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { useContext } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { UserWithRole } from "~/models/user.server";
import { GlobalContext } from "~/root";
import Button from "../ui/Button";
import SuspenseBlock from "../ui/SuspenseBlock";

type Props = {
  proteges: UserWithRole[]
}

function ActivationRequest({ protege }: { protege: UserWithRole }) {
  const { t, user } = useContext(GlobalContext);
  const loggedUser = user as UserWithRole;
  const fetcher = useFetcher();

  const handleDeny = async () => {
    await fetcher.submit(
      new FormData(),
      {
        method: "post",
        action: `/dashboard/admin/proteges/${protege.id}/remove`
      }
    );
  }

  const handleActivate = async () => {
    await fetcher.submit(
      null,
      {
        method: "post",
        action: `/dashboard/admin/proteges/${protege.id}/activate`
      }
    );
  }

  return (
    <SuspenseBlock status={fetcher.state}>
      <div
        className={clsx(
          "border-b dark:border-b-zinc-600 py-4",
        )}
      >
        <div className="flex items-center flex-col md:flex-row">
          <div className="flex items-center">
            <div className="mx-4 shrink-0">
              <img
                src={ protege.avatar ? "/uploads/" + protege.avatar : '/images/no-avatar.webp'}
                alt={ protege.firstName + " " + protege.lastName}
                className="w-14 h-14"
              />
            </div>
            <div className="md:pr-6">
              <h3 className="font-bold text-md md:text-lg flex flex-col items-start md:flex-row md:items-center">
                {protege.firstName} {protege.lastName}
              </h3>
              <span
                className="text-sm md:text-base"
                dangerouslySetInnerHTML={{ __html: t("proteges.activationRequests.protegeAsksFor") }}
              />
            </div>
          </div>
          {loggedUser.permissions[PermissionName.adminProtegesActivateProgram] && (
            <div className="mx-auto flex justify-center items-center gap-2 md:ml-auto">
              <Button
                variant="success"
                icon={FaCheck}
                onClick={handleActivate}
              >
                {t("proteges.activationRequests.activateAction")}
              </Button>
              <Button
                variant="danger"
                icon={FaTimes}
                onClick={handleDeny}
              >
                {t("proteges.activationRequests.denyAction")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </SuspenseBlock>
  )
}

export default function({ proteges }: Props) {
  return (
    <section>
      <ul>
        {proteges.map((protege) => (
          <li key={protege.id}>
            <ActivationRequest protege={protege} />
          </li>
        ))}
      </ul>
    </section>
  )
}
