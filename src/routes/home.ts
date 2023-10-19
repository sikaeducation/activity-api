import { Request, Response } from "express";

export default function HomeRoute(_: Request, response: Response) {
  response.json({
    description: "Sika's API for activities",
  });
}
