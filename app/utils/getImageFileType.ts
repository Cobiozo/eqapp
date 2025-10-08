/** Gets file or path to file and returns image type according the file contents. */
/* @param image – file (only on client) or path (only on server) */

import { NodeOnDiskFile } from "@remix-run/node";
import fs from "fs";

/* @returns – image type or unknown */
const getImageFileType = async (image: File | NodeOnDiskFile) => {

  // Determine header bytes
  const determineHeader = () => new Promise((resolve, reject) => {

    // if image is a NodeOnDiskFile, it means we are on the server
    // therefore we cannot use FileReader, but we can get the file contents by readFileSync
    if (!(image instanceof File)) {
      // @ts-ignore TS informs that filepath is a private field, but strangely it is not, we can access it
      const file = fs.readFileSync(image.filepath, null).buffer;
      const arr = (new Uint8Array(file)).subarray(0, 4);
      const header = arr.reduce((result, byte) => result + byte.toString(16), '');
      resolve(header);
    } else {
      const fileReader = new FileReader();

      fileReader.onloadend = (e) => {
        const arr = (new Uint8Array(e.target?.result as ArrayBuffer)).subarray(0, 4);
        const header = arr.reduce((result, byte) => result + byte.toString(16), '');
        resolve(header);
      }
      fileReader.onerror = (e) =>
        reject(e.target?.error?.code);

      fileReader.readAsArrayBuffer(image);
    }

  });

  try {
    const header = await determineHeader()

    switch(header) {
      case '52494646':
        return 'image/webp';
      case '89504e47':
        return 'image/png';
      case '47494638':
        return "image/gif";
      case 'ffd8ffe0':
      case 'ffd8ffe1':
      case 'ffd8ffe2':
      case 'ffd8ffe3':
      case 'ffd8ffe8':
        return 'image/jpeg';
      default:
        return 'unknown';
    }
  } catch(err) {
    return 'unknown';
  }
}

export default getImageFileType;
