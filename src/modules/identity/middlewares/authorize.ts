import type { RequestHandler } from "express";
import type { Role } from "../domain/user.types.js";

type AuthRequest = Express.Request & {
  auth?: {
    userId: string;
    role: Role;
  };
};

export const authorize = (...allowedRoles: Role[]): RequestHandler => {
  return (req, res, next) => {
    const authReq = req as AuthRequest;

    if (!authReq.auth) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    if (!allowedRoles.includes(authReq.auth.role)) {
      res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
      return;
    }

    next();
  };
};