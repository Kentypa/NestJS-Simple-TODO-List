import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { JwtPayload } from "../types/jwt-payload.type";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>("jwt.access_token_secret"),
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.getById(parseInt(payload.sub));
  }
}
