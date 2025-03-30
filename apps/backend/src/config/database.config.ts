import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  user: process.env.POSTGRES_USER || "kentadmin",
  password: process.env.POSTGRES_PASSWORD || "1234",
  name: process.env.POSTGRES_DB || "kentdb",
  host: process.env.POSTGRES_HOST || "db",
  port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
}));
