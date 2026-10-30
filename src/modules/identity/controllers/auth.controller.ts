import { injectable, inject } from "inversify";
import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";

@injectable()
export class AuthController {
  constructor(
    @inject(AuthService) protected readonly     authService: AuthService,
  ) {}
  Signup = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.authService.create(req.body);
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login(email, password);

      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
