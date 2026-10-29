import mongoose, { Schema, Document } from "mongoose";
import { Role } from "../domain/user.types.js";
export interface Iuser extends Document {
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  password: string;
}
const userSchema = new Schema<Iuser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CLIENT,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
export const User = mongoose.model<Iuser>("User", userSchema);
