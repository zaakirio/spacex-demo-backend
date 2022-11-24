if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import * as awsServerlessExpress from "aws-serverless-express";

import { createApp } from "./app";
import { ensureEnvVars } from "./config";

// const Sentry = require("@sentry/serverless");
// const Tracing = require("@sentry/tracing");

// Sentry.AWSLambda.init({
//   dsn: config.sentryDsn,
//   environment:
//     process.env.NODE_ENV !== "production" ? "development" : "production",
//   integrations: [
//     new Tracing.Integrations.Mysql(),
//     new Sentry.Integrations.Http({ tracing: true }),
//   ],
//   tracesSampleRate: 1.0,
//   breadcrumbs: true,
// });

exports.handler =
  // Sentry.AWSLambda.wrapHandler(

  async (event, context) => {
    ensureEnvVars();
    try {
      process.setMaxListeners(0);
      process.on("warning", w => {
        console.error("=> warning => ", w.stack || w);
      });

      const app = await createApp();
      const server = awsServerlessExpress.createServer(app);

      try {
        if (event && event.body) {
          console.info(JSON.stringify({ body: event.body }));
        }
      } catch {}

      return awsServerlessExpress.proxy(server, event, context, "PROMISE")
        .promise;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
