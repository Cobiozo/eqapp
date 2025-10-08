import { NodeOnDiskFile } from '@remix-run/node';
import sizeOf from 'image-size';

type Size = {
  width: number,
  height: number,
}

type SizeOptions = {
  minWidth?: number,
  maxWidth?: number,
  minHeight?: number,
  maxHeight?: number,
  width?: number,
  height?: number,
  aspectRatio?: number,
}

const validateImageSize = (
  file: NodeOnDiskFile,
  size: SizeOptions
): boolean => {

  // get image size
  // we can be sure the filepath is okay, because file upload is already handled by this point
  // @ts-ignore TS informs that filepath is a private field, but strangely it is not, we can access it
  const imageSize = sizeOf(file.filepath) as Size;
  if(!imageSize) return false;

  // if there is fixed size, check if image is exactly given size
  // exactly but with a little bit of tolerance, because of rounding imperfections
  if(size.width && size.height) {
    return (
      imageSize.width > (size.width - 2) &&
      imageSize.width < (size.width + 2) &&
      imageSize.height > (size.height - 2) &&
      imageSize.height < (size.height + 2)
    );
  }

  //if not, check for min and max values
  if(size.minWidth && imageSize.width < size.minWidth)
    return false;
  if(size.maxWidth && imageSize.width > size.maxWidth)
    return false;
  if(size.minHeight && imageSize.height < size.minHeight)
    return false;
  if(size.maxHeight && imageSize.height > size.maxHeight)
    return false;

  // check aspect ratio as well (with little tolerance)
  if(size.aspectRatio) {
    const aspectRatio = imageSize.width / imageSize.height;
    if(aspectRatio < size.aspectRatio - 0.1 || aspectRatio > size.aspectRatio + 0.1)
      return false;
  }

  return true;
}

export default validateImageSize;
