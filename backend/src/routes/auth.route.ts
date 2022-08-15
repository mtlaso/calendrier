/**
 * Authendication route
 */

import { Router } from "express";

const authRouter = Router();

authRouter.get("/register", async (req, res) => {
  res.send("Hello World from authRouter!");
});

export default authRouter;
