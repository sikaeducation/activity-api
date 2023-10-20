import { getPost } from "../tools/posts";
import type { HookContext } from "@feathersjs/feathers";
import {
  type ArticleDocument,
  areArticles,
  isArticle,
} from "../models/Article";

const gitHubableTypes = ["Article", "Guide"];

export function getAllContent(context: HookContext) {
  if (!areArticles(context.result)) {
    return context;
  }
  context.result = context.result?.map((activity: ArticleDocument) => {
    if (gitHubableTypes.includes(activity._type)) {
      activity.content = getPost(activity.post_slug || "");
    }
    return activity;
  });

  return context;
}

export function getContent(context: HookContext) {
  if (!isArticle(context.result)) {
    return context;
  }
  if (
    context.result?.post_slug &&
    context.result?._type &&
    gitHubableTypes.includes(context.result._type)
  ) {
    context.result = {
      ...context.result,
      content: getPost(context.result.post_slug),
    };
  }
  return context;
}
