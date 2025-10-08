import FormSchemaBaseItem from './FormSchemaItem.base';

type FormUnparsedItem = FormSchemaBaseItem & {
  type: 'unparsed';
}

export default FormUnparsedItem;
