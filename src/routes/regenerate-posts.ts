import express from "express";
import { populatePosts } from "../services/posts";
import { verifyWebHook } from "../services/github";

import type { Request, Response } from "express";

const router = express.Router();

router.post(
  "/regenerate-posts",
  async (request: Request, response: Response) => {
    const signature = Buffer.from(
      request.get("X-Hub-Signature-256") || "",
      "utf8"
    );
    const isValid =
      process.env.NODE_ENV === "production" &&
      verifyWebHook(request.body, signature);
    if (isValid) {
      await populatePosts();
      response.status(200).send();
    } else {
      response.status(401).send();
    }
  }
);

export default router;
