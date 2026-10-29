import type { Request, Response, NextFunction, RequestHandler } from "express";

import jwt, { type JwtPayload } from "jsonwebtoken";
import { Role } from "../domain/user.types.js";
type AuthRequest = Express.Request & {
  auth?: {
    userId: string;
    role: Role;
  };
};

interface AuthPayload extends JwtPayload {
  sub: string;
  role: Role;
}

export const authenticate: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication token is required",
      },
    });
    return;
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication token is required",
      },
    });
    return;
  }

  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Authentication configuration error",
      },
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded === "string" ||
      typeof decoded.sub !== "string" ||
      !Object.values(Role).includes(decoded.role as Role)
    ) {
      res.status(401).json({
        success: false,
        error: {
          code: "INVALID_TOKEN",
          message: "Invalid authentication token",
        },
      });
      return;
    }

    const payload = decoded as AuthPayload;

     (req as AuthRequest).auth = {
      userId: decoded.sub,
      role: decoded.role as Role,
    };


    next();
  } catch {
    res.status(401).json({
      success: false,
      error: {
        code: "INVALID_TOKEN",
        message: "Invalid or expired authentication token",
      },
    });
  }
};
