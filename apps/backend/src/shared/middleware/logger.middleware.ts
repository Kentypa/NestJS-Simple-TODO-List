import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { isObjectEmpty } from "src/utils/is-empty-object";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, body, params } = req;
    const requestTime = Date.now();
    const data = isObjectEmpty(body) ? null : JSON.stringify(body);
    const reqParams = isObjectEmpty(params) ? null : JSON.stringify(params);

    res.on("finish", () => {
      const { statusCode } = res;
      const responseTime = Date.now() - requestTime;
      console.log(
        `${method} ${originalUrl} ${statusCode} - ${responseTime}ms from ${ip} ${
          data ?? ""
        } ${reqParams ?? ""}`
      );
    });

    next();
  }
}
