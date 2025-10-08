import type FormSchemaBaseItem from './FormSchemaItem.base';

type FormDBMultiSelectItem = FormSchemaBaseItem & {
  type: 'DBMultiSelect';
  model: string;
  optionsConfig: {
    label: (item: any) => string;
    translate?: boolean;
    ignore?: (item: any) => boolean;
    chooseAllByDefault?: boolean;
  }
};

export default FormDBMultiSelectItem
