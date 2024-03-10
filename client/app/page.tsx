"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const Tasks = () => {
  const searchParams = useSearchParams();
  const filter_tag = searchParams.get("tag");

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
            className={`${tag === filter_tag ? "tracking-wider font-bold text-black dark:text-white underline" : "text-black_darker dark:text-title_dark"} hover:text-black dark:hover:text-white duration-200 hover:underline`}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
