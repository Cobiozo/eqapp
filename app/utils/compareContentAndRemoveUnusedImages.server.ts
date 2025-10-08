import removeUploadedFilesLoosely from "./removeUploadedFilesLoosely.server";

const compareContentAndRemoveUnusedImages = (
  oldContent: string,
  newContent: string
) => {

  const getImages = (content: string): string[] => {
    const imgs = content.match(/<img[^>]+src="\/uploads\/([^">]+)"/gm) || [];
    return imgs.map(img => {
      // we can use "as" here, because we use regex that bases on the first one
      // if we found img src="" then, it still has to be present ;)
      return (img.match(/src="([^">]+)"/) as string[])[1]
        .replace("/uploads/", "");
    });
  }

  const oldImages = getImages(oldContent);
  const newImages = getImages(newContent);
  const unusedImages = oldImages.filter(img => !newImages.includes(img));

  return removeUploadedFilesLoosely(unusedImages);
}

export default compareContentAndRemoveUnusedImages;
