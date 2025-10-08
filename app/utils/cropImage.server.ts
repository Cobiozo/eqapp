import Jimp from "jimp";
import path from "path";

export default async function cropImage(
  fileName: string,
  cropArea: {
    x: number,
    y: number,
    width: number,
    height: number,
  },
  desiredW: number,
  desiredH: number,
  quality: number = 80
) {

  try {
    const filePath = path.join(__dirname, "..", "public", "uploads", fileName);
    const fileNameAfterCrop = `${fileName.split(".")[0]}.jpg`;
    const filePathAfterCrop = path.join(__dirname, "..", "public", "uploads", fileNameAfterCrop);
    
    const img = await Jimp.read(filePath);
    const { x, y, width, height } = cropArea;
    img
      .crop(x, y, width, height)  
      .resize(desiredW, desiredH) // resize
      .quality(quality) // set JPEG quality
      .write(filePathAfterCrop); // save

    return fileNameAfterCrop;
  } catch (error) {
    throw new Error(error);
  }

}