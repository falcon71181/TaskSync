import { Router, type IRouter } from "express";
import { isAuth } from "../middleware/authReq";
import { createTask } from "../controllers/task.controller";

const router: IRouter = Router();

// create new task
// /tasks/create
router.post("/create", isAuth, createTask);

export { router as task_router };
