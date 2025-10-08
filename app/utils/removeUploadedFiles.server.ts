import fs from "fs";
import path from "path";

export default function removeUploadedFiles(
  files: string[],
) {
  const filesToDelete = [];

  for(const file of files) {
    filesToDelete.push(fs.promises.unlink(
      path.join(process.cwd(), "public", "/uploads", file)
    ));
  }

  return Promise.all(filesToDelete);
}
