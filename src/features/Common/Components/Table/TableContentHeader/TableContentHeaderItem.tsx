import { Column, Header, flexRender } from "@tanstack/react-table";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { DragSourceMonitor, useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";

import TableContentHeaderItemContainer from "./TableContentHeaderItemContainer";
import TableContentHeaderItemContent from "./TableContentHeaderItemContent";

export interface TableContentHeaderItemProps {
  header: Header<unknown, unknown>;
  onDragEnd: (draggedColumn: Column<unknown>, targetColumn: Column<unknown>) => void;
}

const TableContentHeaderItem = ({ header, onDragEnd }: TableContentHeaderItemProps) => {
  const column = useMemo(() => header.column, [header]);
  const cellRef = useRef<HTMLTableCellElement>(null);

  const headerContent = useMemo(
    () => (header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())),
    [header],
  );

  const handleDragEnd = useCallback(
    (draggedColumn: Column<unknown>) => {
      onDragEnd(draggedColumn, column);
    },
    [column, onDragEnd],
  );

  const handleCollect = useCallback(
    (monitor: DragSourceMonitor<Column<unknown>, unknown>) => ({
      isDragging: monitor.isDragging(),
    }),
    [],
  );

  const [, dropRef] = useDrop({
    accept: "column",
    drop: handleDragEnd,
  });

  const [collected, dragRef, previewRef] = useDrag({
    type: "column",
    item: column,
    collect: handleCollect,
  });

  dragRef(dropRef(cellRef));

  useEffect(() => {
    previewRef(getEmptyImage());
  }, [previewRef]);

  return (
    <TableContentHeaderItemContainer ref={cellRef} data-id={column.id}>
      <TableContentHeaderItemContent
        content={headerContent}
        className={twMerge(collected.isDragging && "opacity-0")}
      />
    </TableContentHeaderItemContainer>
  );
};

export default memo(TableContentHeaderItem);
