import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { BaseUserDto } from "./base-user.dto";

export class GetUserDto extends BaseUserDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: "ID of user",
    type: "number",
    minimum: 1,
  })
  id: number;
}
