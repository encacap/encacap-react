import { TableOrderDirectionEnum } from "../Enums/tableEnum";

export type TableOrderDirection = false | TableOrderDirectionEnum;

export type TableQueryWhere = Array<Record<string, string[]>>;

export interface TableQueryOrder {
  orderBy?: string;
  orderDirection?: TableOrderDirection;
}

export interface TableQuery extends TableQueryOrder {
  select?: string[];
  where?: TableQueryWhere;
}
