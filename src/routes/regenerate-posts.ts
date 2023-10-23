import { populatePosts } from "@/post-cache";
import { Request, Response } from "express";

export default function RegeneratePostsRoute(
  request: Request,
  response: Response,
) {
  populatePosts().then(() => response.sendStatus(200));
}
