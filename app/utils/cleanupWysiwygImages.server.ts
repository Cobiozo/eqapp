import { NodeOnDiskFile } from "@remix-run/node";
import fs from "fs";
import path from "path";
import FormSchema from "./validation/types/FormSchema";
import removeUploadedFilesLoosely from "./removeUploadedFilesLoosely.server";

/**
 * Searches for wysiwyg fields and removes related images.
 * @param data data object
 * @param schema form schema
 */
function cleanupWysiwygImages(
  data: Record<string | number, any>,
  schema: FormSchema
): void;
function cleanupWysiwygImages(
  data: string
): void;
function cleanupWysiwygImages(
  data: Record<string | number, any> | string,
  schema?: FormSchema
): void {

  // if data is just a post content, we should check it for used images and remove them
  if (typeof data === 'string' && !schema) {
    const images = data.match(/<img src="\/uploads\/[^>]*>/gm);

    if (images) {
      const filesToDelete: string[] = [];

      images.forEach(image => {
        const imageSrc = image.match(/src="([^"]*)"/);
        if (imageSrc) {
          const imageName = imageSrc[0]
            .replace(/src="|"/gm, "")
            .replace("/uploads/", "");

          filesToDelete.push(imageName);
        }
      });

      removeUploadedFilesLoosely(filesToDelete).catch(err => {
        console.error(err);
      });
    }

    return;
  }

  // if there's more than that and we received a whole schema, we should check all the wysiwyg fields for used images and remove them
  if (schema && typeof data === "object") {
    const fields = Object.keys(data);
    const filesToDelete: Promise<void>[] = [];

    for (const field of fields) {
      if (schema[field] && schema[field].type === 'wysiwyg') {
        const relatedFiles = data[`${field}_files`] as NodeOnDiskFile[];
        for (const file of relatedFiles) {
          filesToDelete.push(fs.promises.unlink((file.filepath)));
        }
      }
    }

    if (filesToDelete.length) {
      Promise.all(filesToDelete).catch(err => {
        console.error(err);
      });
    }

  }

}

export default cleanupWysiwygImages;
