import { RateLimiterMySQL } from "rate-limiter-flexible";
import { Handler, Request } from "express";
import { db } from "../../models";
import { config } from "../../config/";
import * as requestIp from "request-ip";

class RateLimiterMiddleware extends RateLimiterMySQL {
  constructor(ready) {
    super(
      {
        storeClient: db.sequelize,
        dbName: config.mysql.database,
        points: 25,
        duration: 1,
      },
      ready,
    );
  }
  middleware: Handler = async (request: Request, response, next) => {
    const ip: string = requestIp.getClientIp(request);
    // @ts-ignore
    request.clientIp = ip;

    // try {
    //   const value = jwtController.createAuthScope(
    //     request.headers.authorization,
    //   );
    //   if (value.userId) {
    //     await this.consume(value.userId);
    //   } else if (ip) {
    //     await this.consume(ip);
    //   }

    //   next();
    // } catch (error) {
    //   throw new Error(
    //     "Middleware:RateLimiter::Too many requests, please try again.",
    //   );
    // }
  };
}

export { RateLimiterMiddleware };
