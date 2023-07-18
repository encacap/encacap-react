import { Column } from "@tanstack/react-table";
import { RefObject, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { XYCoord, useDragLayer } from "react-dnd";
import { twMerge } from "tailwind-merge";

import TableContentHeaderItemContent from "./TableContentHeaderItemContent";

interface TableContentHeaderDragLayerProps {
  tableRef: RefObject<HTMLTableElement>;
}

const TableContentHeaderDragLayer = ({ tableRef }: TableContentHeaderDragLayerProps) => {
  const { isDragging, item, initialOffset, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem<Column<unknown>>(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));
  const itemId = useMemo(() => item?.id, [item]);

  const cellRef = useRef<HTMLDivElement>(null);
  const relatedCellRef = useRef<HTMLTableCellElement | null>(null);

  const getRelatedCellElement = useCallback(() => {
    if (!tableRef.current || !itemId) {
      return null;
    }

    if (!relatedCellRef.current) {
      relatedCellRef.current = tableRef.current.querySelector(`[data-id="${itemId}"]`);
    } else if (relatedCellRef.current.dataset.id !== itemId) {
      relatedCellRef.current = tableRef.current.querySelector(`[data-id="${itemId}"]`);
    }

    return relatedCellRef.current;
  }, [tableRef, itemId]);

  const calculateContainerPosition = useCallback(
    (offset: XYCoord | null, newOffset: XYCoord | null) => {
      if (!cellRef.current || !tableRef.current || !newOffset || !offset) {
        return;
      }

      let { x } = newOffset;
      const { y } = offset;
      const tableRect = tableRef.current.getBoundingClientRect();

      const relatedCellElementRect = getRelatedCellElement()!.getBoundingClientRect();

      if (x < tableRect.left) {
        x = tableRect.left;
      } else if (x + relatedCellElementRect.width > tableRect.right) {
        x = tableRect.right - relatedCellElementRect.width;
      }

      cellRef.current.style.transform = `translate(${x}px, ${y}px)`;
      cellRef.current.style.width = `${relatedCellElementRect.width}px`;
      cellRef.current.style.height = `${tableRect.height}px`;
    },
    [tableRef, getRelatedCellElement],
  );

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    calculateContainerPosition(initialOffset, currentOffset);
  }, [calculateContainerPosition, isDragging, initialOffset, currentOffset]);

  if (!isDragging || !item) {
    return null;
  }

  return (
    <div className={twMerge("fixed z-50 inset-0 pointer-events-none", !isDragging && "hidden")}>
      <div className="relative flex flex-col" ref={cellRef}>
        <div className="whitespace-nowrap font-medium capitalize p-2 rounded-lg w-fit">
          <TableContentHeaderItemContent
            content={item.columnDef.header as string}
            isHovering
            className="bg-blue-100 text-blue-700"
          />
        </div>
        <div className="flex-1 bg-blue-200 mx-2 bg-opacity-50" />
      </div>
    </div>
  );
};

export default memo(TableContentHeaderDragLayer);
