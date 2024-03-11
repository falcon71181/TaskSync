import React from "react";
import type { Metadata } from "next";
import NavBar from "@/components/nav/NavBar";
import Providers from "./Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskSync",
  description:
    "TaskSync is a full-stack project for task management. It is a web application that allows bidirectional synchronization of task repositories, such as TaskWarrior and Google Tasks  . The project is designed to sync tasks between different task trackers and is offered on an as-is basis. It was originally developed for syncing tasks between TaskWarrior and Google Tasks, but other implementations may be supported in the future. Upon first execution, users will be prompted to authenticate and grant tasksync permission to access their Google Tasks data. It relies on third-party libraries to perform OAuth authentication, so users should check the URL during the authentication process . It's important to note that tasksync is in a relatively crude state and makes several assumptions about the end-user, namely that they are comfortable with programming . Overall, taskSync provides a command-line interface for syncing tasks between different task trackers and offers flexibility for users who are comfortable with programming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <section className="h-screen w-screen flex justify-center">
            <main className="h-full w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 flex flex-col transition-all duration-500">
              <NavBar />
              <React.Suspense>{children}</React.Suspense>
            </main>
          </section>
        </Providers>
      </body>
    </html>
  );
}
