import { BoardItemType, PermissionName } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import ValidationForm from "~/components/features/ValidationForm";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { boardItemModel } from "~/models/boardItem.server";
import { boardItemVideoModel } from "~/models/boardItemVideo.server";

const schema = createFormSchema({
  url: {
    type: "text",
    label: "menuLinks.fields.url",
    required: true,
    min: 2,
    max: 150,
  },
});

/********* ACTION *********/
interface ActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find board item with this id
  // if not exists, return to pages
  const id = params.id as string;
  const boardItem = await boardItemModel.getById(id)
  if (!boardItem)
    return redirect("/dashboard/admin/pages");

  // if it exits, check if its type is ADVANCED
  // if no -> you shouldn't be here!
  if (boardItem.type !== BoardItemType.ADVANCED)
    return redirect("/no-permission");

  // get data from request and validate it
  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    return BadRequestError({ data: validationResult });
  }

  try {
    await boardItemVideoModel.create({
      boardItemId: id,
      url: data.url,
    });
    
    return redirect("/dashboard/admin/boards/edit/item/" + id + "/videos");

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");

  // try to find board item with this id
  // if not exists, return to pages
  const id = params.id as string;
  const boardItem = await boardItemModel.getById(id)
  if (!boardItem)
    return redirect("/dashboard/admin/pages");

  // if it exits, check if its type is ADVANCED
  // if no -> you shouldn't be here!
  if (boardItem.type !== BoardItemType.ADVANCED)
    return redirect("/no-permission");

  return null
}

/********* COMPONENT *********/
export default function BoardItemCreate() {
  const actionData = useActionData<ActionData>();

  return (
    <section>
      <ValidationForm
        collection="boardItemVideos"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}
