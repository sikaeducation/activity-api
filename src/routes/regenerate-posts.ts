import { populatePosts } from "@/post-cache";
import { Request, Response } from "express";

export default function RegeneratePostsRoute(
  request: Request,
  response: Response,
) {
  console.log("got here");
  populatePosts().then(() => response.sendStatus(200));
}
