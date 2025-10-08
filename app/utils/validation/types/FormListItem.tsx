import FormSchemaBaseItem from './FormSchemaItem.base';

type FormListItem = FormSchemaBaseItem & {
  type: 'list';
};

export default FormListItem;
