import * as express from "express";
import * as core from "express-serve-static-core";
import { Request } from "express";
import { sync } from "./models";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./routes/graphql";
import { CreateRoutes } from "./controllers/CreateRoutes";
import { RateLimiterMiddleware } from "./middlewares";
import * as helmet from "helmet";
import { config } from "./config";

const createApp = async (): Promise<core.Express> => {
  await sync();

  const app = express();
  app.use(helmet());

  return new Promise((resolve, reject) => {
    const ready = (err) => {
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
          if (
            request &&
            request.headers &&
            request.headers.deviceUniqueIdentifier
          ) {
            return request.headers.deviceUniqueIdentifier.toString();
          }
          return;
        };

        const allowedPlatforms = {
          "react-native-ios": null,
          "react-native-android": null,
          "react-cms-web": config.applicationTokens.cms,
          "react-website-web": config.applicationTokens.website,
        };

        const apolloServer = new ApolloServer({
          typeDefs,
          resolvers,
          playground: false,
          introspection: config.nodeEnv !== "production",
          context: ({ req }: { req: Request }) => {
            const graphqlRequest: string = req.body.query;

            const clientName =
              req.headers["apollographql-client-name"]?.toString();

            const clientVersion =
              req.headers["apollographql-client-version"]?.toString();

            if (
              !config.jest &&
              config.nodeEnv === "production" &&
              !graphqlRequest
                .replace(/\s/g, "")
                .includes("mutation{addLocation(input:{")
            ) {
              if (!clientName || allowedPlatforms[clientName] === undefined) {
                throw new Error("Value issue");
              }

              if (allowedPlatforms[clientName]) {
                const accessTokenXtrid = req.headers["x-tr-id"]?.toString();
                if (!accessTokenXtrid) {
                  throw new Error("Token issue");
                }

                if (allowedPlatforms[clientName] !== accessTokenXtrid) {
                  throw new Error("Token issue");
                }
              }
            }

            return {
              ip: getIpAddress(req),
              deviceUniqueIdentifier: getDeviceUniqueIdentifier(req),
              userAgent: req.headers["user-agent"],
              apollographqlClientVersion: Number(clientVersion) || undefined,
              apollographqlClientName: clientName,
            };
          },
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
