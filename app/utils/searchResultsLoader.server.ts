import { Params } from "@remix-run/react";

export default async function searchResultsLoader(
  params: Params<string>,
  itemsService: Record<string, any>,
  fieldsToSearch: string[],
  include?: string[],
  where?: Record<string, any>,
  orderBy?: Record<string, any>,
) {
   // get searchString from request
   const { searchString } = params;

  // if searchString is equal "none", return empty array
  if (searchString === "none") return {
    items: [],
  }

  // search items in db
  const items = await itemsService.search(searchString === "all" ? "" : searchString, fieldsToSearch, include, where, orderBy);

  return {
    items,
  };
}
