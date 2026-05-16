import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt";

const COOKIE_OPTS = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const }

// Generate Jwt Token for every new user
function issueTokens(res: Response, user: IUser) {
  const payload = { userId: user.id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  // Persist refresh token in database
  user.refreshToken = refreshToken;
  user.save();

  // Store refresh token in cookie (optional, for better security)
  res.cookie("refreshToken", refreshToken, { ...COOKIE_OPTS, maxAge: 7 * 24 * 60 * 60 * 1000 });
  return accessToken;

}


// ── Google ──────────────────────────────────────────────
export const googleAuthUser = (req: Request, res: Response) => {
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
};

export const googlecallBackAuthUser = [passport.authenticate('google', { session: false, failureRedirect: '/login' }),
(req: Request, res: Response) => {
  const accessToken = issueTokens(res, req.user as IUser);
  res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${accessToken}`);
}
];

export const facebookAuthUser = (req: Request, res: Response) => {
  passport.authenticate('facebook', { scope: ['email'], session: false });
}
export const facebookCallBackAuthUser = [passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
(req: Request, res: Response) => {
  const accessToken = issueTokens(res, req.user as IUser);
  res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${accessToken}`);
}
]

export const refreshAccessToken = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });
  try {
    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.userId);
    if (!user || user.refreshToken !== token) return res.status(403).json({ message: 'Invalid token' });
    const newAccess = signAccessToken({ userId: user.id, email: user.email });
    res.json({ accessToken: newAccess });
  } catch {
    res.status(403).json({ message: 'Token expired or invalid' });
  }
}

export const logoutUser = async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;
  if (token) {
    const user = await User.findOne({ refreshToken: token });
    if (user) {
      user.refreshToken = undefined;
      await user.save();
    }
    res.clearCookie("refreshToken", COOKIE_OPTS);
    res.json({ message: "Logged out successfully" });
  }
}



// Generate Jwt Token for every new user
const generateToken = (id: string) => {
  return jwt.sign(
    { id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  }
  );
}
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