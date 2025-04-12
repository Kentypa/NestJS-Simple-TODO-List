import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { hash } from "bcrypt";

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {}

  hashData(data: string) {
    return hash(
      data,
      this.configService.getOrThrow<number>("encryption.salt_or_rounds")
    );
  }
}
