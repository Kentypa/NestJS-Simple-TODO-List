import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class UpdateEmailDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  email: string;
}
