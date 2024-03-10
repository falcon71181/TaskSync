import React from "react";
import TaskButton from "./TaskButton";
import { ITaskCardProps } from "@/types/tasks";

const TaskCard: React.FC<ITaskCardProps> = ({ props, onDelete, onDone }) => {
  const deleteTask = () => {
    onDelete(props._id);
  };
  const doneTask = () => {
    onDone(props._id);
  };

  return (
    <div className="min-h-32 w-11/12 flex justify-between items-start border border-[#27272a] p-6 rounded-md gap-5 dark:hover:border-gray-300 transition-all duration-300">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <h1 className="text-[#a1a1aa] text-sm">{props.description}</h1>
      </div>
      <div className="flex flex-col gap-3">
        <TaskButton
          className="hover:border-green-500"
          onDone={() => doneTask()}
        >
          Done
        </TaskButton>
        <TaskButton
          className="hover:border-red-500"
          onDelete={() => deleteTask()}
        >
          Delete
        </TaskButton>
      </div>
    </div>
  );
};

export default TaskCard;
