import { Cell, flexRender } from "@tanstack/react-table";
import { memo } from "react";

interface TableContentBodyRowCellProps {
  cell: Cell<unknown, unknown>;
}

const TableContentBodyCell = ({ cell }: TableContentBodyRowCellProps) => {
  return (
    <td className="p-4" key={cell.id}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

export default memo(TableContentBodyCell);
