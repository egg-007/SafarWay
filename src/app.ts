import express from "express";
import modulesRouter from "./modules/index.js";
const app = express();

app.use(express.json());
app.use("/api/v1", modulesRouter);
app.get("/", (req, res) => {
  res.json({ message: "SafarWay now in your city " });
});

export default app;