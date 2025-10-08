import FormSchemaBaseItem from './FormSchemaItem.base';

type FormSelectItem = FormSchemaBaseItem & {
  type: 'select';
  options: { label: string, value: any }[];
  emitSearchParam?: boolean;
}

export default FormSelectItem;
