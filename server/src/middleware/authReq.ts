import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../models/user.model";
import type { Request, Response, NextFunction } from "express";

// Secret key for JWT signing
const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

// Middleware function to authenticate requests
export const isAuth = async (
  req: Request & { email?: string }, // Attaching email to req object for next middleware or req handler
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract authorization header
    const { authorization } = req.headers;

    // Check if authorization header exists
    if (!authorization) {
      const error = "No JWT Token ";
      return res.status(401).send(error);
    }

    // Split authorization header to extract token
    const [bearer, token] = authorization.split(" ");

    // Check if the header is in the expected "Bearer <token>" format
    if (bearer !== "Bearer" || !token) {
      const error = "Invalid Authorization header format";
      return res.status(401).send(error);
    }

    // Verify JWT token
    const payload: JwtPayload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Extract email from JWT payload
    const { email } = payload;

    // Query database to find user by email
    const user = await UserModel.find({ email: email });

    // Check if user exists
    if (!user) {
      const error = "User doesn't exist";
      return res.status(404).send({ error });
    }

    // Attach email to request object for further middleware or route handlers
    req.email = email;

    // Call next middleware
    next();
  } catch (error) {
    // Handle errors
    res.status(500).send({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
