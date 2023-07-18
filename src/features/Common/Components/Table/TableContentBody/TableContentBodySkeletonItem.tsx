import { memo } from "react";

import { LoadingSkeleton } from "@common/Components/Loading";

export interface TableContentBodySkeletonItemProps {
  columns: number;
}

const TableContentBodySkeletonItem = ({ columns }: TableContentBodySkeletonItemProps) => {
  return (
    <tr className="border-b-2 border-gray-100 last:border-b-0">
      <td className="p-4">
        <LoadingSkeleton className="w-5 h-5" />
      </td>
      {Array.from({ length: columns }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <td className="p-4" key={index}>
          <LoadingSkeleton className="w-full h-4" />
        </td>
      ))}
    </tr>
  );
};

export default memo(TableContentBodySkeletonItem);
