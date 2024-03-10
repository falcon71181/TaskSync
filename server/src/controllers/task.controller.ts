import { Request, RequestHandler, Response } from "express";
import { TaskModel } from "../models/task.model";

// create task
const createTask: RequestHandler = async (req: Request, res: Response) => {
  try {
    let { title, description, tags } = req.body;
    const email = (req as Request & { email: string }).email;

    title = title.trim();
    description = description.trim();

    // create new task
    const newTask = await TaskModel.create({
      userEmail: email,
      title: title,
      description: description,
      isCompleted: false,
      tags: tags,
    });

    if (!newTask) {
      const error = "Error occured adding task";
      res.status(400).send({ error: error });
    }

    // Send success response
    res.status(200).send({
      message: "Task created successfully.",
    });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Internal server error." });
  }
};

export { createTask };
