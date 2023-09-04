import { useCallback, useMemo } from "react";

import { parseQueryElement, stringifyQueryElement } from "@common/Utils/tableQueryHelper";
import { TableQuery } from "@interfaces/tableType";

import { TableOrderDirectionEnum } from "../../../app/Enums/tableEnum";
import useWatchQuery from "./useWatchQuery";

const useTableQuery = () => {
  const query = useMemo(() => ({}) as TableQuery, []);
  const [queryString, setQueryString] = useWatchQuery("eql");
  const parsedQuery = useMemo(() => parseQueryElement(queryString, query), [query, queryString]);

  const handleChangeOrderDirection = useCallback(
    (orderBy: string) => {
      const newQuery = { ...parsedQuery };
      const currentOrderBy = newQuery.orderBy;
      const currentOrderDirection = newQuery.orderDirection;

      if (currentOrderBy === orderBy) {
        if (currentOrderDirection === TableOrderDirectionEnum.DESC) {
          newQuery.orderDirection = TableOrderDirectionEnum.ASC;
        } else {
          newQuery.orderDirection = TableOrderDirectionEnum.DESC;
        }
      } else {
        newQuery.orderBy = orderBy;
        newQuery.orderDirection = TableOrderDirectionEnum.ASC;
      }

      setQueryString(stringifyQueryElement(newQuery));
    },
    [parsedQuery, setQueryString],
  );

  const handleToggleSelectAll = useCallback(
    (ids: string[]) => {
      const currentSelect = parsedQuery.select;

      if (currentSelect?.length === ids.length) {
        delete parsedQuery.select;
      } else {
        parsedQuery.select = ids;
      }

      setQueryString(stringifyQueryElement(parsedQuery));
    },
    [parsedQuery, setQueryString],
  );

  const handleToggleSelectRow = useCallback(
    (id: string) => {
      const currentSelect = parsedQuery.select;

      if (currentSelect?.includes(id)) {
        parsedQuery.select = currentSelect.filter((selectId) => selectId !== id);
      } else {
        parsedQuery.select = [...(currentSelect || []), id];
      }

      setQueryString(stringifyQueryElement(parsedQuery));
    },
    [parsedQuery, setQueryString],
  );

  return {
    query: parsedQuery,
    setOrderDirection: handleChangeOrderDirection,
    toggleSelectAll: handleToggleSelectAll,
    toggleSelectRow: handleToggleSelectRow,
  };
};

export default useTableQuery;
