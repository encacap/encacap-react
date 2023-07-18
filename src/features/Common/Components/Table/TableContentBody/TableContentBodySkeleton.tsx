import { memo } from "react";

import TableContentBodySkeletonItem, {
  TableContentBodySkeletonItemProps,
} from "./TableContentBodySkeletonItem";

const TableContentBodySkeleton = ({ columns }: TableContentBodySkeletonItemProps) => {
  return (
    <>
      <TableContentBodySkeletonItem columns={columns} />
      <TableContentBodySkeletonItem columns={columns} />
      <TableContentBodySkeletonItem columns={columns} />
      <TableContentBodySkeletonItem columns={columns} />
      <TableContentBodySkeletonItem columns={columns} />
      <TableContentBodySkeletonItem columns={columns} />
      <TableContentBodySkeletonItem columns={columns} />
      <TableContentBodySkeletonItem columns={columns} />
    </>
  );
};

export default memo(TableContentBodySkeleton);
