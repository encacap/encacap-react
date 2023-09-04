import { lowerCase } from "lodash";

import { TableQuery, TableQueryOrder, TableQueryWhere } from "@interfaces/tableType";

import { TableOrderDirectionEnum } from "../../../app/Enums/tableEnum";

const parseOrderQuery = (queryString: string): TableQueryOrder => {
  const orderQuery = queryString.match(/ORDER BY (\w+) (\w+)/i);
  const orderBy = orderQuery?.[1];
  const orderDirection = orderQuery?.[2];

  return {
    orderBy,
    orderDirection: orderDirection ? (lowerCase(orderDirection) as TableOrderDirectionEnum) : false,
  };
};

const parseSelectQuery = (queryString: string): string[] => {
  const selectQuery = queryString.match(/SELECT (.*)/i);
  const select = selectQuery?.[1];

  return select ? select.split(",").map((item) => item.trim()) : [];
};

const parseWhereQuery = (queryString: string): TableQueryWhere => {
  const whereQuery = queryString
    .slice(queryString.indexOf("WHERE"), queryString.lastIndexOf(")"))
    .match(/WHERE (.*)/i);
  const where = whereQuery?.[1];

  if (!where) {
    return [];
  }

  const whereArray = where.split("AND").map((item) => item.trim());

  return whereArray.map((item) => {
    const [key, value] = item.split("IN").map((i) => i.trim());

    return {
      [key]: value
        .replace("(", "")
        .replace(")", "")
        .split(",")
        .map((i) => i.trim()),
    };
  });
};

/* eslint-disable no-param-reassign */
const parseQueryElement = (queryString: string, prev: TableQuery) => {
  const orderQuery = parseOrderQuery(queryString);
  const selectQuery = parseSelectQuery(queryString);
  const whereQuery = parseWhereQuery(queryString);

  prev.orderBy = orderQuery.orderBy;
  prev.orderDirection = orderQuery.orderDirection ?? false;
  prev.select = selectQuery;
  prev.where = whereQuery;

  return prev;
};
/* eslint-enable no-param-reassign */

const stringifyQueryElement = (query: TableQuery) => {
  let queryString = "";
  const { orderBy, orderDirection, select = [] } = query;

  if (orderBy) {
    queryString += `ORDER BY ${orderBy} ${orderDirection} `;
  }

  if (select.length) {
    queryString += `SELECT ${select.join(",")} `;
  }

  return queryString;
};

export { parseQueryElement, stringifyQueryElement };
