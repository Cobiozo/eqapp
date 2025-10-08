import type { Certificate} from "@prisma/client";
import { PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData, useSearchParams } from "@remix-run/react";
import { useContext } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import Button from "~/components/ui/Button";
import { certificateModel } from "~/models/certificate.server";
import { GlobalContext } from "~/root";
import { sessionService } from "~/utils/services/session.server";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import SuspenseBlock from "~/components/ui/SuspenseBlock";
import CertificateView from "~/components/layout/CertificateView";
import Notification from "~/components/ui/Notification";

export const action: ActionFunction = async ({ request }) => {
  // require permission
  await sessionService.requirePermission(request, PermissionName.adminCertificatesEdit, "/no-permission");

  // get data and action from body
  // validate if action is valid
  const data = await request.formData();
  const action = data.get('action') as string
  if (action !== "MOVE")
    return redirect("/dashboard/admin/certificates");

  // handle action
  // check if itemToMove and itemToMoveOver are valid
  const itemToMove = data.get('itemToMove') as string;
  const itemToMoveOver = data.get('itemToMoveOver') as string;
  if (!itemToMove || !itemToMoveOver)
    return BadRequestError({ message: "Invalid items" });

  // if both are valid, try to move itemToMove over itemToMoveOver
  try {
    await certificateModel.move(itemToMove, itemToMoveOver);
    return {
      success: true,
    }
  }
  catch (error) {
    return BadRequestError({ message: "Something went wrong..." });
  }
  
}

type LoaderData = Certificate[];

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminCertificatesRead, "/no-permission");

  // if found, just return the data
  return await certificateModel.getAll();
}

/********* COMPONENT *********/
export default function CertificateItem() {
  const { t, lang: currentLang, user } = useContext(GlobalContext);
  const [searchParams] = useSearchParams();
  const certificateCreated = searchParams.get("certificateCreated");
  const certificateUpdated = searchParams.get("certificateUpdated");
  const certificateRemoved = searchParams.get("certificateRemoved");

  const certificates = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    // if active and over are the same, do nothing
    if (active.id === over.id) return;

    fetcher.submit(
      { action: "MOVE", itemToMove: active.id, itemToMoveOver: over.id },
      { method: "patch" }
    );
  }

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin">
        {t("certificates.allCertificates")}
      </AdminPageHeader>
      { certificateCreated && (
        <Notification variant="success" autoClose={true}>
          {t("certificates.certificateCreated")}
        </Notification>
      )}
      { certificateUpdated && (
        <Notification variant="success" autoClose={true}>
          {t("certificates.certificateUpdated")}
        </Notification>
      )}
      { certificateRemoved && (
        <Notification variant="success" autoClose={true}>
          {t("certificates.certificateRemoved")}
        </Notification>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SuspenseBlock
          status={fetcher.state}
        >
          <SortableContext
            items={certificates}
            strategy={verticalListSortingStrategy}
          >
            {certificates.map(item => (
              <CertificateView
                key={item.id}
                title={item.title[currentLang] || ""}
                id={item.id}
              />
            ))}
          </SortableContext>
        </SuspenseBlock>
      </DndContext>
      <div className="flex flex-col items-center mt-2">
        { user?.permissions[PermissionName.adminCertificatesCreate] && (
          <Button
            size="sm"
            icon={AiOutlineFileAdd}
            to={`/dashboard/admin/certificates/create`}
          >
            {t("certificates.createAction")}
          </Button>
        )}
      </div>
    </section>
  );
}
