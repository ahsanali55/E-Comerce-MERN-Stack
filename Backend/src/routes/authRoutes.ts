import express, { Request, Response } from "express"
import { loginUser, registerUser, profile, googleAuthUser, googlecallBackAuthUser } from "../controllers/authController";

import { requireAuth } from "../middleware/requireAuth";
import { protect } from "../middleware/authMiddleware";


const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/profile", protect, profile);
authRouter.get("/google", googleAuthUser);
authRouter.get("/google/callback", googlecallBackAuthUser);
// ── Me (protected) ──────────────────────────────────────
authRouter.get('/me', requireAuth, (req: Request, res: Response) => {
  res.json({ user: (req as any).user });
});

export default authRouter;

