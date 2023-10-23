import { populatePosts } from "@/post-cache";
import { verifyWebHook } from "@/tools/github";

import type { Request, Response } from "express";

export default function RegeneratePostsRoute(
  request: Request,
  response: Response,
) {
  const rawSignature = request.get("X-Hub-Signature-256") || "";
  const isValid =
    ["production", "test"].includes(process.env.NODE_ENV || "") &&
    verifyWebHook(request.body, rawSignature);
  if (isValid) {
    populatePosts().then(() => response.status(200).send());
  } else {
    response.status(401).send();
  }
}
