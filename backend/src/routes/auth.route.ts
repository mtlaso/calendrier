/**
 * Authendication route
 */

import { Router } from "express";

const authRouter = Router();

authRouter.get("/register", async (req, res) => {
  res.send("Hello World from authRouter!");
});

authRouter.get("/login", async (req, res) => {
  res.send("Hello World from authRouter!");
});

authRouter.post("/login", async (req, res) => {
  res.json({ message: "Hello World from authRouter!", statusCode: 200 });
});

export default authRouter;
