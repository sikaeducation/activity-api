import { populatePosts } from "@/tools/posts";
import { verifyWebHook } from "@/tools/github";

import type { Request, Response } from "express";

export default function RegeneratePostsRoute(
  request: Request,
  response: Response,
) {
  const rawSignature = request.get("X-Hub-Signature-256") || "";
  console.log("pre valid", verifyWebHook);
  const isValid =
    ["production", "test"].includes(process.env.NODE_ENV || "") &&
    verifyWebHook(request.body, rawSignature);
  console.log("post valid");
  if (isValid) {
    console.log("valid");
    populatePosts().then(() => response.status(200).send());
  } else {
    console.log("invalid");
    response.status(401).send();
  }
}
