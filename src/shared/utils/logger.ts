import pino from "pino";
import pinoHttp from "pino-http";

const isDev = process.env.NODE_ENV !== "production";

export const logger = pino({
  level:
    process.env.NODE_ENV === "test"
      ? "silent"
      : process.env.LOG_LEVEL || "info",
  transport: isDev ? { target: "pino-pretty" } : undefined,
});

export const httpLogger = pinoHttp({
  logger,

  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    }
    return "info";
  },

  autoLogging: {
    ignore: (req) => req.url === "/health",
  },
});
