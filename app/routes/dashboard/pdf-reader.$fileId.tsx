import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PDFReader from "~/components/features/PDFReader";
import { globalMiddleware } from "~/middlewares/global.server";
import { boardItemModel } from "~/models/boardItem.server";
import { boardItemFileModel } from "~/models/boardItemFile.server";
import { workshopItemFileModel } from "~/models/workshopItemFile.server";


export const loader: LoaderFunction = async ({ request, params }) => {
  await globalMiddleware({ request, params });

  const fileId = params.fileId as string;
  
  // id can point to a BoardItemFile or a WorkshopItemFile
  // try to find the file in both places
  const file = await boardItemFileModel.getById(fileId) || await workshopItemFileModel.getById(fileId);
  if (!file)
    return redirect("/404");

  return file;
};

export default function PdfReaderPage() {
  const file = useLoaderData();

  return (
    <PDFReader
      url={`/uploads/${file.name}`}
    />
  );
}