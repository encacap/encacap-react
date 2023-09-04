import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Watch a query param in the URL and return its value every time it changes.
 * @param {string} paramName - The name of the query param to watch.
 * @returns {[string, (newValue: string) => void]} - The value of the query param and a function to set it.
 */
const useWatchQuery = (paramName: string): [string, (newValue: string) => void] => {
  const [searchParam, setSearchParam] = useSearchParams();
  const value = useMemo(() => searchParam.get(paramName) ?? "", [paramName, searchParam]);

  const handleSetSearchParam = useCallback(
    (newValue: string) => {
      searchParam.set(paramName, newValue);
      setSearchParam(searchParam);
    },
    [paramName, searchParam, setSearchParam],
  );

  return [value, handleSetSearchParam];
};

export default useWatchQuery;
