import express from "express";
import { populatePosts } from "../services/posts";
import { verifyWebHook } from "../services/github";

import type { Request, Response } from "express";

const router = express.Router();

router.post(
  "/regenerate-posts",
  async (request: Request, response: Response) => {
    const rawSignature = request.get("X-Hub-Signature-256") || "";
    const isValid =
      ["production", "test"].includes(process.env.NODE_ENV || "") &&
      verifyWebHook(request.body, rawSignature);
    if (isValid) {
      await populatePosts();
      response.status(200).send();
    } else {
      response.status(401).send();
    }
  }
);

export default router;
