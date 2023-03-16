import "dotenv/config";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export interface AuthTokenPayload {
  userId?: string;
  role?: string;
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    throw new Error("No token was found");
  }
  try {
    // @ts-ignore
    const data = jwt.verify(token, SECRET);
    return data as AuthTokenPayload;
  } catch (error: any) {
    return {} as AuthTokenPayload;
  }
}

export interface Context {
  userId?: string;
  role?: string;
}

export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return {
    userId: token?.userId,
    role: token?.role,
  };
};
