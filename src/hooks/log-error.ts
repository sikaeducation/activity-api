/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { HookContext, NextFunction } from "@/declarations";
import { logger } from "../logger";

export const logError = async (context: HookContext, next: NextFunction) => {
  try {
    await next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error(error.stack);

    // Log validation errors
    if (error.data) {
      logger.error("Data: %O", error.data);
    }

    throw error;
  }
};
