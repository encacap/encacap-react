import { HeaderGroup } from "@tanstack/react-table";
import { memo, useMemo } from "react";

import TableContentHeaderItem, { TableContentHeaderItemProps } from "./TableContentHeaderItem";
import TableContentHeaderSelector from "./TableContentHeaderSelector";

interface TableContentHeaderGroupProps extends Pick<TableContentHeaderItemProps, "onDragEnd"> {
  group: HeaderGroup<unknown>;
}

const TableContentHeaderGroup = ({ group, onDragEnd }: TableContentHeaderGroupProps) => {
  const groupHeaders = useMemo(() => group.headers, [group]);

  return (
    <tr>
      <TableContentHeaderSelector />
      {groupHeaders.map((header) => (
        <TableContentHeaderItem key={header.id} header={header} onDragEnd={onDragEnd} />
      ))}
    </tr>
  );
};

export default memo(TableContentHeaderGroup);
