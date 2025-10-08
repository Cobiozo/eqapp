import type { Role, Language, Page } from "@prisma/client";
import { PermissionName, BoardItemType, SupportedLanguage, Icon, BoardColor } from "@prisma/client";
import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { unstable_parseMultipartFormData} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import ValidationForm from "~/components/features/ValidationForm";
import cleanupWysiwygImages from "~/utils/cleanupWysiwygImages.server";
import { BadRequestError } from "~/utils/errors/BadRequest.server";
import fileUploadHandler from "~/utils/fileUploadHandler.server";
import { sessionService } from "~/utils/services/session.server";
import createFormSchema from "~/utils/validation/createFormSchema";
import parseFormData from "~/utils/validation/parseFormData.server";
import type ValidateFormError from "~/utils/validation/types/ValidateFormError";
import { validateFormInAction } from "~/utils/validation/validationFormInAction.server";
import type { BoardItem} from "~/models/boardItem.server";
import { boardItemModel } from "~/models/boardItem.server";
import type UnparsedFormSchema from "~/utils/validation/types/UnparsedFormSchema";
import compareContentAndRemoveUnusedImages from "~/utils/compareContentAndRemoveUnusedImages.server";
import { pageModel } from "~/models/page.server";
import type { DbData} from "~/utils/PageFormBase.server";
import { loadDbDataNeededForForm } from "~/utils/PageFormBase.server";

const prepareSchema = (variant: BoardItemType, isPage: boolean) => {
  const schema: UnparsedFormSchema = {};

  if (isPage)
    schema.pageName = {
      type: "text",
      label: "pages.fields.name",
      required: true,
      min: 2,
      max: 150,
    }

  schema.name = {
    type: "textMultiLang",
    label: "boards.fields.name",
    required: true,
    min: 2,
    max: 150,
  };

  schema.color = {
    type: "select",
    label: "boards.fields.color",
    required: true,
    options: Object.keys(BoardColor).map((color) => ({
      value: color,
      label: `boards.colors.${color}`,
    })),
    defaultValue: BoardColor.PRIMARY
  }

  if (!isPage)
    schema.icon = {
      type: "icon",
      label: "boards.fields.icon",
      options: Object.values(Icon).map((type) => ({
        value: type,
        label: `boards.icons.${type}`,
      })),  
    };

    if (variant === BoardItemType.LINK)
      schema.link = {
        type: "text",
        label: "boards.items.fields.link",
        required: true,
        minLength: 2,
        maxLength: 150,
      }
   
    schema.text = {
      type: "wysiwygMultiLang",
      label: "boards.items.fields.text",
      required: variant === BoardItemType.LINK ? false : true,
      minLength: 2,
      modules: {
        toolbar: [
          [{ 'header': [2, false] }],
          ['bold', 'italic', 'underline','strike', { 'color': [] }, 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}, { 'align': [] }],
          ['link', 'image', "video"],
          ['clean']
        ],
      },
      formats: [
        'header',
        'bold', 'italic', 'underline', 'strike', 'color', 'blockquote',
        'list', 'bullet', 'indent', 'align',
        'link', 'image', 'video'
      ]
    }

    schema.supportedLanguages = {
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
  
    return createFormSchema(schema);
}

/********* ACTION *********/
interface ActionData {
  error?: ValidateFormError
  success?: true
}

export const action: ActionFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");
  
  // CLEANUP FUNC
  const cleanup = async () => {
    cleanupWysiwygImages(data?.text);
  }

  // try to find the board item
  // if not found, redirect to 404
  const boardItem = await boardItemModel.getById(params.id as string);
  if (!boardItem) {
    await cleanup();
    return redirect("/404");
  }

  // get data from request and validate it
  const variant = boardItem.type;
  const isPage = boardItem.pageId !== null;
  const schema = prepareSchema(variant as BoardItemType, isPage);

  const uploadHandler = fileUploadHandler();
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const data = await parseFormData(formData, schema, request, boardItem);

  // validate data and throw error if not valid
  const validationResult = await validateFormInAction(data, schema);
  if(validationResult !== true) {
    await cleanup();
    return BadRequestError({ data: validationResult });
  }

  try {
    const dataToInclude: Partial<Record<keyof BoardItem, any>> = {
      name: data.name,
      icon: data.icon || null,
      color: data.color, 
      text: data.text,
    };

    if (variant === BoardItemType.LINK)
      dataToInclude.link = data.link;

    // update item
    // if item is page, update page and item altogether
    // if not, update only item
    if (isPage)
      await pageModel.updateBoardItemPage(
        boardItem.pageId as string,
        data.pageName,
        dataToInclude,
        data.supportedLanguages
      )
    else
      await boardItemModel.update(
        params.id as string,
        dataToInclude,
        data.supportedLanguages
      );

    // if advanced variant, cleanup unused wysiwyg images
    if(boardItem.text) {
      for(const lang of Object.keys(boardItem.text)) {
        await compareContentAndRemoveUnusedImages(boardItem.text[lang], data.text[lang]);
      }
    }

    // redirect to the pages or parent dir
    if (isPage)
      return redirect("/dashboard/admin/pages");
    else
      return redirect("/dashboard/admin/boards/" + boardItem.directoryId);

  } catch (error: any) {
    console.log(error);
    // let errorBoundary handle it
    await cleanup();
    throw error;
  }
};

/********* LOADER *********/
type Loader = BoardItem & { dbData: DbData };
export const loader: LoaderFunction = async ({ request, params }) => {
  // check permissions
  await sessionService.requirePermission(request, PermissionName.adminPagesEdit, "/no-permission");
  
  // try to find the board item
  // if not found, return to boards list
  const boardItem = await boardItemModel.getById(params.id as string, ["page", "supportedLanguages"]) as BoardItem & { page?: Page } & { pageName?: string };
  if (!boardItem)
    return redirect("/dashboard/admin/boards");

  // if it's page, add to boardItem pageName
  if (boardItem.page)
    boardItem.pageName = boardItem.page.name;
  
  // if found, just return nothing
  return { ...boardItem, dbData: await loadDbDataNeededForForm(prepareSchema(boardItem.type, boardItem.pageId !== null)) }
}

/********* COMPONENT *********/
export default function BoardItemEdit() {
  const actionData = useActionData<ActionData>();
  const { dbData, ...boardItem } = useLoaderData<Loader>();
  const isPage = boardItem.pageId !== null;
  const schema = prepareSchema(boardItem.type, isPage);
  
  return (
    <ValidationForm
      collection="boards.items"
      variant="edit"
      schema={schema}
      errors={actionData?.error?.data}
      success={actionData?.success}
      defaultData={boardItem}
      dbData={dbData}
    />
  );
}
