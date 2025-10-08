import { useContext, useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { GlobalContext } from "~/root";
import Button from "../ui/Button";

export default function CookieBox() {
  const [showCookieBox, setShowCookieBox] = useState(false);
  const { t } = useContext(GlobalContext);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem("cookieAccepted");
    if (!cookieAccepted) {
      setShowCookieBox(true);
    }
  }, []);

  const onConfirm = () => {
    localStorage.setItem("cookieAccepted", "true");
    setShowCookieBox(false);
  }

  if (!showCookieBox) return null;
  return (
    <div className="z-[900] fixed bottom-10 right-0 left-0 rounded-lg bg-dark text-light p-4 w-[calc(100%-3rem)] max-w-lg mx-6 md:mx-auto">
      <p dangerouslySetInnerHTML={{ __html: t("legal.cookieBox") }} className="[&>a]:underline"/>
      <div className="flex mt-4 justify-center">
        <Button
          icon={FaCheck}
          variant={"success"}
          onClick={onConfirm}
          className="mr-2"
          size="sm"
        >
          {t("common.confirm")}
        </Button>
        <Button
          variant="secondary"
          icon={FaTimes}
          size="sm"
          onClick={() => window.location.href = "https://www.google.com"}
        >
          {t("common.cancel")}
        </Button>
      </div>
    </div>
  )
}