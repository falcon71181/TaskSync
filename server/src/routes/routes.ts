import { Router, type IRouter } from "express";
import { user_router } from "./user.route";
import { task_router } from "./task.route";

const router: IRouter = Router();

// redirect to health api
router.get("/", (_req, res) => {
  res.redirect("/health");
});

// health check route
router.get("/health", (_req, res) => {
  res.sendStatus(200);
});

// users router
router.use("/users", user_router);

// tasks router
router.use("/tasks", task_router);

export default router;
