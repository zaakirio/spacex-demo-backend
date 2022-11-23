if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import { config } from "./config";
import { createServerless } from "./createServerless";
// import * as Sentry from "@sentry/serverless";
// import * as Tracing from "@sentry/tracing";

// Sentry.AWSLambda.init({
//   dsn: config.sentryDSN,
//   tracesSampleRate: 1.0,
//   environment: config.nodeEnv,
//   integrations: [
//     new Tracing.Integrations.Mysql(),
//     new Sentry.Integrations.Http({ tracing: true }),
//   ],
// });

exports.handler =
  // Sentry.AWSLambda.wrapHandler(
  async (event, context) => {
    if (config.nodeEnv === "production") {
      const fs = require("fs");
      const path = require("path");
      const directory = "/tmp";

      fs.readdir(directory, (err, files) => {
        if (err) {
          console.error(err);
          throw err;
        }
        for (const file of files) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) {
              console.error(err);
              throw err;
            }
          });
        }
      });
    }

    try {
      return await createServerless(event, context);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
// ,
//   { timeoutWarningLimit: 60 },
// );
