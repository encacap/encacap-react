import { createColumnHelper } from "@tanstack/react-table";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

import { Table, TableColumnDef } from "@common/Components";

interface UserDataType {
  id: number;
  email: string;
  avatar: string;
  first_name: string;
  last_name: string;
}

const App = () => {
  const [data, setData] = useState<UserDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const columnHelper = useMemo(() => createColumnHelper<UserDataType>(), []);
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row.id, {
        id: "id",
        header: "ID",
      }),
      columnHelper.accessor((row) => row.email, {
        id: "email",
        header: "Email",
      }),
      columnHelper.accessor((row) => `${row.first_name} ${row.last_name}`, {
        id: "fullName",
        header: "Full Name",
      }),
      columnHelper.accessor((row) => `${row.first_name} ${row.last_name} - ${row.email}`, {
        id: "firstOtherColumn",
        header: "First Other Column",
      }),
    ],
    [columnHelper],
  );

  const getData = useCallback(async () => {
    setIsLoading(true);

    const response = await fetch("https://reqres.in/api/users");
    const { data: resData } = await response.json();

    setData(resData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="p-8">
      <Table columns={columns as TableColumnDef[]} data={data} isLoading={isLoading} />
    </div>
  );
};

export default memo(App);
