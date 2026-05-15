import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";


// // Extend Request type
// export interface AuthRequest extends Request {
//   user?: IUser;
// }

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Get token from header
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as { id: string };


      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({message: "User not found"});
      }
      // Attach user to request
      (req as any).user = user;

      next();

    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token, not authorized" });
  }
};