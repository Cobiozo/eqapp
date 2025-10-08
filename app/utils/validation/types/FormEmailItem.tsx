import { PrimeIcon } from '~/components/ui/Icon';
import FormSchemaBaseItem from './FormSchemaItem.base';

type FormEmailItem = FormSchemaBaseItem & {
  type: 'email';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  additionalProps?: {
    icon?: PrimeIcon;
    placeholder?: string;
  }
}

export default FormEmailItem;
