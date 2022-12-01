import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import type { Request, Response } from "express";

export type AuthenticatedRequest = Request & {
  user?: {
    email: string;
    role: string;
  };
};

export async function authenticate(
  request: AuthenticatedRequest,
  response: Response,
  next: (error: Error | undefined) => void
) {
  const token = request.get("authorization") || "";
  const { verify } = jwt;

  const client = jwksClient({
    jwksUri: process.env.AUTH_KEY_URL || "",
  });

  const getKey = (
    header: any,
    callback: (error: Error | null, signingKey: string) => void
  ) => {
    client.getSigningKey(header.kid, (error, key) => {
      const signingKey = key?.getPublicKey() || "";
      callback(error, signingKey);
    });
  };

  verify(token, getKey, (error, decodedJwt: any) => {
    if (decodedJwt) {
      request.user = {
        email: decodedJwt["https://sikaeducation.com/email"],
        role: decodedJwt["https://sikaeducation.com/role"],
      };
    }
    next(error as Error | undefined);
  });
}
