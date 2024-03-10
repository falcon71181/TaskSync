import { Router, type IRouter } from "express";
import { users_router } from "./users";

const router: IRouter = Router();

// health check route
router.get("/health", (_req, res) => {
  res.sendStatus(200);
});

// users router
router.use("/users", users_router);

export default router;
