export default function validateFileType(file: File, accept: string[]): boolean {
  const fileType = file.type;
  return accept.includes(fileType);
}
