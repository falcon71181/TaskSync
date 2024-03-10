import { Router, type IRouter } from "express";
import { isAuth } from "../middleware/authReq";
import { registerUser, loginUser } from "../controllers/auth.controller";

const router: IRouter = Router();

// validate user token
// /users/validate
router.get("/validate", isAuth, (_req, res) => {
  res.sendStatus(200);
});

// register new user
// /users/register
router.post("/register", registerUser);

// login user
// /users/login
router.post("/login", loginUser);

export { router as user_router };
