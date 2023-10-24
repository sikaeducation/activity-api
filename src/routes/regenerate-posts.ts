import { populatePosts } from "@/post-cache";
import { Request, Response } from "express";

export function regeneratePostsRoute(_: Request, response: Response) {
  populatePosts().then(() => response.sendStatus(200));
}
