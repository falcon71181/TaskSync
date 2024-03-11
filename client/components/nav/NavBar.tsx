"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeSwitcher from "@/app/ThemeSwitcher";
import { usePathname } from "next/navigation";

type navItem = {
  name: string;
  href: string;
  target: "_self" | "_blank";
};

const navItems: navItem[] = [
  { name: "Login", href: "/login", target: "_self" },
  { name: "Register", href: "/register", target: "_self" },
];

const NavBar = () => {
  const SERVER = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3333";
  const pathname = usePathname();

  const [isLogin, setIsLogin] = useState(false);

  const logoutUser = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  useEffect(() => {
    // Verify User's jwt token
    const verifyUser = async () => {
      if (!localStorage.getItem("token")) return;

      const token = localStorage.getItem("token");
      const response = await fetch(`${SERVER}/users/validate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) setIsLogin(true);
    };
    verifyUser();
  }, []);

  return (
    <main className="w-full h-[3rem] flex items-center justify-between">
      <Link
        href="/"
        className="text-black dark:text-white_lighter text-xl md:text-2xl font-extrabold tracking-widest transition-all duration-500"
      >
        TaskSync
      </Link>
      <section className="flex items-center gap-4 md:gap-7 transition-all duration-500">
        {!isLogin &&
          navItems.map(({ name, href, target }) => (
            <Link
              key={name + href}
              href={href}
              target={target}
              className={`${pathname === href ? "dark:text-grny text-blue_light" : "text-black dark:text-[#ededed]/80 hover:text-blue_light dark:hover:text-grny"} text-sm md:text-lg font-sans transition-all duration-200`}
            >
              {name}
            </Link>
          ))}
        <ThemeSwitcher />
        {isLogin && (
          <div className="h-full flex gap-3 items-center text-lg">
            <div className="dark:text-white_lighter text-black tracking-wider font-medium">
              {localStorage.getItem("username")}
            </div>
            <button
              onClick={logoutUser}
              className="inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-red-300 font-medium text-sm rounded-md transition-colors cursor-pointer bg-transparent text-black dark:text-white hover:bg-red-400 dark:hover:bg-[#27272a] dark:hover:text-red-300"
            >
              Logout
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default NavBar;
