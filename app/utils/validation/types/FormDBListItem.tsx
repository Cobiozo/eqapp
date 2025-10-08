import FormSchemaBaseItem from './FormSchemaItem.base';

type FormDBListItem = FormSchemaBaseItem & {
  type: 'DBList';
  collection: string;
  additionalProps?: {
    description?: string;
  }
};

export default FormDBListItem;
