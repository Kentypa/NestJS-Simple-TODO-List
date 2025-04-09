import { hash } from "bcrypt";
import { EncryptionConfig } from "src/config/encription";

export function hashData(data: string) {
  return hash(data, EncryptionConfig.SALT_OR_ROUNDS);
}
