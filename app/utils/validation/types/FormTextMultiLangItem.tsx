import FormSchemaBaseItem from './FormSchemaItem.base';

type FormTextMultiLangItem = FormSchemaBaseItem & {
  type: "textMultiLang";
  variant?: 'input' | 'textarea';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  additionalProps?: {
    placeholder?: string;
  }
}

export default FormTextMultiLangItem;
