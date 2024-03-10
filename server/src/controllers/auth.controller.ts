import { RequestHandler, Request, Response } from "express";
import { createToken } from "../lib/token";
import { UserModel } from "../models/user.model";
import type { User } from "../types/users.types";

// register user
const registerUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    let { username, email, password, confirmPassword } = req.body;

    // Trim whitespace from inputs
    username = username.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // Check for missing fields
    if (!username || !email || !password || !confirmPassword) {
      const error =
        "Require all following data: username, email, password, confirmPassword";
      return res.status(400).send({ error: error });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error = "Invalid email format.";
      return res.status(400).send({ error: error });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      const error = "Passwords do not match.";
      return res.status(400).send({ error: error });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      const error = "User already exist.";
      return res.status(409).send({ error: error });
    }

    const hashedPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 8,
    });

    // Create new user
    const newUser: User = await UserModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    //  create jwt token
    const token: string = createToken(newUser.email);

    // Send success response
    res.status(200).send({
      message: "User registered successfully.",
      username: username,
      token: token,
    });
  } catch (error) {
    // Handle errors
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Internal server error." });
  }
};

export { registerUser };