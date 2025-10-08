import FormSchemaBaseItem from './FormSchemaItem.base';

type FormImageSelectItem = FormSchemaBaseItem & {
  type: 'imageSelect';
  options: { label: string, value: any, image: string }[];
  searchParamsMode?: boolean;
}

export default FormImageSelectItem;
