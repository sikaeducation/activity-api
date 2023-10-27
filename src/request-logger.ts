import expressWinston from "express-winston";
import winston from "winston";
import { Application } from "@/declarations";

export function requestLogger(app: Application) {
  if (process.env.NODE_ENV === "dev") {
    app.use(
      expressWinston.logger({
        transports: [new winston.transports.Console()],
        meta: false,
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf((info) => `${info.message}`),
        ),
        msg: "{{req.method}}\t{{req.path}}\t{{res.statusCode}}",
        colorize: true,
      }),
    );
  }
}
