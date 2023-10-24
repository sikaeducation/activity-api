import { Forbidden, NotAuthenticated } from "@feathersjs/errors";
import type { HookContext, NextFunction } from "@/declarations";
import { AuthenticatedHookContext, isAuthenticated } from "@/authentication";

export const onlyCoaches = async (context: HookContext, next: NextFunction) => {
  let role = "";
  if (isAuthenticated(context)) {
    const authenticatedContext: AuthenticatedHookContext = context;
    role =
      authenticatedContext.params.authentication.payload[
        "https://sikaeducation.com/role"
      ];
  }

  if (!role) {
    throw new NotAuthenticated("User not authenticated");
  }
  if (role !== "coach") {
    throw new Forbidden(`Client needs 'coach' role, got: "${role}"`);
  }
  await next();
};
