import type { RequestHandler } from "express";
import {z} from "zod";

export const validateBody = (
    schema: z.ZodType,
): RequestHandler => {
    return (req,res,next)=>{
        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Invalid request body",
                    details: result.error.issues.map((issue)=>({
                        fiels: issue.path.join("."),
                        message: issue.message,
                    })),
                },
            });
        }
        req.body = result.data;
        next();
    };
};