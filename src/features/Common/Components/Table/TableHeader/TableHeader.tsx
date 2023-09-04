import { HeaderGroup } from "@tanstack/react-table";
import { flatten } from "lodash";
import { memo, useMemo } from "react";

interface TableHeaderProps {
  headerGroups: HeaderGroup<unknown>[];
}

const TableHeader = ({ headerGroups }: TableHeaderProps) => {
  const headers = useMemo(
    () => flatten(headerGroups.map((headerGroup) => headerGroup.headers)),
    [headerGroups],
  );

  // eslint-disable-next-line no-console
  console.log(headers);

  return <div>Hihi</div>;
};

export default memo(TableHeader);
