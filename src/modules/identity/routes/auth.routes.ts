import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { container } from "../../../bootstrap/container.js";
import { loginSchema, signupSchema } from "../validation/validation.js";
import { validateBody } from "../middlewares/validation.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { Role } from "../domain/user.types.js";

const router = Router();
const authController = container.get(AuthController);

router.post("/signup", validateBody(signupSchema), authController.Signup);

router.post("/login", validateBody(loginSchema), authController.login);

router.get("/admin", authenticate, authorize(Role.ADMIN), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});

export const AuthRouter = router;
