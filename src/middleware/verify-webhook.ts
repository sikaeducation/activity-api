import { Request, Response, NextFunction } from "express";
import { NotAuthenticated } from "@feathersjs/errors";
import { verifyToken } from "@/utilities/verify-token";

export function verifyWebhookMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const rawSignature = request.get("X-Hub-Signature-256") || "";

  if (verifyToken(request.body, rawSignature)) {
    next();
  } else {
    next(new NotAuthenticated("Bad webhook signature"));
  }
}
