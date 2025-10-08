import FormSchemaBaseItem from './FormSchemaItem.base';

type FormBooleanItem = FormSchemaBaseItem & {
  type: 'boolean';
  description?: string;
}

export default FormBooleanItem;
