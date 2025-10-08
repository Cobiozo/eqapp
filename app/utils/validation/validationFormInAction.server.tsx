import { NodeOnDiskFile } from "@remix-run/node";
import FormSchema from "./types/FormSchema";
import FormSchemaItem from "./types/FormSchemaItem";
import fs from "fs";
import { isAfter } from "date-fns";
import cleanupWysiwygImages from "../cleanupWysiwygImages.server";

/**
 * It checks if field value type fits to schema type field. For instance, if field type is "text", field value must be a string type.
 * @param fieldValue Field value
 * @param fieldSchema Schema that describes the field
 * @returns true if field value is valid, false otherwise
*/
const validateFieldType = (
  fieldValue: any,
  fieldSchema: FormSchemaItem,
) => {
  const { type } = fieldSchema;

  if (type === "number")
    return typeof fieldValue === "number"

  if (["text", "password", "email", "wysiwyg", "select"].includes(type))
    return typeof fieldValue === "string"

  if (type === "image")
    return fieldValue === null ? true : fieldValue instanceof NodeOnDiskFile

  if (type === "file")
    return fieldValue === null ? true : fieldValue instanceof NodeOnDiskFile

  if (type === "images") {
    return fieldValue.every((file: any) => file instanceof NodeOnDiskFile);
  }

  if (type === "date") {
    return fieldValue instanceof Date;
  }

  if (type === "select") {
    return typeof fieldValue === "string";
  }

  if (type === "DBList") {
    return Array.isArray(fieldValue) && fieldValue.every((item: any) => typeof item === "string");
  }

  return true
}

/**
 * Validates form data against form schema.
 * @param data data object
 * @param schema form schema
 * @returns true if form data is valid, error object otherwise
 */
 export const validateFormInAction = async (
  data: Record<keyof FormSchema, any>,
  schema: FormSchema
): Promise<true | Record<string, string>> => {

  // create errors object
  const errors: Record<string, string> = {}

  // check every field validity
  for(const field of Object.keys(schema)) {

    // get field schema and input value
    const fieldSchema = schema[field];
    const fieldValue = data[field];

    // if field value is empty, but it's not required -> it is valid
    if (!fieldSchema.required && (["", undefined, null].includes(fieldValue) || (Array.isArray(fieldValue) && !fieldValue.length)))
      continue;
    else {

      // if input value is not set, just return error
      // even if field is not required and can be empty, it still should be present
      if (fieldValue === "undefined")
        errors[field] = "common.validation.required";

      // validate field for proper type
      // we have to take in account that request data can be altered by malicious user
      const typeValidationResult = validateFieldType(fieldValue, fieldSchema);
      if (!typeValidationResult) {
        errors[field] = "common.validation.invalidType";
      } else {

        // if everything is okay, run standard validation function (but inform it that we are on the server, it could add extra rules)
        // if it returns errors, return them
        // else -> do nothing
        const validationResult = await fieldSchema.validate(fieldValue, true);

        if(validationResult !== true)
          errors[field] = validationResult;

        // EXTRA: if the field is named passwordRepeat, check if it is equal to password
        if (field === "passwordRepeat") {
          const password = data.password;
          if (password !== fieldValue)
            errors[field] = "common.validation.passwordRepeat";
        }

         // EXTRA: if the field is named emailRepeat, check if it is equal to email
         if (field === "emailRepeat") {
          const email = data.email;
          if (email !== fieldValue)
            errors[field] = "common.validation.emailRepeat";
        }

        // EXTRA: if the field is named endDate and there is also startDate field, check if endDate is after startDate
        if (field === "endDate" && data.startDate) {
          if (!isAfter(fieldValue, data.startDate))
            errors[field] = "common.validation.dateEndTooEarly";
        }

        // Extra: if the field is wysiwyg, check if related files field exists and both have the same images amount
        if (fieldSchema.type === "wysiwyg") {
          if (!data[`${field}_files`])
            errors[field] = "common.validation.wysiwygNoFiles";
          else {
            const files = data[`${field}_files`];
            const originalContent = data[`${field}_unparsed`];
            const imagesInContent = originalContent.match(/<img src="mocked">/gm) || [];
            if (!imagesInContent || imagesInContent.length !== files.length)
              errors[field] = "common.validation.wysiwygImagesAmount";
          }
        }

      }
    }
  }

  // if there are errors
  // 1. if image or file were uploaded, get rid of them first. Also get rid of files related to wysiwyg fields.
  // 2. return errors
  // else
  // -> return true

  if (Object.keys(errors).length > 0) {
    const imageFields = Object.keys(schema).filter(field => ["image", "file"].includes(schema[field].type));
    for (const field of imageFields) {
      // @ts-ignore filePath is treated by TS as private property, but it's not
      if(data[field]) fs.unlinkSync((data[field] as NodeOnDiskFile).filepath);
    }
    cleanupWysiwygImages(data, schema);
    return errors;
  }
  else
    return true;
}
