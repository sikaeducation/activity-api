import { getPost } from "../services/posts";
import type { HookContext } from "@feathersjs/feathers";

const gitHubableTypes = ["Article", "Guide"];
type Activity = {
  post_slug?: string;
  _type: string;
  content?: string;
};

export function getAllContent(context: HookContext) {
  context.result = context.result.map((activity: Activity) => {
    if (gitHubableTypes.includes(activity._type)) {
      activity.content = getPost(activity.post_slug || "");
    }
    return activity;
  });

  return context;
}

export function getContent(context: HookContext) {
  if (gitHubableTypes.includes(context.result._type)) {
    context.result = {
      ...context.result,
      content: getPost(context.result.post_slug),
    };
  }
  return context;
}
