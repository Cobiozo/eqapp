/*import type { Webinar } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import SearchResults from "~/components/features/SearchResults";
import WebinarTemplate from "~/components/layout/WebinarTemplate";
import { webinarModel } from "~/models/webinar.server";
import { sessionService } from "~/utils/services/session.server";

interface LoaderData {
  items: Webinar[];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // require permission
  await sessionService.requirePermission(request, "adminWebinarsRead", "/dashboard/admin");
  return await webinarModel.getMany({
    title: {
      equals: params.searchString as string
    }
  });
}

export default function SearchUsers() {
  const items = useLoaderData<LoaderData>();
  const { searchString } = useParams();

  return (
    <SearchResults
      admin={true}
      defaultValue={searchString}
      collection="webinars"
      items={items}
      itemTemplate={(item) => <WebinarTemplate protege={item} />}
      itemsClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6 mx-auto"
    />
  )
}
*/