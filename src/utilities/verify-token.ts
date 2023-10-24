import crypto from "crypto";

export function verifyToken(body: unknown, rawSignature: string) {
  const signature = Buffer.from(rawSignature, "utf8");
  const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN || "";

  const hmac = crypto.createHmac("sha256", WEBHOOK_TOKEN);
  const digest = Buffer.from(
    `sha256=${hmac.update(JSON.stringify(body)).digest("hex")}`,
    "utf8",
  );

  return crypto.timingSafeEqual(signature, digest);
}
