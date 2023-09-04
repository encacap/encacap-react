import { Row } from "@tanstack/react-table";
import { useCallback, useContext, useMemo } from "react";

import TableDataContext from "@common/Components/Table/TableContext";

import useTableQuery from "./useTableQuery";

const useTableQuerySelect = () => {
  const {
    query: { select },
    toggleSelectAll,
  } = useTableQuery();
  const rows = useContext(TableDataContext);
  const rowIds = useMemo(() => rows.map((row: Row<unknown>) => String(row.id)), [rows]);

  const isAllRowsSelected = useMemo(
    () => Boolean(rowIds.length) && rowIds.every((row) => select?.includes(row)),
    [rowIds, select],
  );
  const isSomeRowsSelected = useMemo(
    () => !isAllRowsSelected && Boolean(rowIds.length) && rowIds.some((row) => select?.includes(row)),
    [isAllRowsSelected, rowIds, select],
  );

  const handleToggleSelectAll = useCallback(() => {
    toggleSelectAll(rowIds);
  }, [rowIds, toggleSelectAll]);

  return {
    isAllRowsSelected,
    isSomeRowsSelected,
    toggleSelectAll: handleToggleSelectAll,
  };
};

export default useTableQuerySelect;
