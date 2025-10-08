import type { LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PDFReader from "~/components/features/PDFReader";
import { boardItemModel } from "~/models/boardItem.server";
import { workshopItemFileModel } from "~/models/workshopItemFile.server";


export const loader: LoaderFunction = async ({ params }) => {
  const fileId = params.fileId as string;
  
  // id can point to a BoardItemFile or a WorkshopItemFile
  // try to find the file in both places
  const file = await boardItemModel.getById(fileId) || await workshopItemFileModel.getById(fileId) || await fileModel.getById(fileId);
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