import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef, memo } from "react";
import { HiMiniArrowSmallUp } from "react-icons/hi2";
import { RxDragHandleDots2 } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface TableContentHeaderItemContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode;
  isHovering?: boolean;
}

const TableContentHeaderItemContent = (
  { content, isHovering, className }: TableContentHeaderItemContentProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  if (!content) return null;

  return (
    <div
      className={twMerge(
        "group/table-head py-0.5 inline-flex items-center justify-center pl-2 pr-1.5 rounded-sm hover:bg-gray-200 float-left duration-100 cursor-pointer",
        className,
      )}
      ref={ref}
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
          isHovering && "mr-0",
        )}
      >
        <span className="text-sm text-inherit">{content}</span>
        <HiMiniArrowSmallUp
          size={22}
          className={twMerge(
            "text-slate-400 opacity-0 group-hover/table-head:opacity-100 group-hover/table-head:duration-100 delay-100",
            isHovering && "opacity-100",
          )}
        />
      </div>
    </div>
  );
};

export default memo(forwardRef(TableContentHeaderItemContent));
