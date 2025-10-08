import FormDateItem from "./FormDateItem";
import FormDBListItem from "./FormDBListItem";
import FormEmailItem from "./FormEmailItem";
import FormImageItem from "./FormImageItem";
import FormNumberItem from "./FormNumberItem";
import FormPasswordItem from "./FormPasswordItem";
import FormSchemaItem from "./FormSchemaItem";
import FormSelectItem from "./FormSelectItem";
import FormTextItem from "./FormTextItem";
import FormWysiwygItem from "./FormWysiwygItem";
import FormImagesItem from "./FormImagesItem";
import FormImageSelectItem from "./FormImageSelectItem";
import FormDBSelectItem from "./FormDBSelectItem";
import FormWidgetTypeItem from "./FormWidgetTypeItem";
import FormFileItem from "./FormFileItem";
import FormBooleanItem from "./FormBooleanItem";
import FormListItem from "./FormListItem";
import FormFilesItem from "./FormFilesItem";
import FormTextMultiLangItem from "./FormTextMultiLangItem";
import FormWysiwygMultiLangItem from "./FormWysiwygMultiLangItem";
import FormTelItem from "./FormTelItem";
import FormIconItem from "./FormIconItem";
import FormDBMultiSelectItem from "./FormDBMultiSelectItem";

// Component gets all the info about the field from schema, but with two changes
// – params from additionalProps obj (if exists) are extracted to standalone props
// – component gets additional props: name with schema key and (potentially) defaultValue with defaultValue
type FormFieldProps<T extends FormSchemaItem, D> = Omit<T, "additionalProps"> & T["additionalProps"] & { name: string, defaultValue?: D }

type FormFields = {
  text: FormFieldProps<FormTextItem, string>;
  number: FormFieldProps<FormNumberItem, number>;
  date: FormFieldProps<FormDateItem, Date>;
  email: FormFieldProps<FormEmailItem, string>;
  DBList: FormFieldProps<FormDBListItem, []>;
  image: FormFieldProps<FormImageItem, string>;
  password: FormFieldProps<FormPasswordItem, string>;
  select: FormFieldProps<FormSelectItem, string>;
  wysiwyg: FormFieldProps<FormWysiwygItem, string>;
  images: FormFieldProps<FormImagesItem, string[]>;
  imageSelect: FormFieldProps<FormImageSelectItem, string>;
  DBSelect: FormFieldProps<FormDBSelectItem, string>;
  widgetType: FormFieldProps<FormWidgetTypeItem, string>;
  file: FormFieldProps<FormFileItem, string>;
  boolean: FormFieldProps<FormBooleanItem, boolean>;
  list: FormFieldProps<FormListItem, string[]>;
  files: FormFieldProps<FormFilesItem, string[]>;
  textMultiLang: FormFieldProps<FormTextMultiLangItem, string>;
  wysiwygMultiLang: FormFieldProps<FormWysiwygMultiLangItem, string>;
  tel: FormFieldProps<FormTelItem, string>;
  icon: FormFieldProps<FormIconItem, string>;
  DBMultiSelect: FormFieldProps<FormDBMultiSelectItem, string[]>;
}

export default FormFields;
