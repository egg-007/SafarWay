import { z } from "zod";
import { Role } from "../domain/user.types.js";

export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email id required")
      .email("please provide a valid email addres"),
    password: z.string().min(1, "Password is required"),
  })
  .strict();

export const signupSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must contain at least 2 characters")
      .max(50, "First name cannot exceed 50 characters"),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must contain at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters"),

    email: z
      .string()
      .trim()
      .email("Please provide a valid email address")
      .transform((email) => email.toLowerCase()),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .max(72, "Password cannot exceed 72 characters"),

    role: z.nativeEnum(Role).optional(),
  })
  .strict();

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
