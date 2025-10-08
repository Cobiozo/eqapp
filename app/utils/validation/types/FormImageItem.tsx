import FormSchemaBaseItem from './FormSchemaItem.base';
import ImageSizeOptions from './ImageSizeOptions';

type FormImageItem = FormSchemaBaseItem & {
  type: 'image';
  thumb?: {
    width: number;
    height: number;
  };
  size?: {
    aspectRatio?: number;
  } & ImageSizeOptions,
  accept?: ('image/png' | 'image/jpeg' | 'image/webp')[];
  maxSize?: number;
}

export default FormImageItem;
