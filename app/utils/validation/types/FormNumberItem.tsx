import FormSchemaBaseItem from './FormSchemaItem.base';

type FormNumberItem = FormSchemaBaseItem & {
  type: 'number';
  min?: number;
  max?: number;
  maxLength?: number;
  minLength?: number;
  variant?: 'integer'
}

export default FormNumberItem;
