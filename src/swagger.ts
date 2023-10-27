import feathersSwagger from "feathers-swagger";
import { Application } from "./declarations";

export function swagger(app: Application) {
  app.configure(feathersSwagger.customMethodsHandler).configure(
    feathersSwagger({
      specs: {
        info: {
          title: "Activity API",
          version: "1.0.0",
        },
        schemes: ["http", "https"],
        components: {
          securitySchemes: {
            BearerAuth: {
              type: "http",
              scheme: "bearer",
            },
          },
        },
        security: [{ BearerAuth: [] }],
      },
      prefix: "",
      ignore: {
        paths: [/authentication/i],
      },
      ui: feathersSwagger.swaggerUI({
        docsPath: "/docs",
      }),
    }),
  );
}
