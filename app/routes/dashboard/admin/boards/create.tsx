import type { Language, Role} from "@prisma/client";
import { PermissionName, SupportedLanguage } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { pageModel } from "~/models/page.server";
import { GlobalContext } from "~/root";
import type { DbData} from "~/utils/PageFormBase.server";
import { createPageBaseLoader } from "~/utils/PageFormBase.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const schema = createFormSchema({
  pageName: {
    type: "text",
    label: "pages.fields.name",
    required: true,
    min: 2,
    max: 150,
  },
  name: {
    type: "textMultiLang",
    label: "boards.fields.name",
    required: true,
    min: 2,
    max: 150,
  },
  description: {
    type: "wysiwygMultiLang",
    label: "boards.fields.description",
    minLength: 2,
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline','strike', 'blockquote'],
      ],
    },
    formats: [
      'bold', 'italic', 'underline', 'strike', 'blockquote',
    ],
  },
  supportedLanguages: {
    type: "DBMultiSelect",
    label: "boards.fields.supportedLanguages",
    model: "Language",
    required: true,
    optionsConfig: {
      label: (item: Role) => item.name,
      ignore: (item: Language) => item.name === SupportedLanguage.intl,
      chooseAllByDefault: true,
    },
  }
});

/********* ACTION *********/
interface ActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesCreate, "/no-permission");

  // get data from request and validate it
  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ data: validationResult });

  try {
    // create board
    const { relatedBoardId: boardId } = await pageModel.createBoardPage(
      data.pageName,
      {
        name: data.name,
        description: data.description,
      },
      data.supportedLanguages
    );

    // redirect to the this board edit page
    return redirect("/dashboard/admin/boards/" + boardId);

  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type Loader = DbData;
export const loader: LoaderFunction = async ({ request }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesCreate, "/no-permission");
  
  // if found, just dbData
  return await createPageBaseLoader(schema);
}

/********* COMPONENT *********/
export default function PageBoardCreate() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<ActionData>();
  const dbData = useLoaderData<Loader>();

  return (
    <section>
      <AdminPageHeader returnLink={`/dashboard/admin/pages`}>
        {t("pages.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="pages"
        variant="create"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        dbData={dbData}
      />
    </section>
  );
}
