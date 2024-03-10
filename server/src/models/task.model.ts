import { Schema, model } from "mongoose";
import { ITask } from "../types/db.types";

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String },
  userEmail: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  tags: { type: [String] },
});

const Task = model<ITask>("Task", TaskSchema);

export { Task as TaskModel };
