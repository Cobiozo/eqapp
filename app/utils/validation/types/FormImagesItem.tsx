import FormSchemaBaseItem from './FormSchemaItem.base';
import ImageSizeOptions from './ImageSizeOptions';

type FormImagesItem = FormSchemaBaseItem & {
  type: 'images';
  thumb?: {
    width: number;
    height: number;
  };
  size?: {
    aspectRatio?: number;
  } & ImageSizeOptions,
  accept?: ('image/png' | 'image/jpeg')[];
  maxSize?: number;
  minLength?: number;
  maxLength?: number;
}

export default FormImagesItem;
