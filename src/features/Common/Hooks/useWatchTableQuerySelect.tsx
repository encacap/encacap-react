import { useCallback, useMemo } from "react";

import useTableQuery from "./useTableQuery";

const useWatchTableQuerySelect = (rowId: string) => {
  const {
    query: { select },
    toggleSelectRow,
  } = useTableQuery();

  const isSelected = useMemo(() => Boolean(select?.includes(rowId)), [rowId, select]);

  const handleToggleSelect = useCallback(() => {
    toggleSelectRow(rowId);
  }, [rowId, toggleSelectRow]);

  return {
    isSelected,
    toggleSelect: handleToggleSelect,
  };
};

export default useWatchTableQuerySelect;
