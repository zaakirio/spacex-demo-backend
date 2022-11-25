if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { ApolloServer } = require('@apollo/server');
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
const { expressMiddleware } = require('@apollo/server/express4');
const serverlessExpress = require('@vendia/serverless-express');
const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
import { typeDefs, resolvers } from './routes/graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

const app = express();
app.use(
  cors(),
  json(),
  expressMiddleware(server, {
    // The Express request and response objects are passed into
    // your context initialization function
    context: async ({ req, res }) => {
      // Here is where you'll have access to the
      // API Gateway event and Lambda Context
      const { event, context } = serverlessExpress.getCurrentInvoke();
      return {
        expressRequest: req,
        expressResponse: res,
        lambdaEvent: event,
        lambdaContext: context,
      };
    },
  }),
);

exports.handler = serverlessExpress({ app });

// import * as awsServerlessExpress from "aws-serverless-express";

// import { createApp } from "./app";
// import { ensureEnvVars } from "./config";

// // const Sentry = require("@sentry/serverless");
// // const Tracing = require("@sentry/tracing");

// // Sentry.AWSLambda.init({
// //   dsn: config.sentryDsn,
// //   environment:
// //     process.env.NODE_ENV !== "production" ? "development" : "production",
// //   integrations: [
// //     new Tracing.Integrations.Mysql(),
// //     new Sentry.Integrations.Http({ tracing: true }),
// //   ],
// //   tracesSampleRate: 1.0,
// //   breadcrumbs: true,
// // });

// exports.handler =
//   // Sentry.AWSLambda.wrapHandler(

//   async (event, context) => {
//     ensureEnvVars();
//     try {
//       process.setMaxListeners(0);
//       process.on("warning", w => {
//         console.error("=> warning => ", w.stack || w);
//       });

//       const app = await createApp();
//       const server = awsServerlessExpress.createServer(app);

//       try {
//         if (event && event.body) {
//           console.info(JSON.stringify({ body: event.body }));
//         }
//       } catch {}

//       return awsServerlessExpress.proxy(server, event, context, "PROMISE")
//         .promise;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   };
