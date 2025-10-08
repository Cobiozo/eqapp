import { useContext, useState } from "react";
import { Icon as IconType } from "@prisma/client"
import { GlobalContext } from "~/root";
import Icon from "./Icon";
import Button from "../ui/Button";
import { Link } from "@remix-run/react";
import { BsArrowRight } from "react-icons/bs";
import { FaCheck, FaShare } from "react-icons/fa";
import generateYTPosterImg from "~/utils/generateYTPosterImg";
import config from "~/config";
import Notification from "../ui/Notification";

type Props = {
  id: string;
  name: string;
  url: string;
  done: boolean;
  icon?: IconType;
  isClient?: boolean;
  directoryId?: string;
  inviteUrl?: string
}

export default function WorkshopTemplate({ id, name, url, done, icon, isClient, directoryId, inviteUrl }: Props) {  
  const { t } = useContext(GlobalContext);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleInviteLinkCopy = () => {
    navigator.clipboard.writeText(inviteUrl || "");
    setLinkCopied(true);
  }

  console.log("inviteUrl", inviteUrl);
  console.log("directoryId", directoryId);

  return (
    <article className="rounded-lg overflow-hidden border-2 border-light-border bg-white dark:bg-dark dark:border-medium-darker w-full mx-auto my-1 md:my-0 relative">
      { linkCopied && (
        <Notification variant="success" autoClose={true} onClose={() => setLinkCopied(false)}>
          {t("webinars.invited.linkCopied")}
        </Notification>
      )}
      <div className="relative">
        <img src={generateYTPosterImg(url)} alt={name} className="hidden md:block w-full h-48 object-cover" />
      </div>
      <div className="relative z-10 overflow-hidden items-center justify-between">
        <h2 className="font-semibold px-4 pt-2 md:pt-4 md:pb-0 flex items-center gap-2 text-sm md:text-md shrink">
          {icon && <Icon name={icon} className="text-2xl flex-none shrink-0" />}
          {name}
        </h2>
        <div className="flex items-center">
          <Link
            to={ !isClient ? `/dashboard/workshops/item/${id}` : `/dashboard/webinars/client/watch/${id}`}
            className="w-fit mx-4 my-4 block shrink-0"
          >
            <Button icon={BsArrowRight} size="sm" className="my-0">
              {t("common.watch")}
            </Button>
          </Link>
          { inviteUrl && directoryId && directoryId === config.fixedIds.clientWorkshopsDir && (
            <Button icon={FaShare} size="sm" className="my-0" onClick={handleInviteLinkCopy}>
              {t("common.share")}
            </Button>
          )}
        </div>
      </div>
      { done && <FaCheck className="absolute top-2 left-4 md:right-4 md:bottom-auto md:left-auto text-green-500 opacity-20 text-6xl" /> }
    </article>
  );
}
