/** Get thumbnail file path */
/* @param path: image path */
/* @returns: thumbnail file path */
const getThumbFileName = (path: string) => {
  const [partOne, ext] = path.split('.');
  return partOne + "_thumb" + "." + ext;
}

export default getThumbFileName;
