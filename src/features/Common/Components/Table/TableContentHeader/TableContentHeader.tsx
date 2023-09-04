import { HeaderGroup } from "@tanstack/react-table";
import { memo } from "react";

import TableContentHeaderGroup from "./TableContentHeaderGroup";
import { TableContentHeaderItemProps } from "./TableContentHeaderItem";

interface TableContentHeaderProps extends Pick<TableContentHeaderItemProps, "onDragEnd"> {
  headerGroups: HeaderGroup<unknown>[];
}

const TableContentHeader = ({ headerGroups, onDragEnd }: TableContentHeaderProps) => {
  return (
    <thead className="border-b-2 border-gray-100">
      {headerGroups.map((headerGroup) => (
        <TableContentHeaderGroup group={headerGroup} key={headerGroup.id} onDragEnd={onDragEnd} />
      ))}
    </thead>
  );
};

export default memo(TableContentHeader);
