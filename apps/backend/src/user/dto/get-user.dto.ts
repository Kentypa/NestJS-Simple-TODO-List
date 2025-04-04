import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: "ID of user",
    type: "number",
    minimum: 1,
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "test@gmail.com",
    description: "User email",
    type: "string",
  })
  email: string;
}
