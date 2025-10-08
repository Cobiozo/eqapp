import { redirect } from "@remix-run/node";
import type { Params } from "react-router";
import FormSchema from "./validation/types/FormSchema";
import { db } from "~/utils/db.server";

export type DbData = Record<string, []>;

/**
 * Parse schema fields, determines what db data is needed and returns object with this data.
 * @param schema Form schema
 * @returns Object with db data
 */
export const loadDbDataNeededForForm = async (schema: FormSchema) => {
  const dbData: DbData = {};

  for (const schemaField of Object.values(schema)) {
    // if field is a DBList or DBSelect it means data should betaken from db.
    // Which collection?
    // For DBLIst and DBSelect, the one the one that options.collection points to.
    // For WidgetType, it's always must be "widget".
    // So basically data is a string that is the name of the collection or simply array of possible items.
    if (["DBList", "DBSelect", "DBMultiSelect"].includes(schemaField.type)) {
      // @ts-ignore – model is mandatory for DBList and DBSelect fields
      const model = schemaField.model[0].toLowerCase() + schemaField.model.slice(1);
      const options = schemaField.where ? { where: schemaField.where } : {};
      const items = model in db ? await db[model].findMany(options) : [];
      dbData[model] = items;
    }
  }

  return dbData;
}

/**
 * Creates loader for basic data edit page.
 * @param params Request params object (id is used to determine what document should be loaded)
 * @param collection Collection name (it is used do determine url to redirect if error occurs, e.g. /admin/dashboard/posts)
 * @param itemsService Model or service that can be used to load data from db
 * @param schema (optional) Form schema. If given, function will try to check if any of the field needs db data and loads it if needed.
 * @param include (optional) Here you can specify what additional relational fields should be included in checking for defaultData.
 * @returns
 */
export const editPageFormBaseLoader = async (params: Params<string>, collection: string, itemsService: Record<string, any>, schema?: FormSchema, include?: string[]) => {

  // get item data by id from url
  if (!params.id)
    return redirect(`/dashboard/admin/${collection}`);

  const item = await itemsService.getById(params.id, include);
  if(!item)
    return redirect(`/dashboard/admin/${collection}`);

  // get rid of unnecessary params and return important ones
  const { updatedAt, createdAt, ...itemData } = item;

  // also, if schema is provided, load db data needed for form
  return schema
    ? { ...itemData, dbData: await loadDbDataNeededForForm(schema) }
    : itemData;
}

// Create page doesn't need to have info about one specific document, as it's not editing existing one, but..
// it still sometimes need some data from db.
// For instance, when creating promocode, we need to know all products, so we can show them in the form and let user choose it.
// Therefore this loader tries to parse the schema and fetch data that is needed for the form.
export const createPageBaseLoader = async (schema: FormSchema) => {
  return await loadDbDataNeededForForm(schema);
}
