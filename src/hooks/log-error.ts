import type { HookContext, NextFunction } from "@/declarations";
import { logger } from "../logger";
import { GeneralError } from "@feathersjs/errors";

export const logError = async (context: HookContext, next: NextFunction) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof GeneralError) {
      if ("stack" in error && process.env.NODE_ENV !== "test") {
        logger.error(error.stack);

        // Log validation errors
        if (error.data) {
          logger.error("Data: %O", error.data);
        }
      }
    }
    throw error;
  }
};
