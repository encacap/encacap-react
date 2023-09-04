import { Row } from "@tanstack/react-table";
import { memo } from "react";

import TableContentBodyCell from "./TableContentBodyCell";
import TableContentBodyRowSelector from "./TableContentBodyRowSelector";

interface TableContentBodyRowProps {
  row: Row<unknown>;
}

const TableContentBodyRow = ({ row }: TableContentBodyRowProps) => {
  return (
    <tr className="group/table-row border-b-2 border-gray-50 last:border-b-0">
      <TableContentBodyRowSelector id={row.id} />
      {row.getVisibleCells().map((cell) => (
        <TableContentBodyCell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
};

export default memo(TableContentBodyRow);
