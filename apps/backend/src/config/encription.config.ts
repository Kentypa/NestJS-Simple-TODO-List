import { registerAs } from "@nestjs/config";

export default registerAs("encryption", () => ({
  salt_or_rounds: parseInt(process.env.SALT_OR_ROUNDS || "10", 10),
}));
