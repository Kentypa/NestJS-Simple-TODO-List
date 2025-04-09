import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => ({
  access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET || "access_secret",
  refresh_token_secret:
    process.env.JWT_REFRESH_TOKEN_SECRET || "refresh_secret",
  access_token_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || 60000,
  refresh_token_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || 120000,
}));
