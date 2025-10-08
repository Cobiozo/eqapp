import type { UploadHandler } from "@remix-run/node";
import { unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler } from "@remix-run/node";
import config from "~/config";
import randomString from "./randomString";

const fileUploadHandler = (): UploadHandler => {
  return unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: config.files.defaultMaxSize,
      directory: config.files.uploadDir,
      file: (args) => `${randomString(10)}-upload-${args.filename}`
    }),
    unstable_createMemoryUploadHandler(),
  )
}

export default fileUploadHandler;
