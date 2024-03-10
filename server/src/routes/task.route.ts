import { Router, type IRouter } from "express";
import { isAuth } from "../middleware/authReq";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/task.controller";

const router: IRouter = Router();

// get all tasks
// /tasks/
router.get("/", isAuth, getAllTasks);

// create new task
// /tasks/create
router.post("/create", isAuth, createTask);

// delete particular task
// /tasks/:taskId/delete
router.delete("/:taskId/delete", isAuth, deleteTask);

// update task Status
// /tasks/:taskId/change
router.patch("/:taskId/change", isAuth, updateTaskStatus);

export { router as task_router };
