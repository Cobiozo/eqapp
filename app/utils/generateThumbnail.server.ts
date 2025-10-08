import { NodeOnDiskFile } from '@remix-run/node';
import Jimp from 'jimp';
import { BadRequestError } from './errors/BadRequest.server';
import getThumbFileName from './getThumbFileName';

interface ThumbnailOptions {
  width: number,
  height: number
}

const generateThumbnail = async (
  file: NodeOnDiskFile,
  options: ThumbnailOptions
) => {

  try {
    const { width, height } = options;
    // @ts-ignore TS informs that filepath is a private field, but strangely it is not, we can access it
    const image = await Jimp.read(file.filepath);
    image.resize(width, height);
    // @ts-ignore TS informs that filepath is a private field, but strangely it is not, we can access it
    image.write(getThumbFileName(file.filepath));
  } catch (error) {
    throw BadRequestError(`Invalid image size, couldn't create thumbnail`)
  }

}

export default generateThumbnail
