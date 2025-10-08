import type FormSchema from "./types/FormSchema";
import type FormSchemaItem from "./types/FormSchemaItem";
import escapeDanger from "./../escapeDanger.server";
import prepareValidateFunc from "./prepareValidateFunc";
import type FormImagesItem from "./types/FormImagesItem";
import { NodeOnDiskFile } from "@remix-run/node";
import config from "~/config";
import type FormListItem from "./types/FormListItem";
import translateService from "../services/translate.server";

/**
 * Parses field values to proper format. It focuses on escaping danger characters, but also converts data to proper types if needed. For instance, type "number" value is transformed to real number.
 * @param fieldId Field id
 * @param fieldValue Field value
 * @param fieldSchema Schema that describes the field
 * @param formData Form data object with all the data
 * @returns Parsed field value
*/
const parseFieldValue = (
  fieldId: string,
  fieldValue: any,
  fieldSchema: FormSchemaItem,
  formData: FormData
) => {

  // escape danger characters
  // there are exceptions though
  // 1. if field is wysiwyg, do nothing with it
  //    wysiwyg is a special field that contains (and should contain) html code
  //    To do: we can trust the admin user to not use dangerous html code, but even tough maybe it would be good to think about restricting tags for use.
  // 2. Image and images are file fields, there's no need to escape them
  // 3. There is also "unparsed" type, which should not be escaped. Fields of that type should be added only on server side.
  let safeValue = ["wysiwyg", "image", "images", "unparsed", "file"].includes(fieldSchema.type)
    ? fieldValue
    : escapeDanger(fieldValue);

  // convert to proper type if needed
  if (fieldSchema.type === 'number')
    return parseInt(safeValue)

  if (fieldSchema.type === 'boolean')
    return safeValue === "on"

  // Remix has a bug, it treats empty file field as... real file.
  // It has no name (we send nothing, so that makes sense), but it exists...
  // Therefore, we do a simple trick. There's no way to have file without filename,
  // so we simply check if filename is empty, and if it is, we return null
  if (fieldSchema.type === "image" && !safeValue.filepath)
    return null
  if (fieldSchema.type === "file" && !safeValue.filepath)
    return null
  if (fieldSchema.type === "images")
    return Array.isArray(safeValue)
      ? safeValue.filter((image: NodeOnDiskFile) => ("filepath" in image))
      : []

  if (['DBMultiSelect', 'list'].includes(fieldSchema.type)) {
    if (typeof safeValue !== "string")
      return [];
    if (!safeValue.length)
      return [];
    return safeValue.split(',')
      .map((item: string) => item.trim());
  }

  if (fieldSchema.type === 'date') {
    return typeof safeValue === "string" ? new Date(safeValue) : new Date();
  }

  // if it's files field, we want to return array of file names
  if (fieldSchema.type === "files") {
    return Array.isArray(safeValue)
      ? safeValue.filter((file: NodeOnDiskFile) => ("filepath" in file))
      : []
  }

  // if it's wysiwyg field, we should replace mocked urls of images with real urls
  if (fieldSchema.type === 'wysiwyg') {

    if (typeof safeValue !== "string")
      return "";

    // find related file field
    const fileField = `${fieldId}_files`;
    const files = formData.getAll(fileField) as NodeOnDiskFile[] || [];

    // if there are no files or something is wrong with them -> just remove mocked images completely
    if (!files || (Array.isArray(files) && files.some(file => !(file instanceof NodeOnDiskFile))))
      return safeValue.replace(/<img src="mocked">/gm, '');

    // if there are files, find mocked <imgs> in the content and replace them with real urls
    const images = safeValue.match(/<img src="mocked">/gm);
    let index = 0;
    if (images) {
      for (const image of images) {
        const file = files[index];

        // if amount of mocked imgs is not equal to amount of files, something is wrong -> just remove mocked images completely
        if (!file)
          return safeValue.replace(/<img src="mocked">/gm, '');

        safeValue = safeValue.replace(image, `<img src="/uploads/${file.name}" alt="${file.name}">`);
        index++;
      }
    }

    return safeValue;
  }

  // if it's multilang text field, we have to gather separate inputs into one object
  if (fieldSchema.type === 'textMultiLang') {
    const languages = config.supportedLanguages;
    const value: Record<string, string> = {};

    for (const lang of languages) {
      const langField = `${fieldId}_ver_${lang}`;
      const langFieldValue = formData.get(langField)
      value[lang] = typeof langFieldValue === "string" ? escapeDanger(langFieldValue) : "";
    }

    return value;
  }

  // if it's multilang wysywig field, we have to gather separate inputs into one object
  // we should also replace mocked urls of images with real urls
  if (fieldSchema.type === 'wysiwygMultiLang') {
    const languages = config.supportedLanguages;
    const value: Record<string, string> = {};

    for (const lang of languages) {
      const langField = `${fieldId}_ver_${lang}`;
      const langFieldValue = formData.get(langField)
      value[lang] = langFieldValue || "";
      
      // lang version can be only a copy of default language
      // if so, we should just replace the content with altered content of the default language
      // but without images to avoid chaos
      const isCopy = formData.get(`${fieldId}_ver_${lang}_isCopy`);
      if (isCopy === "true") {
        continue;
        //value[lang] = value[config.supportedLanguages[0]]
        //continue;
      }

      // if there is no content, we should just skip it
      if (typeof langFieldValue !== "string")
        continue;

      // here we know that there is some content worth to check
      // what's important, it's original content, so we have to check for mocked images
      // and replace them with real urls
      const fileField = `${fieldId}_ver_${lang}_files`;
      const files = formData.getAll(fileField) as NodeOnDiskFile[] || [];

      // if there are no files or something is wrong with them -> just remove mocked images completely
      if (!files || (Array.isArray(files) && files.some(file => !(file instanceof NodeOnDiskFile)))) {
        value[lang] = langFieldValue.replace(/<img src="mocked">/gm, '');
        continue;
      }

      // if there are files, find mocked <imgs> in the content and replace them with real urls
      const images = langFieldValue.match(/<img src="mocked">/gm);

      // if images.length !== files.length, something is wrong -> just remove mocked images completely
      if (!images || images.length !== files.length) {
        value[lang] = langFieldValue.replace(/<img src="mocked">/gm, '');
        continue;
      }

      // if there are files, find mocked <imgs> in the content and replace them with real urls
      let index = 0;
      for (const image of images) {
        const file = files[index];
        
        value[lang] = value[lang].replace(image, `<img src="/uploads/${file.name}" alt="${file.name}">`);
        index++;
      }

    }

    return value;
  }

  return safeValue
}

