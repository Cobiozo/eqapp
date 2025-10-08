import { GlobalContext } from "~/root";
import { useContext, useMemo } from "react";
import InputField from "../ui/InputField";
import { useState } from "react";
import Button from "../ui/Button";
import { FaArrowDown, FaArrowUp, FaPencilAlt, FaSearch, FaTimes } from "react-icons/fa";
import Alert from "../ui/Alert";
import AdminPageHeader from "../ui/AdminPageHeader";
import Animated from "../ui/Animated";
import clsx from "clsx";

type Props = {
  items: any[];
  itemTemplate: (item: any) => JSX.Element;
  collection: string;
  editUrl?: string;
  searchUrl?: string;
  returnUrl?: string;
  defaultValue?: string;
  editBtn?: boolean;
  removeBtn?: boolean;
  itemsClassName?: string;
  itemClassName?: string;
  admin?: boolean;
  hideHeader?: boolean;
  priorityBtns?: boolean;
  additionalActions?: ({ item }: { item: any }) => JSX.Element;
}

export default function SearchString({ items, itemTemplate, collection, defaultValue, editUrl, searchUrl, returnUrl, itemClassName, itemsClassName, editBtn, removeBtn, admin = true, hideHeader = false, additionalActions: AdditionalActions, priorityBtns = true }: Props) {
  const { t } = useContext(GlobalContext);
  const [searchString, setSearchString] = useState(["--all--", "--none--"].includes(defaultValue)  ? "" : defaultValue);

  const preparedSearchUrl = useMemo(() => {
    if (searchUrl)
      return searchUrl.replace("$searchString", searchString || "");
    else if (admin)
      return `/dashboard/admin/${collection}/search/${searchString}`;
     else
    return `/dashboard/${collection}/search/${searchString}`;
  }, [searchUrl, searchString]);

  const preparedReturnUrl = useMemo(() => {
    if (returnUrl)
      return returnUrl;
    else if (admin)
      return `/dashboard/admin/${collection}`;
    else
      return `/dashboard/${collection}`;
  }, [returnUrl]);

  return (
    <section>
      { !hideHeader && (
        <AdminPageHeader returnLink={preparedReturnUrl}>
          {t("common.searchResults")}
        </AdminPageHeader>
      )}
      <div className="flex gap-4 justify-center items-end">
        <InputField
          type="text"
          name="search"
          placeholder={t("common.search")}
          onChange={setSearchString}
          defaultValue={searchString}
        />
        <Button
          disabled={!searchString}
          size="sm"
          icon={FaSearch}
          to={preparedSearchUrl}
        />
      </div>
      {!items.length && defaultValue !== "--none--" && (
        <Alert title={t("common.noDataFound")} variant="info" className="mx-auto">
          {t("common.noDataFoundDesc")}
        </Alert>
      )}
      <Animated animation="fadeIn">
        <ul className={itemsClassName}>
          {items.map((item) => (
            <li key={item.id}>
              <div className={clsx("flex flex-col items-center group md:flex-row", itemClassName)}>
                <div className="grow">
                  {itemTemplate(item)}
                </div>
                <div className="flex">
                  { priorityBtns && "priority" in item && (
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
                  { AdditionalActions && <AdditionalActions item={item} />}
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
                      to={"/dashboard/admin/" + collection + "/remove/" + item.id}
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
    </section>
  );
}
