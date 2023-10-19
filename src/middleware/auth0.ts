import jwt, { GetPublicKeyOrSecret, JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import type { Request, Response } from "express";

export type AuthenticatedRequest = Request & {
  user?: {
    email: string;
    role: string;
  };
};

export function authenticate(
  request: AuthenticatedRequest,
  _: Response,
  next: (error: Error | undefined) => void,
) {
  const token = request.get("authorization") || "";
  const extractedToken = token.split(" ")[1];
  const { verify } = jwt;

  const client = jwksClient({
    jwksUri: process.env.AUTH_KEY_URL || "",
  });

  const getKey: GetPublicKeyOrSecret = (header, callback) => {
    client.getSigningKey(header.kid, (error, key) => {
      const signingKey = key?.getPublicKey() || "";
      callback(error, signingKey);
    });
  };

  verify(extractedToken, getKey, (error, decodedJwt) => {
    if (decodedJwt && isJwtPayload(decodedJwt)) {
      request.user = {
        email: decodedJwt["https://sikaeducation.com/email"],
        role: decodedJwt["https://sikaeducation.com/role"],
      }!;
    }
    next(error as Error | undefined);
  });
}

function isJwtPayload(
  jwtPayload: JwtPayload | string,
): jwtPayload is JwtPayload & {
  "https://sikaeducation.com/email": string;
  "https://sikaeducation.com/role": string;
} {
  return (
    typeof jwtPayload !== "string" &&
    "https://sikaeducation.com/email" in jwtPayload &&
    "https://sikaeducation.com/role" in jwtPayload
  );
}
