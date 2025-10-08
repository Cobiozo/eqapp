import path from "path";
import fs from "fs";

const removeUploadedFile = (fileName: string): void => {
  const filePath = path.join(__dirname, "..", "public", "uploads", fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export default removeUploadedFile;
