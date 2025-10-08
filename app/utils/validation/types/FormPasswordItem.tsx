import { PrimeIcon } from '~/components/ui/Icon';
import FormSchemaBaseItem from './FormSchemaItem.base';

type FormPasswordItem = FormSchemaBaseItem & {
  type: 'password';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  additionalProps?: {
    icon?: PrimeIcon;
    placeholder?: string;
  }
}

export default FormPasswordItem;
