import { Row, Table } from "@tanstack/react-table";
import { memo, useMemo } from "react";

import TableContentBodyRow from "./TableContentBodyRow";
import TableContentBodySkeleton from "./TableContentBodySkeleton";

interface TableContentBodyProps {
  isLoading?: boolean;
  table: Table<unknown>;
  rows: Row<unknown>[];
}

const TableContentBody = ({ isLoading, rows, table }: TableContentBodyProps) => {
  const columns = useMemo(() => table.getVisibleFlatColumns().length, [table]);

  return (
    <tbody>
      {isLoading && !rows.length && <TableContentBodySkeleton columns={columns} />}
      {(!isLoading || (isLoading && !!rows.length)) &&
        rows.map((row) => <TableContentBodyRow key={row.id} row={row} />)}
    </tbody>
  );
};

export default memo(TableContentBody);
