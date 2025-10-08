import FormSchemaBaseItem from './FormSchemaItem.base';

type FormTelItem = FormSchemaBaseItem & {
  type: 'tel';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

export default FormTelItem;
