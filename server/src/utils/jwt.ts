import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

interface TokenPayload {
  userId: number;
  username: string;
}

export function signToken(payload: TokenPayload): string {
  const secret: Secret = env.JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: env.JWT_EXPIRY, algorithm: "HS256" } as any);
}

export function verifyToken(token: string): TokenPayload {
  const secret: Secret = env.JWT_SECRET;
  return jwt.verify(token, secret, { algorithms: ["HS256"] }) as TokenPayload;
}
