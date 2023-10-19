declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      LOCAL_POSTS_FOLDER: string;
      GITHUB_POSTS_BASE: string;
      GITHUB_WEBHOOK_TOKEN: string;
      GITHUB_TOKEN: string;
      AUTH_KEY_URL: string;
      DATABASE_URL: string;
    }
  }
}
