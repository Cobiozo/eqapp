import prepareValidateFunc from "./prepareValidateFunc";
import FormSchema from "./types/FormSchema";
import FormSchemaItem from "./types/FormSchemaItem";
import UnparsedFormSchema from "./types/UnparsedFormSchema";

/**
 * Get data schema and returns FormSchema with validate func for each field
 * @param schema Data shape and options
 * returns FormSchema
*/
const createFormSchema = (
  schema: UnparsedFormSchema
): FormSchema => {
  const preparedSchema: FormSchema = {};

  for (const key in schema) {
    const item = schema[key];
    preparedSchema[key] = {
      ...item,
      validate: prepareValidateFunc(item)
    } as FormSchemaItem
  }

  return preparedSchema
}

export default createFormSchema;
