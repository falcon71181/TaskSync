import { Request, RequestHandler, Response } from "express";
import { TaskModel } from "../models/task.model";

// get all tasks
const getAllTasks: RequestHandler = async (req: Request, res: Response) => {
  try {
    const email = (req as Request & { email: string }).email;
    const tasks = await TaskModel.find({ userEmail: email });

    if (tasks.length === 0) {
      const error = "No task found";
      res.status(404).send({ error: error });
    }

    res.status(200).send(tasks);
  } catch (error) {
    // Handle errors
    console.error("Error getting tasks:", error);
    res.status(500).send({ error: "Internal server error." });
  }
};

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

// delete task
const deleteTask = async (req: Request, res: Response) => {
  try {
    const email = (req as Request & { email: string }).email;
    const { taskId } = req.params;

    const task = await TaskModel.findById(taskId);

    if (!task) {
      const error = "Task not found.";
      return res.status(404).send({ error: error });
    }

    // only same user can continue
    if (task?.userEmail != email) {
      const error = "You donot have permissions.";
      return res.status(401).send({ error: error });
    }

    // deleting the task
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      const error = "Task not found. Invalid task id";
      return res.status(404).send({ error });
    }

    res.status(200).send({ message: "Task deleted successfully." });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Internal server error." });
  }
};

export { getAllTasks, createTask, deleteTask };
