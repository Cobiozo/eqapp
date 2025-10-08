import fs from "fs";
import path from "path";

export default function removeUploadedFilesLoosely(
  files: string[],
) {
  const filesToDelete = [];

  try {
    for(const file of files) {
      filesToDelete.push(fs.promises.unlink(
        path.join(process.cwd(), "public", "/uploads", file)
      ));
    }
  } catch (e) {
    // don't panic
    // it's function responsibility is to remove files if there exist
    // but they don't have to
    // if they don't, just get Node error info and ignore it
  }

  return Promise.all(filesToDelete);
}
