import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class BaseUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  email: string;
}
