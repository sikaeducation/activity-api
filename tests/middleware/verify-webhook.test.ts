import {
  body as webhookBody,
  signature as webhookSignature,
} from "./webhook-token-fixture";
import { verifyWebHook } from "@/middleware/verify-webhook";
import { test, expect } from "vitest";

test("#verifyWebHook verifies good tokens", () => {
  // Key for the signature "valid"
  process.env.GITHUB_WEBHOOK_TOKEN = "HTRdIMlFw0";

  const isValid = verifyWebHook(webhookBody, webhookSignature);

  expect(isValid).toBe(true);
});

test("#verifyWebHook doesn't verify bad tokens", () => {
  // Key for the signature "valid"
  process.env.GITHUB_WEBHOOK_TOKEN = "HTRdIMlFw0";

  const isValid = verifyWebHook(
    { ...webhookBody, totallyWrong: "anything that doesn't belong there" },
    webhookSignature,
  );

  expect(isValid).toBe(false);
});
