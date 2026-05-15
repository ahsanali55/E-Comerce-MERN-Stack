import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export interface Jwtpayload {
  id: string;
  email: string;
  name: string;
}
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized, no token provided"});

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as Jwtpayload;
    (req as any).user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
} 