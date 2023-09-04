import {
  Column,
  ColumnOrderState,
  RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cloneDeep, get, random } from "lodash";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { twMerge } from "tailwind-merge";

import { moveTableItem } from "@common/Utils/helper";

import { LoadingSpinner } from "../Loading";
import TableContentBody from "./TableContentBody/TableContentBody";
import TableContentHeader from "./TableContentHeader/TableContentHeader";
import TableContentHeaderDragLayer from "./TableContentHeader/TableContentHeaderDragLayer";
import TableDataContext from "./TableContext";
import TableHeader from "./TableHeader/TableHeader";
import { TableProps } from "./interface";

const Table = ({ className, columns, tableContainerClassName, data, isLoading, ...props }: TableProps) => {
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string),
  );
  const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>({});

  const handleGetRowId = useCallback((row: unknown) => String(get(row, "id", random(0))), []);

  const tableRef = useRef<HTMLTableElement>(null);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
      rowSelection: rowSelectionState,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelectionState,
    getRowId: handleGetRowId,
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  const headerGroups = useMemo(() => cloneDeep(table.getHeaderGroups()), [columnOrder, table]);
  const rows = useMemo(() => cloneDeep(table.getRowModel().rows), [columnOrder, data, table]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleDropHeaderCell = useCallback(
    (from: Column<unknown>, to: Column<unknown>) => {
      table.setColumnOrder((old) => moveTableItem(old, from.id as string, to.id as string));
    },
    [table],
  );

  return (
    <div>
      <TableHeader headerGroups={headerGroups} />
      <div
        className={twMerge(
          "border-2 border-gray-100 rounded-lg inline-block relative w-fit",
          tableContainerClassName,
        )}
      >
        {isLoading && !data.length && (
          <div className="absolute z-20 inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
        <DndProvider backend={HTML5Backend}>
          <TableContentHeaderDragLayer tableRef={tableRef} />
          <TableDataContext.Provider value={rows}>
            <table className={twMerge("w-full", className)} ref={tableRef} {...props}>
              <TableContentHeader headerGroups={headerGroups} onDragEnd={handleDropHeaderCell} />
              <TableContentBody isLoading={isLoading} rows={rows} table={table} />
            </table>
          </TableDataContext.Provider>
        </DndProvider>
      </div>
    </div>
  );
};

export default memo(Table);
