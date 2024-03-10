import { Router, type IRouter } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router: IRouter = Router();

// register new user
// /users/register
router.post("/register", registerUser);

// login user
// /users/login
router.post("/login", loginUser);

export { router as users_router };
