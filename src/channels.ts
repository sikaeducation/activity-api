import type { RealTimeConnection } from "@feathersjs/feathers";
import "@feathersjs/transport-commons";
import type { Application, HookContext } from "./declarations";

export const channels = (app: Application) => {
  app.on("connection", (connection: RealTimeConnection) => {
    app.channel("anonymous").join(connection);
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data: unknown, context: HookContext) => {
    return app.channel("authenticated");
  });
};
