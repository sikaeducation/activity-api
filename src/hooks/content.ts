import { getPost } from "../tools/posts";
import type { HookContext } from "@feathersjs/feathers";
import {
  type ArticleService,
  type ArticleParams,
} from "../services/article/article";
import { Application } from "../declarations";

const gitHubableTypes = ["Article", "Guide"];

export function getAllContent(context: HookContext<Application, Article>) {
  if (Array.isArray(context.result)) {
    context.result = context.result.map((activity: Article) => {
      if (gitHubableTypes.includes(activity._type)) {
        return {
          ...activity,
          content: getPost(activity.post_slug || ""),
        } as const;
      }
      return activity;
    });
  }

  return context;
}

export function getContent(
  context: HookContext<Application, ArticleService<ArticleParams>>,
) {
  if (context.result && context.result?.post_slug) {
    context.result = {
      ...context.result,
      content: getPost(context.result.post_slug),
    };
  }
  return context;
}
