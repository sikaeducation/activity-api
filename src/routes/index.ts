import { Router } from "@feathersjs/express";
import { Request, Response } from "express";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.json({
    description: "Sika's API for activities (articles, quizzes, lessons, etc.)",
  });
});

export default router;
