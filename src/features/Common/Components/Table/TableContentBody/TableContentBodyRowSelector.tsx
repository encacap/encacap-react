import { memo } from "react";

import { Checkbox } from "@common/Components/Form";
import useWatchTableQuerySelect from "@common/Hooks/useWatchTableQuerySelect";

interface TableContentBodyRowSelectorProps {
  id: string;
}

const TableContentBodyRowSelector = ({ id }: TableContentBodyRowSelectorProps) => {
  const { isSelected, toggleSelect } = useWatchTableQuerySelect(id);

  return (
    <td className="pl-4">
      <div className="flex items-center justify-start pt-px">
        <Checkbox name="table-content-header-selector" checked={isSelected} onChange={toggleSelect} />
      </div>
    </td>
  );
};

export default memo(TableContentBodyRowSelector);
