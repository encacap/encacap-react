import { HeaderGroup } from "@tanstack/react-table";
import { memo, useMemo } from "react";

import { Checkbox } from "@common/Components/Form";

import TableContentHeaderItem, { TableContentHeaderItemProps } from "./TableContentHeaderItem";
import TableContentHeaderItemContainer from "./TableContentHeaderItemContainer";

interface TableContentHeaderGroupProps extends Pick<TableContentHeaderItemProps, "onDragEnd"> {
  group: HeaderGroup<unknown>;
}

const TableContentHeaderGroup = ({ group, onDragEnd }: TableContentHeaderGroupProps) => {
  const groupHeaders = useMemo(() => group.headers, [group]);

  return (
    <tr>
      <TableContentHeaderItemContainer className="px-4 w-20 pt-2">
        <div className="flex items-center justify-start">
          <Checkbox name="table-content-header-selector" />
        </div>
      </TableContentHeaderItemContainer>
      {groupHeaders.map((header) => (
        <TableContentHeaderItem key={header.id} header={header} onDragEnd={onDragEnd} />
      ))}
    </tr>
  );
};

export default memo(TableContentHeaderGroup);
