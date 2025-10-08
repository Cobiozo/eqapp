export default function getOriginalFileName(fileName: string): string {
  return fileName.replace(/^.*-upload-/, "")
}
