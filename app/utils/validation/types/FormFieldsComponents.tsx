import FormFields from "./FormFields";

type FormFieldComponents = {
  text: React.FC<FormFields["text"]>;
  number: React.FC<FormFields["number"]>;
  date: React.FC<FormFields["date"]>;
  email: React.FC<FormFields["email"]>;
  DBList: React.FC<FormFields["DBList"]>;
  image: React.FC<FormFields["image"]>;
  password: React.FC<FormFields["password"]>;
  select: React.FC<FormFields["select"]>;
  wysiwyg: React.FC<FormFields["wysiwyg"]>;
  images: React.FC<FormFields["images"]>;
  imageSelect: React.FC<FormFields["imageSelect"]>;
  DBSelect: React.FC<FormFields["DBSelect"]>;
  widgetType: React.FC<FormFields["widgetType"]>;
  file: React.FC<FormFields["file"]>;
  boolean: React.FC<FormFields["boolean"]>;
  list: React.FC<FormFields["list"]>;
  files: React.FC<FormFields["files"]>;
  textMultiLang: React.FC<FormFields["textMultiLang"]>;
  wysiwygMultiLang: React.FC<FormFields["wysiwygMultiLang"]>;
  tel: React.FC<FormFields["tel"]>;
  icon: React.FC<FormFields["icon"]>;
  DBMultiSelect: React.FC<FormFields["DBMultiSelect"]>;
}

export default FormFieldComponents;
