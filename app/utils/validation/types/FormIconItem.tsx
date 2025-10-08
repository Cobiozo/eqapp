import FormSchemaBaseItem from './FormSchemaItem.base';

type FormIconItem = FormSchemaBaseItem & {
  type: 'icon';
  options: { label: string, value: any }[];
}

export default FormIconItem;