/**
 * Parses form data fields to standard object. It focuses on escaping danger characters, but also converts data to proper types if needed. For instance, input type "number" value is transformed to real number.
 * @param formData Form data object
 * @param schema Form schema
 * @returns Parsed data object
 */
const parseFormData = async (
  formData: FormData,
  schema: FormSchema,
  request: Request,
  editedRecord: Record<string, any> | null = null
): Promise<Record<keyof FormSchema, any>> => {

  const parsedData: Record<keyof FormSchema, any> = {}

  // FOR WYSIWYG FIELDS

  // 1. when using wysiwyg field, there should always be an additional field with possible files
  // it can be empty (if no images used) or it contain files
  // it isn't set in the schema, but it exists and should be properly parsed
  // therefore, we should check for wysiwyg fields and add their file fields to schema as well.

  // 2. While parsing wysiwyg content, we replace mocked img urls with urls of uploaded images.
  // That's good, but with that we have a problem with validation.
  // We want to validate if files amount is equal to amount of mocked imgs in the content
  // but how can we know how many of imgs were really mocked if all we see are just links?
  // For instance, if it's edit phase, we don't know if `test.jpg` is a file that was uploaded before or now.
  // We don't know  if we should count it or not.
  // Therefore, before parsing we add a copy of original content.
  // Thanks to that, even tough original field is properly parse, we still have an access to unparsed version.
  for(const field of Object.keys(schema)) {
    if (schema[field].type === 'wysiwyg') {

      const { maxHeight, maxWidth } = config.wysiwyg;

      const baseSchemaData: Omit<FormImagesItem, "validate"> = {
        type: "images",
        size: {
          maxWidth,
          maxHeight
        },
        accept: ['image/png', 'image/jpeg'],
        maxSize: 5 * 1024 * 1024,
      };

      schema[`${field}_files`] = {
        ...baseSchemaData,
        validate: prepareValidateFunc(baseSchemaData)
      }

      // create a copy field of original content for validation purposes
      formData.append(
        `${field}_unparsed`,
        formData.get(field) as FormDataEntryValue
      );

      schema[`${field}_unparsed`] = {
        type: "unparsed",
        validate: async () => { return true }
      };
    }
  }

  // FOR FILE FIELDS
  // 1. When using file or image fields while editing, there must be possibility to not only choose new file when editing, but also to remove current one and set it to blank if the field is not required.
  // On the client it's quite easy to achieve and we can easily clear the field itself.
  // On the server however, we don't now if null means that current file was removed or that simply we don't want new file. Of course we could check db, but that seems too much hustle.
  // Therefore there is always a possible additional field that indicates if null should mean "remove the current file". This field is called "fieldName_shouldRemove". Schema doesn't contain this field, but it can exist and should be properly parsed.

  for(const field of Object.keys(schema)) {
    if (["file", "image"].includes(schema[field].type)) {
      schema[`${field}_shouldRemove`] = {
        type: "boolean",
        validate: async () => { return true }
      },
      schema[`${field}_cropArea_x`] = {
        type: "number",
        validate: async () => { return true }
      },
      schema[`${field}_cropArea_y`] = {
        type: "number",
        validate: async () => { return true }
      },
      schema[`${field}_cropArea_width`] = {
        type: "number",
        validate: async () => { return true }
      },
      schema[`${field}_cropArea_height`] = {
        type: "number",
        validate: async () => { return true }
      }
    }
  }

  // FOR FILES FIELDS

  // When using files field, there should always be an additional field with list of the files state
  // Why? Files field tells us only what files are uploaded.
  // It's enough when we create new record. We simply upload these files and that's it.
  // However, when editing, we have to take into account, that user can add new files but also remove some of the old ones.
  // Files field doesn't tell us anything about that. It only tells us what new files are uploaded.
  // Therefore alongside the files field there is always additional field that tells us what files should we have after the update.
  // Thanks to that we can check if there are any files that was present before but now should be removed.

  // This special field it isn't set in the schema, but it exists and should be properly parsed
  // therefore, we should check for files fields and add their file fields to schema as well.

  for(const field of Object.keys(schema)) {
    if (schema[field].type === 'files') {

      const baseSchemaData: Omit<FormListItem, "validate"> = {
        type: "list",
      };

      schema[`${field}_summary`] = {
        ...baseSchemaData,
        validate: prepareValidateFunc(baseSchemaData)
      }
    }
  }

  // FOR MULTILANG TEXT FIELDS
  // if there is no editedRecord, we are in create mode
  // so, copy present lang version to other langs
  // if there is editedRecord, we are in edit mode
  // so, copy current content of other langs from editedRecord
  for(const field of Object.keys(schema)) {
    if (schema[field].type === 'textMultiLang') {
      const languages = config.supportedLanguages;
      const currentLang = await translateService.getCurrentLang(request);
      const valueDefault = formData.get(`${field}_ver_` + currentLang);

      if (valueDefault) {
        for (const lang of languages) {
          if (lang === currentLang)
            continue;
          if (editedRecord)
            formData.set(`${field}_ver_${lang}`, editedRecord[field][lang] || "");
          else
            formData.set(`${field}_ver_${lang}`, valueDefault);
        }
      }
    }
  }

  // FOR MULTILANG WYSIWYG FIELDS
  // if there is no editedRecord, we are in create mode
  // so, copy present lang version to other langs (but without images)
  // if there is editedRecord, we are in edit mode
  // so, copy current content of other langs from editedRecord
  for(const field of Object.keys(schema)) {
    if (schema[field].type === 'wysiwygMultiLang') {
      const languages = config.supportedLanguages;
      const currentLang = await translateService.getCurrentLang(request);
      const valueDefault = formData.get(`${field}_ver_` + currentLang);

      if (valueDefault) {
        for (const lang of languages) {
          if (lang === currentLang)
            continue;
          if (editedRecord)
            formData.set(`${field}_ver_${lang}`, editedRecord[field][lang] || "");
          else {
            formData.set(`${field}_ver_${lang}`, valueDefault.replace(/<img src="mocked">/gm, ''));
            formData.set(`${field}_ver_${lang}_isCopy`, "true");
          }
        }
      }
    }
  }

  // check every field validity
  for(const field of Object.keys(schema)) {

    // get field schema and input value
    const fieldSchema = schema[field];
    const fieldValue = ["images", "files"].includes(fieldSchema.type)
      ? formData.getAll(field) || []
      : formData.get(field);

    // parse field values to proper format
    parsedData[field] = parseFieldValue(field, fieldValue, fieldSchema, formData);
  }

  return parsedData;
}

export default parseFormData;
