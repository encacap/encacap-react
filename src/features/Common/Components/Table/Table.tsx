import { Column, ColumnOrderState, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { cloneDeep } from "lodash";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { moveTableItem } from "@common/Utils/helper";

import { LoadingSpinner } from "../Loading";
import TableContentBody from "./TableContentBody/TableContentBody";
import TableContentHeader from "./TableContentHeader/TableContentHeader";
import TableContentHeaderDragLayer from "./TableContentHeader/TableContentHeaderDragLayer";
import { TableProps } from "./interface";

const Table = ({ className, columns, containerClassName, data, isLoading, ...props }: TableProps) => {
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    columns.map((column) => column.id as string),
  );
  const tableRef = useRef<HTMLTableElement>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnOrderChange: setColumnOrder,
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  const headerGroups = useMemo(() => table.getHeaderGroups(), [columnOrder, table]);
  const rows = useMemo(() => cloneDeep(table.getRowModel().rows), [columnOrder, data, table]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const handleDropHeaderCell = useCallback(
    (from: Column<unknown>, to: Column<unknown>) => {
      table.setColumnOrder((old) => moveTableItem(old, from.id as string, to.id as string));
    },
    [table],
  );

  return (
    <div
      className={twMerge(
        "border-2 border-gray-100 rounded-lg inline-block relative w-fit",
        containerClassName,
      )}
    >
      {isLoading && (
        <div className="absolute z-20 inset-0 bg-white bg-opacity-50 rounded-lg flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
      <TableContentHeaderDragLayer tableRef={tableRef} />
      <table className={twMerge("w-full", className)} ref={tableRef} {...props}>
        <TableContentHeader headerGroups={headerGroups} onDragEnd={handleDropHeaderCell} />
        <TableContentBody isLoading={isLoading} rows={rows} table={table} />
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default memo(Table);
