import { Schema, model, connect } from "mongoose";
import { IUser } from "../types/db.types";

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", UserSchema);

export { User as UserModel };
