import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";

interface TableContentHeaderItemContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const TableContentHeaderItemContainer = (
  { children, className, ...props }: TableContentHeaderItemContainerProps,
  ref: ForwardedRef<HTMLTableCellElement>,
) => {
  return (
    <th
      className={twMerge(
        "whitespace-nowrap font-medium border-gray-100 capitalize bg-gray-50 px-2 py-2 first:rounded-tl-lg last:rounded-tr-lg",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
    </th>
  );
};

export default memo(forwardRef(TableContentHeaderItemContainer));
