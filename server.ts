if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import { ApolloServer } from '@apollo/server';
import { config } from './config';
import { expressMiddleware } from '@apollo/server/express4';
import serverlessExpress, { getCurrentInvoke } from '@vendia/serverless-express';
import * as express from 'express';
import * as core from 'express-serve-static-core';
import { json } from 'body-parser';
import cors from 'cors';
import { typeDefs, resolvers } from './routes/graphql';
import { jwtController } from './controllers';
import * as Sentry from '@sentry/serverless';
import * as Tracing from '@sentry/tracing';
import { RateLimiterMiddleware } from './middlewares';
import { sync } from './models';
import helmet from 'helmet';

Sentry.AWSLambda.init({
  dsn: config.sentryDsn,
  environment: config.nodeEnv,
  integrations: [new Tracing.Integrations.Mysql(), new Sentry.Integrations.Http({ tracing: true })],
  tracesSampleRate: 1.0,
  debug: config.nodeEnv !== 'production',
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: config.nodeEnv !== 'production',
});

server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

const getIpAddress = (request: express.Request): string | undefined => {
  //@ts-ignore
  return request.clientIp || undefined;
};

const getDeviceUniqueIdentifier = (request: express.Request): string | undefined => {
  if (request?.headers?.deviceUniqueIdentifier) {
    return request.headers.deviceUniqueIdentifier.toString();
  }
  return;
};

export const createApp = async (): Promise<core.Express> => {
  const app = express();
  app.use(helmet());
  await sync();

  const ready = err => {
    if (err) {
      throw new Error("Controller:Server::Unfortunately you've requested too many items.");
    }

    app.use(
      cors(),
      json(),
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          const { event, context } = getCurrentInvoke();
          return {
            expressRequest: req,
            expressResponse: res,
            lambdaEvent: event,
            lambdaContext: context,
            ...(await jwtController.createAuthScope(req.headers.authorization)),
            ip: getIpAddress(req),
            deviceUniqueIdentifier: getDeviceUniqueIdentifier(req),
            userAgent: req.headers['user-agent'],
          };
        },
      }),
    );
  };

  app.use(new RateLimiterMiddleware(ready).middleware);

  return app;
};

exports.handler = Sentry.AWSLambda.wrapHandler(serverlessExpress({ app: createApp }));
