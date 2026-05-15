import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { issueJWT } from "../helpers/jwt";


// Generate Jwt Token for every new user
const generateToken = (id: string) => {
  return jwt.sign(
    { id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  }
  );
}
// ── Google ──────────────────────────────────────────────
export const googleAuthUser =  (req: Request, res: Response) => {
  passport.authenticate("google", { scope: ['profile', 'email'], session: false});
}
export const googlecallBackAuthUser =  [ passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    const token = issueJWT(req.user as IUser);

    // Store token in cookie (optional, for better security)
    res.cookie("token", token, {
      httpOnly: true, 
      secure: false, // false in local development if using http
      sameSite: "lax", // adjust based on your client-server setup
    });

    // Send token via  httpOnly cookie 
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
];
// Register User
export const registerUser = async (req: Request, res: Response) => {
  // handling request
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log("The register user ", firstName, lastName, email, password);

    // Check user exist already
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash passward
    const hashedPassward = await bcrypt.hash(password, 10);

    //  Create the user
    const user = await User.create({ firstName, lastName, email, password: hashedPassward });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id.toString()),
    })

  } catch (error) {
    res.status(500).json({ message: "Server Error while registering the user" });
  }
}

// Login User
export const loginUser = async (req: Request, res: Response) => {
  // handling request
  try {
    const { email, password } = req.body;
    console.log("Login user ", email, password);

    const user = await User.findOne({ email });

    // ✅ Step 1: Check user exists
    if (!user) {
      return res.status(400).json({ message: "User not exists!" });
    }

    // ✅ Step 2: Check password exists
    if (!user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Step 3: Check match the passward
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.json({
      _id: user?._id,
      email: user?.email,
      token: generateToken(user._id.toString()),
    })

  } catch (error) {
    res.status(500).json({ message: "Server error while login user" });
  }

}

export const profile = (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "login successfull",
    user: (req as any).user,
  })
}