import AdminPageHeader   from "~/components/ui/AdminPageHeader";
import { GlobalContext } from "~/root";
import createFormSchema from "~/utils/validation/createFormSchema";
import { useContext } from "react";
import ValidationForm from "~/components/features/ValidationForm";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import parseFormData from "~/utils/validation/parseFormData.server";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { sessionService } from "~/utils/services/session.server";
import type { MenuLink} from "~/models/menuLink.server";
import { menuLinkModel } from "~/models/menuLink.server";
import { editPageFormBaseLoader } from "~/utils/PageFormBase.server";
import type { Language, Page, Role} from "@prisma/client";
import { Icon, MenuLinkType, MenuLinkVariant, PermissionName, RoleName, SupportedLanguage } from "@prisma/client";
import type { DbData } from "~/utils/PageFormBase.server";

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
interface UpdateMenuLinkActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminMenuLinksEdit, "/no-permission");

  // get menu link from DB
  // if it doesn't exist, redirect to 404
  const menuLink = await menuLinkModel.getById(params.id as string);
  if(!menuLink)
    return redirect("/404");

  // check if link is custom link
  // if not -> redirect to menu-links list
  // these links cannot be edited
  if(menuLink.type === MenuLinkType.SYSTEM)
    return redirect("/dashboard/admin/menu-links");

  // get data from request and validate it
  const formData = await request.formData();
  const schema = createSchema(menuLink.variant);
  const data = await parseFormData(formData, schema, request, menuLink);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true)
    return BadRequestError({ data: validationResult });

  try {
    // update menuLink
    const { pageId, supportedRoles, supportedLanguages, ...rest } = data;
    await menuLinkModel.update(params.id as string, rest, pageId, supportedRoles, supportedLanguages);

    // redirect to the list of all menu links
    return redirect("/dashboard/admin/menu-links");

  } catch (error: any) {
    // let errorBoundary handle it
    throw error;
  }
};

/********* LOADER *********/
type LoaderData = MenuLink & {
  dbData: DbData
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminMenuLinksEdit, "/no-permission");

  // get menu link from DB
  // if it doesn't exist, redirect to 404
  const menuLink = await menuLinkModel.getById(params.id as string);
  if(!menuLink)
    return redirect("/404");

  // prepare schema for chosen variant
  const schema = createSchema(menuLink.variant);

  return await editPageFormBaseLoader(params, "menuLinks", menuLinkModel, schema, ["supportedRoles", "supportedLanguages"]);
}

/********* COMPONENT *********/

export default function MenuLinkEdit() {
  const { t } = useContext(GlobalContext);
  const actionData = useActionData<UpdateMenuLinkActionData>();
  const { dbData, ...menuLink } = useLoaderData<LoaderData>();
  const schema = createSchema(menuLink.variant);

  return (
    <section>
      <AdminPageHeader returnLink="/dashboard/admin/menu-links">
        {t("menuLinks.edit.title")}
      </AdminPageHeader>
      <ValidationForm
        collection="menuLinks"
        variant="edit"
        schema={schema}
        errors={actionData?.error?.data}
        success={actionData?.success}
        defaultData={menuLink}
        dbData={dbData}
      />
    </section>
  );
}

