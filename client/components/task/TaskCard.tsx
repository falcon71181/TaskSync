import React from "react";
import TaskButton from "./TaskButton";
import { ITaskCardProps } from "@/types/tasks";
import { TiTick } from "react-icons/ti";

const TaskCard: React.FC<ITaskCardProps> = ({ props, onDelete, onDone }) => {
  const deleteTask = () => {
    onDelete(props._id);
  };
  const doneTask = () => {
    onDone(props._id);
  };

  return (
    <div className="min-h-32 w-11/12 flex justify-between items-start dark:shadow shadow-lg hover:shadow-grny shadow-gray-400 border-[1px] border-[#27272a] p-4 md:p-6 rounded-md gap-5 dark:hover:border-gray-300 dark:hover:bg-zinc-800 transition-all duration-300">
      <div className="flex flex-col space-y-1.5">
        <div className="flex items-center gap-3 md:gap-5">
          <span
            className={`${props.isCompleted === true ? "line-through font-mono" : "font-bold"} text-sm sm:text-base md:text-xl lg:text-2xl`}
          >
            {props.title}
          </span>
          {props.isCompleted && <TiTick color="green" fontSize={20} />}
        </div>
        <h1 className="text-[#a1a1aa] text-sm">{props.description}</h1>
      </div>
      <div className="flex flex-col gap-3">
        <TaskButton
          className="hover:border-green-500"
          onDone={() => doneTask()}
        >
          {props.isCompleted === true ? "UnDone" : "Done"}
        </TaskButton>
        <TaskButton
          className="border-red-500 hover:bg-red-500"
          onDelete={() => deleteTask()}
        >
          Delete
        </TaskButton>
      </div>
    </div>
  );
};

export default TaskCard;
