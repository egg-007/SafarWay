import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { container } from "../../../bootstrap/container.js";
const router = Router();
const authController = container.get(AuthController);


router.post('/signup',authController.Signup)
router.post('/login',authController.login)
export const AuthRouter= router;