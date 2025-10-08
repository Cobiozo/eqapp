import { NodeOnDiskFile } from "@remix-run/node";
import fs from "fs";

/**
 * Checks if file size is bigger than maxSize
 * @param validateFileSize
 * @returns true if file size is bigger than maxSize, false otherwise
 */
export default function validateFileSize(
  file: File,
  maxSize: number
): boolean {
  let fileSize = 0;
  if (file instanceof File)
    fileSize = file.size;
  else {
    const stats = fs.statSync((file as NodeOnDiskFile).filepath)
    fileSize = stats.size;
  }

  return maxSize > fileSize;
}
