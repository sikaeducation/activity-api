import {
  body as webhookBody,
  signature as webhookSignature,
} from "$/webhook-token-fixture";
import { verifyToken } from "@/utilities/verify-token";
import { test, expect } from "vitest";

test("#verifyToken verifies good tokens", () => {
  // Key for the signature "valid"
  process.env.WEBHOOK_TOKEN = "HTRdIMlFw0";

  const isValid = verifyToken(webhookBody, webhookSignature);

  expect(isValid).toBe(true);
});

test("#verifyToken doesn't verify bad tokens", () => {
  // Key for the signature "valid"
  process.env.WEBHOOK_TOKEN = "HTRdIMlFw0";

  const isValid = verifyToken(
    { ...webhookBody, totallyWrong: "anything that doesn't belong there" },
    webhookSignature,
  );

  expect(isValid).toBe(false);
});
