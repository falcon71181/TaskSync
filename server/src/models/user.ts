import { Schema, model, connect } from "mongoose";
import { IUser } from "../types/db.types";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", UserSchema);

export default User;
