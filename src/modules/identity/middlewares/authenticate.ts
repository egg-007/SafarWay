
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedUser {
  userId: string;
  role: "admin" | "agent" | "passenger";
  fullName: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: {
        code: "AUTH_REQUIRED",
        message: "Authentication required",
      },
    });
  }

  const token = authHeader.slice("Bearer ".length).trim();
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    return res.status(token ? 500 : 401).json({
      error: {
        code: token ? "AUTH_CONFIG_ERROR" : "INVALID_TOKEN",
        message: token ? "Authentication is not configured" : "Invalid or expired token",
      },
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string" ||
      typeof decoded.fullName !== "string" ||
      !["admin", "agent", "passenger"].includes(decoded.role as string)
    ) {
      throw new Error("Invalid token payload");
    }

    req.user = {
      userId: decoded.userId,
      fullName: decoded.fullName,
      role: decoded.role as AuthenticatedUser["role"],
    };

    next();
  } catch {
    return res.status(401).json({
      error: {
        code: "INVALID_TOKEN",
        message: "Invalid or expired token",
      },
    });
  }
};
