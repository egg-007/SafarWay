import { AuthRouter } from "./routes/auth.routes.js";
import { Router } from "express";
const router = Router();
router.use("/auth", AuthRouter);
export const identityRouter = router;