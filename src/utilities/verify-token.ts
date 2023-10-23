import crypto from "crypto";

export function verifyToken(body: unknown, rawSignature: string) {
  const signature = Buffer.from(rawSignature, "utf8");
  const GITHUB_WEBHOOK_TOKEN = process.env.GITHUB_WEBHOOK_TOKEN || "";

  const hmac = crypto.createHmac("sha256", GITHUB_WEBHOOK_TOKEN);
  const digest = Buffer.from(
    `sha256=${hmac.update(JSON.stringify(body)).digest("hex")}`,
    "utf8",
  );

  return crypto.timingSafeEqual(signature, digest);
}
