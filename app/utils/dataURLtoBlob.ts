export default async function dataURLtoBlob(dataUrl: string) {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return blob;
}
