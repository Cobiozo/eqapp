import { PrimeIcon } from '~/components/ui/Icon';
import FormSchemaBaseItem from './FormSchemaItem.base';

type FormTextItem = FormSchemaBaseItem & {
  type: 'text';
  variant?: 'input' | 'textarea';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  additionalProps?: {
    icon?: PrimeIcon;
    placeholder?: string;
  }
}

export default FormTextItem;
