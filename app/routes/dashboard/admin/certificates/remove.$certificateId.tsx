import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import Confirm from "~/components/ui/Confirm";
import { certificateModel } from "~/models/certificate.server";
import { GlobalContext } from "~/root";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import { sessionService } from "~/utils/services/session.server";

export const action: ActionFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCertificatesRemove, "/no-permission");

  // try to find certificate, if not found, redirect to 404
  const certificate = await certificateModel.getById(params.certificateId as string);
  if (!certificate)
    return redirect("/404");

  // remove certificate
  await certificateModel.deleteById(certificate.id);

  // remove it's image as well
  if (certificate.image)
    await removeUploadedFile(certificate.image);

  // redirect to certificates list
  return redirect("/dashboard/admin/certificates?certificateRemoved=true");

}

export const loader: LoaderFunction = async ({ request, params }) => {

  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCertificatesRemove, "/no-permission");

  // try to find certificate, if not found, redirect to certificates list
  const certificate = await certificateModel.getById(params.certificateId as string);
  if (!certificate)
    return redirect("/dashboard/admin/certificates");

  return null;

}

export default function RemoveCertificate() {
  const { t } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetcher = useFetcher();

  const handleConfirm = () => {
    fetcher.submit(new FormData(), { method: "post" });
  }

  const handleCancel = () => {
    navigate("/dashboard/admin/certificates");
  }

  return (
    <>
      <Confirm
        title={t("certificates.delete.confirmTitle")}
        variant="danger"
        confirmLabel={t("common.confirm")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        status={fetcher.state}
      >
        {t("certificates.delete.confirmDesc")}
      </Confirm>
    </>
  )
}
