import type FormSchemaBaseItem from './FormSchemaItem.base';

type FormDBListItem = FormSchemaBaseItem & {
  type: 'DBSelect';
  model: string;
  optionsConfig: {
    label: (item: any) => string;
    translate?: boolean;
    sort?: (a: any, b: any) => number;
  }
};

export default FormDBListItem;
