import { Request, Response } from "express";

export const HomeRoute = (_: Request, response: Response) => {
  response.json({
    description: "Sika's API for activities",
  });
};
