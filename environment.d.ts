import type { Application } from "@/declarations";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      WEBHOOK_TOKEN: string;
      REPO_TOKEN: string;
      AUTH_KEY_URL: string;
      DATABASE_URL: string;
    }
  }
}

declare module "#/src/app" {
  export function app(): Application;
}
