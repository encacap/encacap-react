import { Row } from "@tanstack/react-table";
import { createContext } from "react";

const TableDataContext = createContext<Array<Row<unknown>>>([]);

export default TableDataContext;
