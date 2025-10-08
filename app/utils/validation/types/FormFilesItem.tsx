import FormSchemaBaseItem from './FormSchemaItem.base';

type FormFilesItem = FormSchemaBaseItem & {
  type: 'files';
  maxSize?: number;
}

export default FormFilesItem;
