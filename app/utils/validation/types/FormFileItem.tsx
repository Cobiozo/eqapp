import FormSchemaBaseItem from './FormSchemaItem.base';

type FormFileItem = FormSchemaBaseItem & {
  type: 'file';
  accept?: ('image/png' | 'image/jpeg' | 'image/gif' | 'video/mp4')[];
  maxSize?: number;
}

export default FormFileItem;
