import { useContext, useState } from "react";
import { GlobalContext } from "~/root";
import Button from "../ui/Button";
import { FaCalendarAlt, FaCheck, FaInfo, FaPlay } from "react-icons/fa";
import Animated from "../ui/Animated";
import { FiSend } from "react-icons/fi";
import type { WebinarVariant } from "@prisma/client";
import Notification from "../ui/Notification";
import config from "~/config";
import { IoDownloadOutline } from "react-icons/io5";

type Props = {
  id: string;
  title: string;
  presenter: string;
  startAt: string;
  subscribed: boolean;
  variant: WebinarVariant;
  isPartner?: boolean;
  children?: React.ReactNode;
  isExternal: boolean;
  url: string;
  inviteUrl: string;
  poster?: string;
  isWorkshop?: boolean;
}

export default function WebinarSummary({ id, isWorkshop = false, url, poster, inviteUrl, isExternal, title, presenter, startAt, subscribed, isPartner = false, children }: Props) {
  const startAtPlusBufferMinutes = new Date(startAt);
  startAtPlusBufferMinutes.setMinutes(startAtPlusBufferMinutes.getMinutes() + config.webinarOpeningPeriod);
  const startAtMinusBufferMinutes = new Date(startAt);
  startAtMinusBufferMinutes.setMinutes(startAtMinusBufferMinutes.getMinutes() - config.webinarOpeningPeriod);

  const { t, isLogged } = useContext(GlobalContext);
  const baseUrl = isPartner ? "/dashboard/webinars/partner" : "/dashboard/webinars/client";
  const [linkCopied, setLinkCopied] = useState(false);

  const handleInviteLinkCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setLinkCopied(true);
  }

  return (
    <article className="max-w-sm p-4 border-2 border-primary-lighter bg-white dark:bg-dark dark:border-gold rounded-lg w-full mx-auto py-4 relative">
      { linkCopied && (
        <Notification variant="success" autoClose={true} onClose={() => setLinkCopied(false)}>
          {t("webinars.invited.linkCopied")}
        </Notification>
      )}
      <div className="flex gap-4 flex-col items-center">
        <div className="w-full">
          <div className="text-sm text-gray-400 flex items-center justify-center gap-2">
            { new Date(startAt) > new Date() && (
              <>
                <FaCalendarAlt />
                {(new Date(startAt)).toLocaleString()}
              </>
            )}
            { new Date(startAt) < new Date() && (
              <>
                <Animated
                  animation="flash"
                  infinite
                >
                  <div className="bg-red-500 w-4 h-4 rounded-full" />
                </Animated>
                {t("webinars.live")}
              </>
            )}
          </div>
          { subscribed && (
            <div className="text-green-500 mt-2 flex justify-center items-center gap-2">
              <FaCheck />
              {t("webinars.subscribed")}
            </div>
          )}
          {poster && (
            <img
              src={"/uploads/" + poster}
              alt={title}
              className="w-full h-40 object-cover rounded-lg mt-2"
            />
          )}
          <header>
            <h2 className="font-bold text-lg text-center pt-2">
              {title}
            </h2>
          </header>
          <div className="text-center">
            {presenter}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 shrink-0 flex-wrap my-2">
          { startAtMinusBufferMinutes < new Date() && (
            isExternal ? (
              <Button
                disabled={!subscribed}
                icon={FaPlay}
                size="sm"
                className="my-0"
                to={`${baseUrl}/play/${id}`}
              >
                {t("webinars.goToWebinar")}
              </Button>
            ) : (
              <a href={url + "&skipPlatformChoice=1"}>
                <Button
                  disabled={!subscribed}
                  icon={FaPlay}
                  size="sm"
                  className="my-0"
                >
                  {t("webinars.goToWebinar")}
                </Button>
              </a>
            )
          )}
          { startAtPlusBufferMinutes > new Date() && (
            <Button
              icon={FaInfo}
              size="sm"
              variant="info"
              to={`${baseUrl}/details/${id}`}
              className="my-0"
            >
              {t("webinars.details")}
            </Button>
          )}
          { !subscribed && startAtPlusBufferMinutes > new Date() && (
            <Button
              icon={FaCheck}
              size="sm"
              to={`${baseUrl}/subscribe/${id}`}
              className="my-0"
            >
              {t("webinars.subscribe")}
            </Button>
          )}
          {
            !isWorkshop && startAtPlusBufferMinutes > new Date() && isLogged && (
              <Button
                variant="gold"
                icon={FiSend}
                size="sm"
                className="my-0"
                onClick={handleInviteLinkCopy}
              >
                {t("webinars.invited.inviteGuest")}
              </Button>
            )
          }
          {
            poster && startAtPlusBufferMinutes > new Date() && isLogged && (
              <Button
                to={"/uploads/" + poster}
                download
                variant="gold"
                icon={IoDownloadOutline}
                size="sm"
                className="my-0"
              >
                {t("webinars.downloadPoster")}
              </Button>
            )
          }
          {children}
        </div>
      </div>
    </article>
  );
}
