import {  Language, MenuLinkVariant, Page, Role} from "@prisma/client";
import { Icon, PermissionName, RoleName, SupportedLanguage, } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData, useParams } from "@remix-run/react";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import AdminPageHeader from "~/components/ui/AdminPageHeader";
import { menuLinkModel } from "~/models/menuLink.server";
import { GlobalContext } from "~/root";
import type { DbData} from "~/utils/PageFormBase.server";
import { createPageBaseLoader } from "~/utils/PageFormBase.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { ConflictError } from "~/utils/errors/Conflict.server";
import { PrismaError } from "~/utils/errors/PrismaErrors.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";

const createSchema = (variant: MenuLinkVariant) => {
  return createFormSchema({
    name: {
      type: "textMultiLang",
      label: "menuLinks.fields.name",
      required: true,
      min: 2,
      max: 150,
    },
    icon: {
      type: "icon",
      label: "boards.fields.icon",
      required: true,
      options: Object.values(Icon).map((type) => ({
        value: type,
        label: `boards.icons.${type}`,
      })),
    },
    ...(variant === MenuLinkVariant.INTERNAL ? {
      pageId: {
        type: "DBSelect",
        label: "menuLinks.fields.page",
        model: "Page",
        required: true,
        optionsConfig: {
          label: (item: Page) => item.name,
        }
      },
    } : {
      url: {
        type: "text",
        label: "menuLinks.fields.url",
        required: true,
        min: 2,
        max: 150,
      },
    }),
    supportedRoles: {
      type: "DBMultiSelect",
      label: "menuLinks.fields.supportedRoles",
      model: "Role",
      required: true,
      optionsConfig: {
        label: (item: Role) => "common.roles." + item.name,
        translate: true,
        ignore: (item: Role) => item.name === RoleName.CLIENT,
        chooseAllByDefault: true,
      }
    },
    supportedLanguages: {
      type: "DBMultiSelect",
      label: "menuLinks.fields.supportedLanguages",
      model: "Language",
      required: true,
      optionsConfig: {
        label: (item: Role) => item.name,
        ignore: (item: Language) => item.name === SupportedLanguage.intl,
        chooseAllByDefault: true,
      },
    }
  });
}

/********* ACTION *********/
interface CreateMenuLinkActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminMenuLinksCreate, "/no-permission");

  // check if variant is one of the allowed values
  if (!Object.keys(MenuLinkVariant).includes(params.variant as string))
    return redirect("/dashboard/admin/menu-links/create");

  // prepare schema for chosen variant
  const schema = createSchema(params.variant as MenuLinkVariant);

  // get data from request and validate it
  const formData = await request.formData();
  const data = await parseFormData(formData, schema, request);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ data: validationResult });

  try {
    // create menuLink
    const { pageId, supportedRoles, supportedLanguages, ...rest } = data;
    await menuLinkModel.create(
      {
        ...rest,
        variant: params.variant as MenuLinkVariant,
      },
      pageId,
      supportedRoles,
      supportedLanguages
    ) 

    // redirect to the list of all categories
    return redirect("/dashboard/admin/menu-links?menuLinkCreated=true");

  } catch (error: any) {
    if(error?.code === PrismaError.UniqueConstraintViolation)
      return ConflictError({ data: { name: "menuLinks.errors.nameExists" } });

    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminMenuLinksCreate, "/no-permission");

  // check if variant is one of the allowed values
  if (!Object.keys(MenuLinkVariant).includes(params.variant as string))
    return redirect("/dashboard/admin/menu-links/create");
 
  return await createPageBaseLoader(createSchema(params.variant as MenuLinkVariant));
}


/********* COMPONENT *********/

export default function MenuLinksCreate() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<CreateMenuLinkActionData>();
  const dbData = useLoaderData<DbData>();
  const { variant } = useParams();
  const schema = createSchema(variant as MenuLinkVariant);

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/menu-links">
        {t("menuLinks.create.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="menuLinks"
        variant="create"
        schema={schema}
        dbData={dbData}
        errors={actionData?.error?.data}
        success={actionData?.success}
      />
    </section>
  );
}

