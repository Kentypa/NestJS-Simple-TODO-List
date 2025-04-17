import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class BaseUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "qwerty1234",
    description: "User password",
    type: "string",
  })
  password: string;
}
