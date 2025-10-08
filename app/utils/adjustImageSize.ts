/** Adjusts image size do fit in the given range. If the image is bigger than the range, it will be resized, but it will keep the aspect ratio.
 * @param {string} imageUrl - image dataURL
 * @param {number} maxWidth - maximum width
 * @param {number} maxHeight - maximum height
*/
export default function adjustImageSizeToConstraints(
  image: string,
  maxWidth: number,
  maxHeight: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {

      if (maxWidth < 0 || maxHeight < 0)
        throw new Error('Width and height must be positive');

      const img = new Image();
      img.onload = () => {

        // get the real size of the image
        const realWidth = img.naturalWidth;
        const realHeight = img.naturalHeight;

        // if height and width are in the allowed range, just return the image
        if (realHeight <= maxHeight && realWidth <= maxWidth)
          return resolve(image);

        // it's time for determine new size! Let's start at 0 0 ;)
        let desiredH = 0;
        let desiredW = 0;

        // if height is too big, but width is okay, adjust height and change the width accordingly to keep aspect ratio
        if (realHeight > maxHeight && realWidth <= maxWidth) {
          desiredH = maxHeight;
          desiredW = Math.round(realWidth * (desiredH / realHeight));
        }

        // if width is too big, but height is okay, adjust width and change the height accordingly to keep aspect ratio
        if (realWidth > maxWidth && realHeight <= maxHeight) {
          desiredW = maxWidth;
          desiredH = Math.round(realHeight * (desiredW / realWidth));
        }

        // if both width and height are too big, adjust this one that has bigger difference and then change the other to keep aspect ratio
        if (realWidth > maxWidth && realHeight > maxHeight) {
          const diffW = Math.abs(realWidth / maxWidth);
          const diffH = Math.abs(realHeight / maxHeight);
          if (diffW > diffH) {
            desiredW = maxWidth;
            desiredH = Math.round(realHeight * (desiredW / realWidth));
          } else {
            desiredH = maxHeight;
            desiredW = Math.round(realWidth * (desiredH / realHeight));
          }
        }

        // create new version image with new size
        const canvas = document.createElement('canvas');
        canvas.width = desiredW;
        canvas.height = desiredH;

        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(img, 0, 0, desiredW, desiredH);

        // return new adjusted version of dataURL image
        canvas.toBlob(
          () => {
            resolve(canvas.toDataURL())
          },
          'image/jpeg',
          0.9
        );

      }

      img.src = image
    } catch (e) {
      reject(e);
    }
  });

}
