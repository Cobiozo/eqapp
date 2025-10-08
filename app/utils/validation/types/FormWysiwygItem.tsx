import FormSchemaBaseItem from './FormSchemaItem.base';

type FormWysiwygItem = FormSchemaBaseItem & {
  type: 'wysiwyg';
  minLength?: number;
  maxLength?: number;
  modules?: any;
  formats?: any;
}

export default FormWysiwygItem;
