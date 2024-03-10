import { Router, type IRouter } from "express";
import { registerUser } from "../controllers/auth.controller";

const router: IRouter = Router();

// register new user
// /users/register
router.post("/register", registerUser);

export { router as users_router };
