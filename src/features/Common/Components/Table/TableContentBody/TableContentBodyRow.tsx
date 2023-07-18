import { Row } from "@tanstack/react-table";
import { memo } from "react";

import { Checkbox } from "@common/Components/Form";

import TableContentBodyCell from "./TableContentBodyCell";

interface TableContentBodyRowProps {
  row: Row<unknown>;
}

const TableContentBodyRow = ({ row }: TableContentBodyRowProps) => {
  return (
    <tr className="group/table-row border-b-2 border-gray-50 last:border-b-0">
      <td className="pl-4">
        <div className="flex items-center justify-start pt-px">
          <Checkbox name="table-content-header-selector" />
        </div>
      </td>
      {row.getVisibleCells().map((cell) => (
        <TableContentBodyCell key={cell.id} cell={cell} />
      ))}
    </tr>
  );
};

export default memo(TableContentBodyRow);
