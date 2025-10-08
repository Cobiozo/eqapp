import FormSchemaBaseItem from './FormSchemaItem.base';

type FormDateItem = FormSchemaBaseItem & {
  type: 'date';
  min?: Date;
  max?: Date;
}

export default FormDateItem;
