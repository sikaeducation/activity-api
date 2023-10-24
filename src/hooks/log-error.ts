import type { HookContext, NextFunction } from "@/declarations";
import { logger } from "../logger";

export const logError = async (context: HookContext, next: NextFunction) => {
  try {
    await next();
  } catch (error: any) {
    if (process.env.NODE_ENV !== "test") {
      logger.error(error.stack);

      // Log validation errors
      if (error.data) {
        logger.error("Data: %O", error.data);
      }
    }
    throw error;
  }
};
