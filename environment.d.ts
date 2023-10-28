declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      WEBHOOK_TOKEN: string;
      REPO_TOKEN: string;
      AUTH_KEY_URL: string;
      DATABASE_URL: string;
      SENTRY_URL: string;
    }
  }
}
