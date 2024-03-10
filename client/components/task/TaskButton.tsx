import React from "react";
import { IButtonProps } from "@/types/taskButtons";

const TaskButton: React.FC<IButtonProps> = ({
  children,
  className,
  onDelete,
  onDone,
}) => {
  const handleClick = () => {
    if (onDelete) {
      onDelete();
    } else if (onDone) {
      onDone();
    }
  };

  return (
    <button
      className={`text-black dark:text-white inline-flex whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default TaskButton;
