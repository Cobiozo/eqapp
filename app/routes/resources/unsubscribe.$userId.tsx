import type { LoaderFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import Loading from "~/components/layout/Loading";
import { userModel } from "~/models/user.server";

export const loader: LoaderFunction = async ({ params }) => {
  const userId = params.userId as string;
  await userModel.removePushSubscription(userId);
  return { message: "Done" };
}

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {

          if (!registration.pushManager)
            navigate("/");

          registration.pushManager.getSubscription()
            .then((subscription) => {

              if (subscription) {
                subscription.unsubscribe()
                  .then(() => {
                    navigate("/");
                  })
                  .catch((e) => {
                    navigate("/");
                  });
              } else {
                navigate("/");
              }

            })
            .catch((e) => {
              navigate("/");
            })
        })
        .catch((e) => {
          navigate("/");
        }); 
    } else
      navigate("/");
  }, [navigate]);

  return (
    <Loading />
  )
}
