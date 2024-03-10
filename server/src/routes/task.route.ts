import { Router, type IRouter } from "express";
import { isAuth } from "../middleware/authReq";
import {
  getAllTasks,
  createTask,
  deleteTask,
} from "../controllers/task.controller";

const router: IRouter = Router();

// get all tasks
// /tasks/
router.get("/", isAuth, getAllTasks);

// create new task
// /tasks/create
router.post("/create", isAuth, createTask);

// delete particular task
// /tasks/delete
router.delete("/:taskId/delete", isAuth, deleteTask);

export { router as task_router };
