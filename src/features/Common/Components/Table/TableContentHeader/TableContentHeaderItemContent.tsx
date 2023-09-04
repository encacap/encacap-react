import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef, memo } from "react";
import { HiMiniArrowSmallUp } from "react-icons/hi2";
import { RxDragHandleDots2 } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

import { TableOrderDirection } from "@interfaces/tableType";

interface TableContentHeaderItemContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode;
  isHovering?: boolean;
  isSorted?: TableOrderDirection;
}

const TableContentHeaderItemContent = (
  { className, content, isHovering, isSorted, ...props }: TableContentHeaderItemContentProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  if (!content) return null;

  return (
    <div
      className={twMerge(
        "group/table-head py-0.5 inline-flex items-center justify-center pl-2 pr-1 rounded-sm hover:bg-gray-200 float-left duration-100 cursor-pointer",
        className,
        isSorted && "bg-gray-200 mr-5 hover:mr-0",
      )}
      ref={ref}
      {...props}
    >
      <div
        className={twMerge(
          "opacity-0 group-hover/table-head:opacity-100 duration-100 w-0 group-hover/table-head:w-5 overflow-hidden",
          isHovering && "opacity-100 w-5",
        )}
      >
        <RxDragHandleDots2 />
      </div>
      <div
        className={twMerge(
          "mb-px duration-100 flex items-center justify-start space-x-1 mr-5 group-hover/table-head:mr-0 whitespace-nowrap",
          (isHovering || isSorted) && "mr-0",
        )}
      >
        <span className="text-sm text-inherit">{content}</span>
        <HiMiniArrowSmallUp
          size={22}
          className={twMerge(
            "text-slate-400 opacity-0 group-hover/table-head:opacity-100 group-hover/table-head:duration-100 delay-100",
            (isHovering || isSorted) && "opacity-100",
            isSorted && "text-slate-700",
            isSorted === "desc" && "transform rotate-180",
          )}
        />
      </div>
    </div>
  );
};

export default memo(forwardRef(TableContentHeaderItemContent));
