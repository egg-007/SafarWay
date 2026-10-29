import { Router } from "express";

import { identityRouter } from "./identity/index.js";


const router = Router();

router.use("/identity", identityRouter);

export default router;