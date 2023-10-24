import { article } from "./article/article";
import { vocab } from "./vocab/vocab";
import { activity } from "./activity/activity";
import type { Application } from "@/declarations";

export const services = (app: Application) => {
  app.configure(article);
  app.configure(vocab);
  app.configure(activity);
  // All services will be registered here
};
