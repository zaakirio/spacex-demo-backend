import * as awsServerlessExpress from "aws-serverless-express";
import { createApp } from "./app";
import { ensureEnvVars } from "./config";

const createServerless = async (event, context) => {
  ensureEnvVars();
  try {
    process.setMaxListeners(100);
    process.on("warning", w => {
      console.error("=> warning => ", w.stack || w);
    });

    const app = await createApp();
    const server = awsServerlessExpress.createServer(app);

    if (event && event.body) {
      console.info(JSON.stringify({ body: event.body }));
    }

    return awsServerlessExpress.proxy(server, event, context, "PROMISE")
      .promise;
  } catch (error) {
    throw error;
  }
};

export { createServerless };
