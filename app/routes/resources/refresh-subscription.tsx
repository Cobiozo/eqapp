import { useNavigate, useSearchParams } from "@remix-run/react";
import { useEffect } from "react";
import Loading from "~/components/layout/Loading";
import urlBase64ToUint8Array from "~/utils/urlBase64ToUint8Array";

export default function () {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          if (!registration.pushManager)
            navigate(returnUrl);

          const subscription = registration.pushManager.getSubscription();
          return { subscription, registration };
        })
        .catch(() => {
          navigate(returnUrl);
        })
        .then(async (sub) => {
          if (await sub.subscription) {
            return sub.subscription;
          }

          const subInfo = await fetch("/resources/subscribe");
          const returnedSubscription = await subInfo.text();

          const convertedVapidKey = urlBase64ToUint8Array(returnedSubscription);
          return sub.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
          });
        })
        .then(async (subscription) => {
          fetch("/resources/subscribe", {
            method: "POST",
            body: JSON.stringify({
              subscription: subscription,
              type: "POST_SUBSCRIPTION",
            }),
          })
          .catch((e) => {
            console.log(e);
            navigate(returnUrl);
          })
          .finally(() => {
            navigate(returnUrl);
          });
        });
    } else {
      navigate(returnUrl);
    }

    const timeout = setTimeout(() => {
      navigate(returnUrl);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Loading />
  )
}