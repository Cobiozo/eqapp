import FormSchemaBaseItem from './FormSchemaItem.base';

type FormWysiwygMultiLangItem = FormSchemaBaseItem & {
  type: 'wysiwygMultiLang';
  minLength?: number;
  maxLength?: number;
  modules?: any;
  formats?: any;
}

export default FormWysiwygMultiLangItem;
