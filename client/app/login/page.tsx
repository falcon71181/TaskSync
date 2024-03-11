"use client";

import React, { useState, SyntheticEvent } from "react";
import Link from "next/link";
import { LoginFormData } from "@/types/formData";

const Login: React.FC = () => {
  const SERVER = process.env.NEXT_PUBLIC_SERVER || "http://localhost:3333";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  // handle submission
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const formData: LoginFormData = {
        email: email as string,
        password: password as string,
      };

      const response = await fetch(`${SERVER}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        // Add data to local Storage
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.username);

        // redirecting to Home page after Login
        window.location.replace("/");
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

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-96 rounded-2xl border-[1px] dark:border-gray-300 bg-slate-900 dark:bg-background">
        <div className="flex flex-col gap-5 p-8">
          <p className="text-center text-3xl text-gray-300 mb-4">Login</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            required
          />
          {error && (
            <div className="text-red-400 font-semibold">Error : {error}</div>
          )}
          <h1 className="text-sm text-[#7f8ea3] text-center">
            Don't have an account?
            <Link
              className="ml-3 underline underline-offset-4 decoration-[#e1e7ef]/40 hover:decoration-[#e1e7ef]/80"
              href="/register"
            >
              Register Now
            </Link>
          </h1>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
};
export default Login;
