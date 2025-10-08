import { redirect } from "@remix-run/node";

export type PaginatedLoader<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
}

export default async function paginatedDataLoader(
  request: Request,
  collection: string,
  itemsService: Record<string, any>,
  include?: string[],
  where?: Record<string, any>,
  orderBy?: Record<string, any>,
) {

  // get selected page number from url
  const url = new URL(request.url);
  const pageParamValue = url.searchParams.get("page");
  const page = pageParamValue ? parseInt(pageParamValue) : 1;

  // if page number is not a number, redirect to first page
  // if page is lower than 1, redirect to first page
  if (isNaN(page) || page < 1)
    return redirect(`/dashboard/admin/${collection}?page=1`);

   const items = await itemsService.getByPage(page, 10, include, where, orderBy);

   const totalItemsCount = await itemsService.getTotalCount(where);
   const totalPages = Math.ceil(totalItemsCount / 10) || 1;

  // if page number is higher than total pages, redirect to last page
  if (page > totalPages)
    return redirect(`/dashboard/admin/${collection}?page=${totalPages}`);

  return {
    items,
    currentPage: page,
    totalPages: totalPages
  };
}
