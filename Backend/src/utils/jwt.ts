import jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
  email:  string;
}

export const signAccessToken = (payload: TokenPayload) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' });

export const signRefreshToken = (payload: TokenPayload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as TokenPayload;

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as TokenPayload;