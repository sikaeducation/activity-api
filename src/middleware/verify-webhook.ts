import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { NotAuthenticated } from "@feathersjs/errors";

export function verifyWebhookMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const rawSignature = request.get("X-Hub-Signature-256") || "";

  if (verifyWebHook(request.body, rawSignature)) {
    next();
  } else {
    next(new NotAuthenticated({ error: "Bad webhook signature" }));
  }
}

export function verifyWebHook(body: unknown, rawSignature: string) {
  const signature = Buffer.from(rawSignature, "utf8");
  const GITHUB_WEBHOOK_TOKEN = process.env.GITHUB_WEBHOOK_TOKEN || "";

  const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_TOKEN);
  const digest = Buffer.from(
    `sha256=${hmac.update(JSON.stringify(body)).digest("hex")}`,
    "utf8",
  );

  return crypto.timingSafeEqual(signature, digest);
}
