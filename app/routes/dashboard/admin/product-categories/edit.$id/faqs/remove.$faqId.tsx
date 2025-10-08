import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate, useParams } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { faqModel } from "~/models/faq.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminFaqsRemove, "/no-permission");

  // try to find faq, if not found, redirect to 404
  const faq = await faqModel.getById(params.faqId as string);
  if (!faq)
    return redirect("/404");

  // remove faq
  await faqModel.deleteById(faq.id);

  // redirect to faqs list
  return redirect("/dashboard/admin/product-categories/edit/" + faq.productCategoryId + "/faqs?faqRemoved=true");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminFaqsRemove, "/no-permission");

  // try to find faq, if not found, redirect to faqs list
  const faq = await faqModel.getById(params.faqId as string);
  if (!faq)
    return redirect("/dashboard/admin/product-categories/edit/" + params.id + "/faqs");

  return null;

}

export default function RemoveFaq() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const { id } = useParams();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/product-categories/edit/" + id + "/faqs");
  }

  return (
    <>
      <Confirm
        title={t("faqs.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("faqs.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
