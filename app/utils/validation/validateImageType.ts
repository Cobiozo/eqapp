type ImageMimeType = 'image/png' | 'image/jpeg' | 'image/gif' | 'image/ief' | 'image/tiff' | 'image/tiff'
import getImageFileType from '../getImageFileType'

export default async (
  imageFile: File, accept: ImageMimeType[]
): Promise<boolean> => {

  // get ext from file name
  let ext = 'image/' + imageFile.name.split('.').pop()?.toLowerCase();
  
  // if ext is jpg, change it to jpeg
  if (ext === 'image/jpg') ext = 'image/jpeg';

  return accept.includes(ext);
}
