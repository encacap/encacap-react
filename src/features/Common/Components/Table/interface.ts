import { ColumnDef, TableOptions } from "@tanstack/react-table";
import { HTMLAttributes } from "react";

export type TableColumnDef<T = unknown> = ColumnDef<T>;

export interface TableProps
  extends Omit<TableOptions<unknown>, "getCoreRowModel">,
    Partial<Pick<TableOptions<unknown>, "getCoreRowModel">>,
    HTMLAttributes<HTMLTableElement> {
  columns: TableColumnDef[];
  containerClassName?: string;
  isLoading?: boolean;
}
