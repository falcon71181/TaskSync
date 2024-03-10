"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TaskCard from "@/components/task/TaskCard";
import type { Task } from "@/types/tasks";

const Tasks = () => {
  const SERVER = "http://localhost:3333";
  const searchParams = useSearchParams();
  const filter_tag = searchParams.get("tag");

  const [taskData, setTaskData] = useState<Task[]>([]);

  // delete task
  const deleteTask = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await fetch(`${SERVER}/tasks/${id}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Update taskData after deleting the task
      setTaskData((prevTaskData) =>
        prevTaskData.filter((task) => task._id !== id),
      );
    }
  };

  // update status of task
  const updateStatus = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const response = await fetch(`${SERVER}/tasks/${id}/change`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // Update taskData after deleting the task
      console.log("todo");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const response = await fetch(`${SERVER}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        if (response.ok) {
          setTaskData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const tags = [
    { name: "All", href: "/", tag: null },
    { name: "In Progress", href: "?tag=inProgress", tag: "inProgress" },
    { name: "Completed", href: "?tag=completed", tag: "completed" },
  ];

  return (
    <div className="w-full h-full p-5 flex flex-col gap-1 text-black dark:text-white_light border-2 border-red-300">
      <span className="text-2xl md:text-3xl lg:text-4xl font-bold md:px-6 mb-2 sm:mb-3 lg:mb-6 md:mb-4 transition-all duration-500">
        All Tasks
      </span>
      <div className="flex flex-row space-x-4 mb-6 md:mb-4 text-sm  md:px-6">
        {tags.map(({ name, href, tag }) => (
          <Link
            key={name}
            href={href}
            className={`${
              tag === filter_tag
                ? "tracking-wider font-bold text-black dark:text-white underline"
                : "text-black_darker dark:text-title_dark"
            } hover:text-black dark:hover:text-white duration-200 hover:underline`}
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col w-full gap-3 items-center">
        {taskData.map((task: Task, index: number) => (
          <TaskCard
            key={index}
            props={task}
            onDelete={deleteTask}
            onDone={updateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
