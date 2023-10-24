import { Forbidden, NotAuthenticated } from "@feathersjs/errors";
import type { HookContext, NextFunction } from "@/declarations";

type AuthenticatedHookContext = {
  params: {
    authentication: {
      payload: {
        "https://sikaeducation.com/role": "learner" | "coach";
      };
    };
    user?: {
      role: "learner" | "coach";
    };
  };
};

export const onlyCoaches = async (context: HookContext, next: NextFunction) => {
  let role = "";
  if (isAuthenticated(context)) {
    const authenticatedContext: AuthenticatedHookContext = context;
    role =
      authenticatedContext?.params.authentication?.payload[
        "https://sikaeducation.com/role"
      ] ?? authenticatedContext.params?.user?.role;
  }

  if (!role) {
    throw new NotAuthenticated("User not authenticated");
  }
  if (role !== "coach") {
    throw new Forbidden(`Need role 'coach', got role: ${role}`);
  }
  await next();
};

function isAuthenticated(
  context: AuthenticatedHookContext,
): context is AuthenticatedHookContext {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return !!context.params.authentication.payload[
    "https://sikaeducation.com/role"
  ];
}
