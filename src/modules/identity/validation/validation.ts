import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().trim().min(1,"Email id required").email("please provide a valid email addres"),
    password: z.string().min(1,"Password is required"),
}).strict();

export type LoginInput = z.infer<typeof loginSchema>;