"use client";
import React, { useState, useEffect, SyntheticEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TaskCard from "@/components/task/TaskCard";
import withAuth from "@/middleware/withAuth";
import { IoAdd } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import type { Task } from "@/types/tasks";
import { AddTaskFormData } from "@/types/formData";

const Tasks = () => {
  const SERVER = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3333";
  const searchParams = useSearchParams();
  const filter_tag = searchParams.get("tag");

  const [taskData, setTaskData] = useState<Task[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState();

  // handle submission
  const handleAddTask = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const formData: AddTaskFormData = {
        title: title as string,
        description: description as string,
      };

      const response = await fetch(`${SERVER}/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        setIsAddTaskOpen(false);
      } else {
        // Handle Login failure
        setError(result.error);
        console.error("Login failed");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
    }
  };

  // toggle add task Form
  const toggleTaskForm = () => {
    setIsAddTaskOpen(!isAddTaskOpen);
  };

  // close add task form
  const closeTaskForm = () => {
    setIsAddTaskOpen(false);
  };

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
      // Update toggle the isCompleted field of task
      setTaskData((prevTaskData) =>
        prevTaskData.map((task) => {
          if (task._id === id) {
            return {
              ...task,
              isCompleted: !task.isCompleted,
            };
          }
          return task;
        }),
      );
    } else {
      // TODO make it better
      alert("Something went wrong");
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
          // reversing it
          setTaskData(data.reverse());
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
    <div className="relative w-full h-full overflow-y-auto p-5 flex flex-col items-center gap-1 text-black dark:text-white_light">
      <section className="w-full absolute top-3 flex flex-col justify-start">
        <div className="flex justify-between w-full items-center font-bold md:px-6 mb-2 sm:mb-3 lg:mb-6 md:mb-4 transition-all duration-500">
          <span className="text-2xl">All Tasks</span>
          <span className="cursor-pointer text-4xl lg:text-5xl hover:text-blue_light dark:hover:text-grny transition-all duration-200">
            <IoAdd onClick={toggleTaskForm} />
          </span>
        </div>
        <div className="flex flex-row justify-start w-full space-x-4 mb-6 md:mb-4 text-sm  md:px-6">
          {tags.map(({ name, href, tag }) => (
            <Link
              key={name}
              href={href}
              className={`${tag === filter_tag
                  ? "tracking-wider font-bold text-black dark:text-white underline"
                  : "text-black_darker dark:text-title_dark"
                } hover:text-black dark:hover:text-white duration-200 hover:underline`}
            >
              {name}
            </Link>
          ))}
        </div>
      </section>
      <div className=" pt-32 flex flex-col w-full gap-3 items-center">
        {taskData
          .filter((task: Task) => {
            if (filter_tag === "completed") {
              return task.isCompleted === true;
            } else if (filter_tag === "inProgress") {
              return task.isCompleted === false;
            } else {
              return true;
            }
          })
          .map((task: Task, index: number) => (
            <TaskCard
              key={index}
              props={task}
              onDelete={deleteTask}
              onDone={updateStatus}
            />
          ))}
      </div>
      <main
        className={`${isAddTaskOpen ? "flex" : "hidden"} absolute justify-center items-center`}
      >
        <div className="relative flex justify-center items-center w-[20rem] sm:w-[25rem] md:w-[30rem] lg:w-[40rem] rounded-2xl border-[1px] dark:border-gray-300 bg-slate-700 dark:bg-background transition-all duration-500">
          <div className="absolute top-2 right-4 text-4xl cursor-pointer hover:text-red-300 transition-all duration-200">
            <IoMdClose onClick={closeTaskForm} />
          </div>
          <div className="flex flex-col items-center gap-5 p-8 w-full sm:w-[20rem] md:w-[30rem] lg:w-[40rem] transition-all duration-500">
            <p className="text-center text-3xl text-gray-300 mb-4">Add Task</p>
            <input
              type="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title"
              required
            />
            <textarea
              value={description}
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description"
              required
            />
            {error && (
              <div className="text-red-400 font-semibold">Error : {error}</div>
            )}
            <button
              onClick={handleAddTask}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Add Task
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(Tasks);
