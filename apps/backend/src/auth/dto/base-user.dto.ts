import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class BaseUserDto {
  @IsString()
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
