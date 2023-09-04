import { memo } from "react";

import { Checkbox } from "@common/Components/Form";
import useTableQuerySelect from "@common/Hooks/useTableQuerySelect";

import TableContentHeaderItemContainer from "./TableContentHeaderItemContainer";

const TableContentHeaderSelector = () => {
  const { isAllRowsSelected, isSomeRowsSelected, toggleSelectAll } = useTableQuerySelect();

  return (
    <TableContentHeaderItemContainer className="px-4 w-20 pt-2">
      <div className="flex items-center justify-start">
        <Checkbox
          name="table-content-header-selector"
          checked={isAllRowsSelected}
          indeterminate={isSomeRowsSelected}
          onChange={toggleSelectAll}
        />
      </div>
    </TableContentHeaderItemContainer>
  );
};

export default memo(TableContentHeaderSelector);
