import * as express from "express";
import * as core from "express-serve-static-core";
import { Request } from "express";
import { sync } from "./models";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./routes/graphql";
import { CreateRoutes } from "./controllers/CreateRoutes";
import { jwtController } from "./controllers";
import { RateLimiterMiddleware } from "./middlewares";

const createApp = async (): Promise<core.Express> => {
  await sync();
  const app = express();
  return new Promise((resolve, reject) => {
    const ready = err => {
      if (err) {
        reject(err);
      } else {
        CreateRoutes(app);

        const getIpAddress = (request: Request): string | undefined => {
          //@ts-ignore
          return request.clientIp || undefined;
        };

        const getDeviceUniqueIdentifier = (
          request: Request,
        ): string | undefined => {
          if (request?.headers?.deviceUniqueIdentifier) {
            return request.headers.deviceUniqueIdentifier.toString();
          }
          return;
        };

        const apolloServer = new ApolloServer({
          typeDefs,
          resolvers,
          playground: false,
          introspection: true,
          context: async ({ req }: { req: Request }) => ({
            ...(await jwtController.createAuthScope(req.headers.authorization)),
            ip: getIpAddress(req),
            deviceUniqueIdentifier: getDeviceUniqueIdentifier(req),
            userAgent: req.headers["user-agent"],
          }),
        });
        apolloServer.applyMiddleware({
          app,
        });
        resolve(app);
      }
    };

    app.use(new RateLimiterMiddleware(ready).middleware);
  });
};

export { createApp };
