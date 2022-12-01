import { keyBy } from "lodash/fp";
import { singularize } from "inflected";

import type { HookContext } from "@feathersjs/feathers";

export function serialize(context: HookContext) {
  context.result = {
    [singularize(context.path)]: { ...context.result },
  };
  return context;
}
export function serializeAll(context: HookContext) {
  const indexed = keyBy("_id")(context.result);
  context.result = {
    [context.path]: indexed,
  };
  return context;
}
