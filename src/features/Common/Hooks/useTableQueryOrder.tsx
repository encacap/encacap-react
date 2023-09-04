import { useCallback, useMemo } from "react";

import useTableQuery from "./useTableQuery";

const useTableQueryOrder = (id: string) => {
  const {
    query: { orderBy, orderDirection },
    setOrderDirection,
  } = useTableQuery();

  const value = useMemo(() => {
    if (orderBy === id) {
      return orderDirection;
    }

    return false;
  }, [id, orderBy, orderDirection]);

  const handleSetOrderDirection = useCallback(() => {
    setOrderDirection(id);
  }, [id, setOrderDirection]);

  return [value, handleSetOrderDirection] as const;
};

export default useTableQueryOrder;
