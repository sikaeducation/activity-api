import { Forbidden, NotAuthenticated } from "@feathersjs/errors";
import type { HookContext, NextFunction } from "@/declarations";
import { AuthPayload } from "@/authentication";

export const onlyCoaches = async (context: HookContext, next: NextFunction) => {
  const payload = context.params.payload as AuthPayload;
  const roles = payload?.["https://sikaeducation.com/roles"];
  if (!Array.isArray(roles)) {
    throw new NotAuthenticated("User not authenticated");
  }

  if (!roles.includes("coach")) {
    throw new Forbidden(
      `Client needs 'activity:admin' role, got: "${roles.join(", ")}"`,
    );
  }
  await next();
};
