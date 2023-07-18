import { HTMLAttributes, memo } from "react";
import { twMerge } from "tailwind-merge";

const LoadingSpinner = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge(
        "h-4 w-4 animate-spin rounded-full border-2 border-white",
        className,
        "border-t-transparent",
      )}
    />
  );
};

export default memo(LoadingSpinner);
