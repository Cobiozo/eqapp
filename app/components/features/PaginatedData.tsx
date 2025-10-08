import { useMemo } from "react";
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaArrowUp, FaPencilAlt, FaSearch, FaTimes } from "react-icons/fa";
import Alert from "~/components/ui/Alert";
import Button from "~/components/ui/Button";
import { GlobalContext } from "~/root";
import { useEffect, useContext, useState } from "react";
import { useLocation } from "@remix-run/react";
import InputField from "../ui/InputField";
import Animated from "../ui/Animated";
import clsx from "clsx";

type Props = {
  items: any[];
  currentPage: number;
  totalPages: number;
  collection: string;
  itemTemplate: (item: any) => JSX.Element;
  editUrl?: string;
  searchUrl?: string;
  editBtn?: boolean;
  removeBtn?: boolean;
  itemsClassName?: string;
  itemClassName?: string;
  admin?: boolean;
  searchPanel?: boolean;
  additionalButtonsBefore?: (item: any) => JSX.Element;
}

export default function PaginatedData({ items, currentPage, totalPages, collection, itemTemplate, editUrl, editBtn = false, removeBtn = false, itemsClassName, itemClassName, admin = true, searchUrl, searchPanel = true, additionalButtonsBefore }: Props) {
  const { t } = useContext(GlobalContext);
  const location = useLocation();
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (location.search.includes("page") || location.search.includes("search")) {
      const html = document.documentElement;
      const body = document.body;
      const height = Math.max( body.scrollHeight, body.offsetHeight,
                            html.clientHeight, html.scrollHeight, html.offsetHeight );
      window.scrollTo({ top: height });
    }
  }, [location]);

  const pagination = useMemo(() => {
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;

    const pagination = {
      previous: {
        active: previousPage > 0,
        link: admin 
          ? `/dashboard/admin/${collection}/?page=${previousPage}`
          : `/dashboard/${collection}/?page=${previousPage}`
      },
      next: {
        active: nextPage <= totalPages,
        link: admin
          ? `/dashboard/admin/${collection}/?page=${nextPage}`
          : `/dashboard/${collection}/?page=${nextPage}`
      }
    }

    return pagination;
  }, [currentPage, totalPages]);

  const pagesBetween = useMemo(() => {

    // if pages are less than 10, return all pages links
    if(totalPages < 10)
      return [...Array(totalPages).keys()].map(page => page + 1);

    // if it's more than 10 pages, return pages between current page and next page (3 each side)
    const start = currentPage - 3;
    const end = currentPage + 3;
    const pages = [];

    for (let i = start; i <= currentPage; i++) {
      if (i > 0)
        pages.push(i);
    }

    for (let i = currentPage + 1; i <= end; i++) {
      if(i <= totalPages)
        pages.push(i);
    }

    // add `...` if there are more pages at the the side beyond the limit
    if (start > 1)
      pages.unshift("...");

    if (end < totalPages)
      pages.push("...");

    return pages;
  }, [currentPage, totalPages]);

  const preparedSearchUrl = useMemo(() => {
    if (searchUrl)
      return searchUrl.replace("$searchString", searchString);
    else if (admin)
      return `/dashboard/admin/${collection}/search/${searchString}`;
     else
    return `/dashboard/${collection}/search/${searchString}`;
  }, [searchUrl, searchString]);

  // if no data -> show alert
  if (!items || !items.length)
    return (
      <Alert title={t("common.noData")} variant="info" className="mx-auto">
        {t("common.noDataDesc")}
      </Alert>
    )

  // if there is data -> show it
  return (
    <div>
      { searchPanel && (
        <div className="flex gap-4 justify-center items-end">
          <InputField
            type="text"
            name="search"
            placeholder={t("common.search")}
            onChange={setSearchString}
          />
          <Button
            disabled={!searchString}
            size="sm"
            icon={FaSearch}
            to={preparedSearchUrl}
          />
        </div>
      )}
      <Animated animation="fadeIn">
        <ul className={itemsClassName}>
          {items.map((item) => (
            <li key={item.id}>
              <div className={clsx("flex flex-col items-center group md:flex-row", itemClassName)}>
                <div className="grow w-full">
                  {itemTemplate(item)}
                </div>
                <div className="flex">
                  { additionalButtonsBefore && additionalButtonsBefore(item) }
                  { "priority" in item && (
                    <>
                      <Button
                        method="patch"
                        resourceId={item.id}
                        icon={FaArrowUp}
                        className="mr-2 w-8"
                        additionalData={{"priority": "up"}}
                      />
                    <Button
                        method="patch"
                        resourceId={item.id}
                        additionalData={{"priority": "down"}}
                        icon={FaArrowDown}
                        className="mr-2 w-8"
                      />
                    </>
                  )}
                  { editBtn && (
                    <Button
                      to={editUrl ? editUrl.replace('$itemId', item.id): `/dashboard/admin/${collection}/edit/${item.id}`}
                      icon={FaPencilAlt}
                      variant="success"
                      className="mr-2"
                      size="sm"
                    >
                      {t('common.edit')}
                    </Button>
                  )}
                  { removeBtn && (
                    <Button
                      to={`/dashboard/admin/${collection}/remove/${item.id}`}
                      variant="danger"
                      icon={FaTimes}
                      size="sm"
                    >
                      {t('common.remove')}
                    </Button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Animated>
      <div className="w-fit mx-auto">
        {totalPages > 1 && (
          <ul className="flex items-center my-8 animated fadeIn">
            <li>
              <Button
                to={pagination.previous.link}
                variant="default"
                disabled={!pagination.previous.active}
                className="mr-2"
              >
                <FaArrowLeft />
              </Button>
            </li>
            {pagesBetween.map((page, index) => {
              if (page === "...")
                return (<li className="px-2" key={page + index}>...</li>)
              else
                return (
                  <li key={page}>
                    <Button
                      to={ admin 
                        ? `/dashboard/admin/${collection}/?page=${page}`
                        : `/dashboard/${collection}/?page=${page}`
                      }
                      variant={page === currentPage ? "primary" : "default"}
                      size="sm"
                      className="w-10 mx-1"
                    >
                      {page}
                    </Button>
                  </li>
                )
            })}
            <li>
              <Button
                to={pagination.next.link}
                variant="default"
                disabled={!pagination.next.active}
                className="ml-2"
              >
                <FaArrowRight />
              </Button>
            </li>
          </ul>)
        }
      </div>
    </div>
  );
}
