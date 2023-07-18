import { FC, HTMLAttributes, memo } from "react";
import { twMerge } from "tailwind-merge";

const LoadingOverlay: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div
        className={twMerge(
          "h-12 w-12 animate-spin rounded-full border-4 border-teal-400 border-t-transparent",
          className,
        )}
      />
    </div>
  );
};

export default memo(LoadingOverlay);
